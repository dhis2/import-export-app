import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField.jsx'
import { ALL_VALUE } from '../../hooks/useProgramStages.js'
import { FORM_ERROR } from '../../utils/final-form.js'
import {
    genericErrorMessage,
    locationAssign,
    pathToId,
} from '../../utils/helper.js'

const exportErrorAlert = (message) => ({
    [FORM_ERROR]: [
        {
            id: `event-export-error-${Date.now()}`,
            warning: true,
            message,
        },
    ],
})

const onExport = (baseUrl, setExportEnabled) => async (values) => {
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

    try {
        const response = await fetch(url, { credentials: 'include' })

        if (!response.ok) {
            let message = genericErrorMessage
            try {
                const body = await response.json()
                message = body.message || message
            } catch (e) {
                // response body wasn't JSON, fall back to the generic message
                console.error('event-export: failed to parse error response', e)
            }
            return exportErrorAlert(message)
        }

        locationAssign(url)

        // log for debugging purposes
        console.log('event-export:', { url, params: downloadUrlParams })
    } catch (e) {
        console.error('event-export: request failed', e)
        return exportErrorAlert(genericErrorMessage)
    } finally {
        setExportEnabled(true)
    }
}

const validate = (values) => ({
    startDate: DATE_BEFORE_VALIDATOR(values.startDate, values.endDate),
    endDate: DATE_AFTER_VALIDATOR(values.endDate, values.startDate),
})

export { onExport, validate }
