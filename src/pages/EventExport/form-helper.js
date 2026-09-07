import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField.jsx'
import { ALL_VALUE } from '../../hooks/useProgramStages.js'
import { fetchAndDownload, pathToId } from '../../utils/helper.js'
import { idSchemeParams } from '../../utils/idSchemeParams.js'

const valuesToParams = (values) => {
    const {
        selectedOrgUnits,
        selectedPrograms,
        programStage,
        occurredAfter,
        occurredBefore,
        includeDeleted,
        inclusion,
    } = values

    return [
        'paging=false',
        'totalPages=false',
        `orgUnit=${pathToId(selectedOrgUnits[0])}`,
        `program=${selectedPrograms}`,
        `includeDeleted=${includeDeleted}`,
        ...idSchemeParams(values, 'tracker'),
        `occurredAfter=${occurredAfter}`,
        `occurredBefore=${occurredBefore}`,
        `orgUnitMode=${inclusion}`,
        programStage != ALL_VALUE ? `programStage=${programStage}` : '',
    ]
        .filter((s) => s != '')
        .join('&')
}

const onExport = (baseUrl, setExportEnabled) => async (values) => {
    setExportEnabled(false)

    const { format, compression } = values

    // generate URL and redirect
    const apiBaseUrl = `${baseUrl}/api/tracker/`
    const endpoint = `events`
    const endpointExtension = compression ? `${format}.${compression}` : format
    const downloadUrlParams = valuesToParams(values)
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`

    try {
        return await fetchAndDownload(url, 'event')
    } finally {
        setExportEnabled(true)

        // log for debugging purposes
        console.log('event-export:', { url, params: downloadUrlParams })
    }
}

const validate = (values) => ({
    startDate: DATE_BEFORE_VALIDATOR(values.startDate, values.endDate),
    endDate: DATE_AFTER_VALIDATOR(values.endDate, values.startDate),
})

export { onExport, validate, valuesToParams }
