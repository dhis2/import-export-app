import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField.jsx'
import { ALL_VALUE } from '../../hooks/useProgramStages.js'
import { locationAssign, pathToId } from '../../utils/helper.js'

const onExport = (baseUrl, setExportEnabled) => (values) => {
    setExportEnabled(false)

    const {
        selectedOrgUnits,
        selectedPrograms,
        programStage,
        format,
        compression,
        occurredAfter,
        occurredBefore,
        includeDeleted,
        dataElementIdScheme,
        orgUnitIdScheme,
        idScheme,
        inclusion,
    } = values

    // generate URL and redirect
    const apiBaseUrl = `${baseUrl}/api/tracker/`
    const endpoint = `events`
    const endpointExtension = compression ? `${format}.${compression}` : format
    const downloadUrlParams = [
        'paging=false',
        'totalPages=false',
        `orgUnit=${pathToId(selectedOrgUnits[0])}`,
        `program=${selectedPrograms}`,
        `includeDeleted=${includeDeleted}`,
        `dataElementIdScheme=${dataElementIdScheme}`,
        `orgUnitIdScheme=${orgUnitIdScheme}`,
        `idScheme=${idScheme}`,
        `occurredAfter=${occurredAfter}`,
        `occurredBefore=${occurredBefore}`,
        `orgUnitMode=${inclusion}`,
        programStage != ALL_VALUE ? `programStage=${programStage}` : '',
    ]
        .filter((s) => s != '')
        .join('&')
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
    locationAssign(url)
    setExportEnabled(true)

    // log for debugging purposes
    console.log('event-export:', { url, params: downloadUrlParams })
}

const validate = (values) => ({
    startDate: DATE_BEFORE_VALIDATOR(values.startDate, values.endDate),
    endDate: DATE_AFTER_VALIDATOR(values.endDate, values.startDate),
})

export { onExport, validate }
