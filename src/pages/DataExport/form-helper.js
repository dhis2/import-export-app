import { locationAssign, compressionToName } from '../../utils/helper'
import { getMimeType } from '../../utils/mime'
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
        `download=true`,
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

const onExport = (baseUrl, setExportEnabled) => async values => {
    setExportEnabled(false)

    const { format, compression } = values

    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = `dataValueSets`
    const downloadUrlParams = valuesToParams(values)
    const url = `${apiBaseUrl}${endpoint}?${downloadUrlParams}`

    // if compression is set we can redirect to the appropriate URL
    // and set the compression parameter
    if (compression) {
        setTimeout(() => setExportEnabled(true), 5000)
        locationAssign(url)
        return
    }

    // fetch data and create blob
    try {
        const data = await fetch(url, {
            Accept: getMimeType(format),
            credentials: 'include',
        })
        const dataStr = await data.text()
        const filename = `data.${format}`
        const downloadUrl = createBlob(dataStr, format)
        downloadBlob(downloadUrl, filename)
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
    } finally {
        setExportEnabled(true)
    }
}

const validate = values => ({
    startDate: DATE_BEFORE_VALIDATOR(values.startDate, values.endDate),
    endDate: DATE_AFTER_VALIDATOR(values.endDate, values.startDate),
})

export { onExport, validate }
