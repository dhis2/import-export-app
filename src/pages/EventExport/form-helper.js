import { jsDateToISO8601, locationAssign, pathToId } from '../../utils/helper'
import { ALL_VALUE } from '../../hooks/useProgramStages'
import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField'

const onExport = (baseUrl, setExportEnabled) => values => {
    setExportEnabled(false)

    const {
        selectedOrgUnits,
        selectedPrograms,
        programStage,
        format,
        compression,
        startDate,
        endDate,
        includeDeleted,
        dataElementIdScheme,
        orgUnitIdScheme,
        idScheme,
        inclusion,
    } = values

    // generate URL and redirect
    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = `events`
    const endpointExtension = compression ? `${format}.${compression}` : format
    const filename = `${endpoint}.${endpointExtension}`
    const downloadUrlParams = [
        'links=false',
        'skipPaging=true',
        `orgUnit=${pathToId(selectedOrgUnits[0])}`,
        `program=${selectedPrograms}`,
        `includeDeleted=${includeDeleted}`,
        `dataElementIdScheme=${dataElementIdScheme}`,
        `orgUnitIdScheme=${orgUnitIdScheme}`,
        `idScheme=${idScheme}`,
        `attachment=${filename}`,
        `startDate=${jsDateToISO8601(startDate)}`,
        `endDate=${jsDateToISO8601(endDate)}`,
        `ouMode=${inclusion}`,
        `format=${format}`,
        programStage != ALL_VALUE ? `programStage=${programStage}` : '',
    ]
        .filter(s => s != '')
        .join('&')
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
    locationAssign(url, setExportEnabled)
}

const validate = values => ({
    startDate: DATE_BEFORE_VALIDATOR(values.startDate, values.endDate),
    endDate: DATE_AFTER_VALIDATOR(values.endDate, values.startDate),
})

export { onExport, validate }
