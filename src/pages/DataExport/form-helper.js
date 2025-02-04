import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField.js'
import {
    locationAssign,
    compressionToName,
    pathToId,
} from '../../utils/helper.js'

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
        `startDate=${startDate}`,
        `endDate=${endDate}`,
        `orgUnit=${selectedOrgUnits.map((o) => pathToId(o))}`,
        `dataSet=${selectedDataSets}`,
        `format=${encodeURIComponent(format)}`,
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
    const url = `${apiBaseUrl}${endpoint}?${downloadUrlParams}`
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
