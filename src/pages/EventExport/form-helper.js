import { jsDateToISO8601, locationAssign, pathToId } from '../../utils/helper'
import { ALL_VALUE } from '../../hooks/useProgramStages'
import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField'

const onExport = baseUrl => values => {
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
    const endpointExtension = compression.value
        ? `${format.value}.${compression.value}`
        : format.value
    const filename = `${endpoint}.${endpointExtension}`
    const downloadUrlParams = [
        'links=false',
        'skipPaging=true',
        `orgUnit=${pathToId(selectedOrgUnits[0])}`,
        `program=${selectedPrograms[0]}`,
        `includeDeleted=${includeDeleted}`,
        `dataElementIdScheme=${dataElementIdScheme.value}`,
        `orgUnitIdScheme=${orgUnitIdScheme.value}`,
        `idScheme=${idScheme.value}`,
        `attachment=${filename}`,
        `startDate=${jsDateToISO8601(startDate)}`,
        `endDate=${jsDateToISO8601(endDate)}`,
        `ouMode=${inclusion.value}`,
        `format=${format.value}`,
        programStage.value != ALL_VALUE
            ? `programStage=${programStage.value}`
            : '',
    ]
        .filter(s => s != '')
        .join('&')
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
    locationAssign(url)
}

const validate = values => ({
    startDate: DATE_BEFORE_VALIDATOR(values.startDate, values.endDate),
    endDate: DATE_AFTER_VALIDATOR(values.endDate, values.startDate),
})

export { onExport, validate }
