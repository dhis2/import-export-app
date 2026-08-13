import i18n from '@dhis2/d2-i18n'
import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { uploadFile } from '../../utils/helper.js'

const isAsync = true

const LEGACY_EVENT_CSV_COLUMNS = ['eventDate', 'dueDate', 'completedDate']
const NEW_EVENT_CSV_COLUMNS = ['occurredAt', 'scheduledAt']
const CSV_HEADER_PREFIX_BYTES = 8192

const unsupportedFileFormatMessage = {
    [FORM_ERROR]: [
        {
            id: 'event-import-unsupported-format',
            critical: true,
            message: i18n.t(
                'This file is not in a supported format. Files exported from DHIS2 2.40 or earlier are no longer supported by this app — please re-export the data using DHIS2 2.41 or later.'
            ),
        },
    ],
}

const isLegacyEventCsv = async (file) => {
    try {
        const prefix = await file.slice(0, CSV_HEADER_PREFIX_BYTES).text()
        const newlineIndex = prefix.search(/\r?\n/)
        const headerLine =
            newlineIndex === -1 ? prefix : prefix.slice(0, newlineIndex)
        const columns = headerLine.split(',').map((column) => column.trim())
        return (
            LEGACY_EVENT_CSV_COLUMNS.some((column) =>
                columns.includes(column)
            ) &&
            !NEW_EVENT_CSV_COLUMNS.some((column) => columns.includes(column))
        )
    } catch (e) {
        console.error('event-import: failed to pre-check file contents', e)
        return false
    }
}

const onImport =
    ({ baseUrl, setProgress, addTask, setShowFullSummaryTask }) =>
    async (values) => {
        const {
            dryRun,
            files,
            format,
            dataElementIdScheme,
            orgUnitIdScheme,
            idScheme,
        } = values

        if (format === 'csv' && (await isLegacyEventCsv(files[0]))) {
            return unsupportedFileFormatMessage
        }

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/tracker`
        const params = [
            `async=${isAsync}`,
            `importMode=${dryRun ? 'validate' : 'commit'}`,
            `dataElementIdScheme=${dataElementIdScheme}`,
            `orgUnitIdScheme=${orgUnitIdScheme}`,
            `idScheme=${idScheme}`,
        ].join('&')
        const url = `${apiBaseUrl}?${params}`

        try {
            await uploadFile({
                url,
                file: files[0],
                format: format,
                type: 'TRACKER_IMPORT_JOB',
                isAsync,
                setProgress,
                addEntry: (id, entry) =>
                    addTask('event', id, { ...entry, jobDetails: values }),
            })
            return jobStartedMessage
        } catch (e) {
            const errors = [e]
            return { [FORM_ERROR]: errors }
        } finally {
            setShowFullSummaryTask(true)
        }
    }

export { onImport }
