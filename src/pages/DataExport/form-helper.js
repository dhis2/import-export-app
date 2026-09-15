import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField.jsx'
import {
    fetchAndDownload,
    compressionToName,
    pathToId,
} from '../../utils/helper.js'
import { idSchemeParams } from '../../utils/idSchemeParams.js'

const valuesToParams = (values) => {
    const {
        selectedOrgUnits,
        includeChildren,
        selectedDataSets,
        compression,
        startDate,
        endDate,
        includeDeleted,
    } = values

    return [
        ...idSchemeParams(values, 'dataValueSets'),
        `includeDeleted=${includeDeleted}`,
        `children=${includeChildren}`,
        `startDate=${startDate}`,
        `endDate=${endDate}`,
        `orgUnit=${selectedOrgUnits.map((o) => pathToId(o))}`,
        `dataSet=${selectedDataSets}`,
        compression ? `compression=${compressionToName(compression)}` : '',
    ]
        .filter((s) => s != '')
        .join('&')
}

const onExport = (baseUrl, setExportEnabled) => async (values) => {
    setExportEnabled(false)

    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = `dataValueSets`
    const downloadUrlParams = valuesToParams(values)
    const endpointExtension = values.format
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`

    try {
        return await fetchAndDownload(url, 'data')
    } finally {
        setExportEnabled(true)

        console.log('data-export:', { url, params: downloadUrlParams })
    }
}

const validate = (values) => ({
    startDate: DATE_BEFORE_VALIDATOR(values.startDate, values.endDate),
    endDate: DATE_AFTER_VALIDATOR(values.endDate, values.startDate),
})

export { onExport, validate, valuesToParams }
