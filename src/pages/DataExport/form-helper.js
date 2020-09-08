import { locationAssign, compressionToName } from '../../utils/helper'
import i18n from '@dhis2/d2-i18n'

import { FORM_ERROR } from '../../utils/final-form'
import {
    createBlob,
    downloadBlob,
    jsDateToISO8601,
    pathToId,
} from '../../utils/helper'
import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField'

const dataValueSetQuery = {
    sets: {
        resource: 'dataValueSets',
        params: ({
            dataElementIdScheme,
            orgUnitIdScheme,
            idScheme,
            includeDeleted,
            children,
            startDate,
            endDate,
            orgUnit,
            dataSet,
            format,
        }) => ({
            dataElementIdScheme,
            orgUnitIdScheme,
            idScheme,
            includeDeleted,
            children,
            startDate,
            endDate,
            orgUnit,
            dataSet,
            format,
        }),
    },
}

const valuesToParams = ({
    selectedOrgUnits,
    includeChildren,
    selectedDataSets,
    format,
    compression,
    startDate,
    endDate,
    includeDeleted,
    dataElementIdScheme,
    orgUnitIdScheme,
    idScheme,
}) =>
    [
        `dataElementIdScheme=${dataElementIdScheme}`,
        `orgUnitIdScheme=${orgUnitIdScheme}`,
        `idScheme=${idScheme}`,
        `includeDeleted=${includeDeleted}`,
        `children=${includeChildren}`,
        `startDate=${jsDateToISO8601(startDate)}`,
        `endDate=${jsDateToISO8601(endDate)}`,
        `orgUnit=${selectedOrgUnits.map(o => pathToId(o))}`,
        `dataSet=${selectedDataSets}`,
        `format=${format}`,
        `compression=${compressionToName(compression)}`,
    ].join('&')

const onExport = (baseUrl, engine) => async values => {
    const {
        selectedOrgUnits,
        includeChildren,
        selectedDataSets,
        format,
        compression,
        startDate,
        endDate,
        includeDeleted,
        dataElementIdScheme,
        orgUnitIdScheme,
        idScheme,
    } = values

    // if compression is set we can redirect to the appropriate URL
    // and set the compression parameter
    if (compression) {
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = `dataValueSets`
        const downloadUrlParams = valuesToParams(values)
        const url = `${apiBaseUrl}${endpoint}?${downloadUrlParams}`
        locationAssign(url)
        return
    }

    // fetch data
    try {
        const { sets } = await engine.query(dataValueSetQuery, {
            variables: {
                dataElementIdScheme: dataElementIdScheme,
                orgUnitIdScheme: orgUnitIdScheme,
                idScheme: idScheme,
                includeDeleted: includeDeleted.toString(),
                children: includeChildren.toString(),
                startDate: jsDateToISO8601(startDate),
                endDate: jsDateToISO8601(endDate),
                orgUnit: selectedOrgUnits.map(o => pathToId(o)),
                dataSet: selectedDataSets,
                format: format,
            },
        })
        const dataStr = format === 'json' ? JSON.stringify(sets) : sets
        const filename = `data.${format}`
        const url = createBlob(dataStr, format)
        downloadBlob(url, filename)
    } catch (error) {
        const errors = [
            {
                id: `http-${new Date().getTime()}`,
                critical: true,
                message: `${i18n.t('HTTP error when fetching data')}. ${
                    error.message
                }`,
            },
        ]
        console.error('DataExport onExport error: ', error)

        return { [FORM_ERROR]: errors }
    }
}

const validate = values => ({
    startDate: DATE_BEFORE_VALIDATOR(values.startDate, values.endDate),
    endDate: DATE_AFTER_VALIDATOR(values.endDate, values.startDate),
})

export { onExport, validate }
