import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField.jsx'
import {
    locationAssign,
    compressionToName,
    pathToId,
} from '../../utils/helper.js'

const valuesToParams = ({
    selectedOrgUnits,
    includeChildren,
    selectedDataSets,
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
        `startDate=${startDate}`,
        `endDate=${endDate}`,
        `orgUnit=${selectedOrgUnits.map((o) => pathToId(o))}`,
        `dataSet=${selectedDataSets}`,
        compression ? `compression=${compressionToName(compression)}` : '',
    ]
        .filter((s) => s != '')
        .join('&')

const onExport = (baseUrl, setExportEnabled) => async (values) => {
    setExportEnabled(false)

    // generate URL and redirect
    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = `dataValueSets`
    const downloadUrlParams = valuesToParams(values)
    const endpointExtension = values.format
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
    locationAssign(url)
    setExportEnabled(true)

    // log for debugging purposes
    console.log('data-export:', { url, params: downloadUrlParams })
}

const validate = (values) => ({
    startDate: DATE_BEFORE_VALIDATOR(values.startDate, values.endDate),
    endDate: DATE_AFTER_VALIDATOR(values.endDate, values.startDate),
})

export { onExport, validate }
