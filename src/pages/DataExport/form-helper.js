import i18n from '@dhis2/d2-i18n'
import JSZip from 'jszip'

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

const onExport = engine => async values => {
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

    // fetch data
    try {
        const { sets } = await engine.query(dataValueSetQuery, {
            variables: {
                dataElementIdScheme: dataElementIdScheme.value,
                orgUnitIdScheme: orgUnitIdScheme.value,
                idScheme: idScheme.value,
                includeDeleted: includeDeleted.toString(),
                children: includeChildren.toString(),
                startDate: jsDateToISO8601(startDate),
                endDate: jsDateToISO8601(endDate),
                orgUnit: selectedOrgUnits.map(o => pathToId(o)),
                dataSet: selectedDataSets,
                format: format.value,
            },
        })
        const dataStr = format.value === 'json' ? JSON.stringify(sets) : sets
        const filename = `data.${format.value}`
        if (compression.value !== '') {
            const zip = new JSZip()
            zip.file(filename, dataStr)
            zip.generateAsync({ type: 'blob' }).then(content => {
                const url = URL.createObjectURL(content)
                downloadBlob(url, `${filename}.${compression.value}`)
            })
        } else {
            const url = createBlob(dataStr, format.value)
            downloadBlob(url, filename)
        }
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
