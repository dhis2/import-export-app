import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form'
import { uploadFile } from '../../utils/helper'

const isAsync = true

const onImport =
    ({ baseUrl, setProgress, addTask, setShowFullSummaryTask }) =>
    async (values) => {
        const {
            dryRun,
            files,
            format,
            dataElementIdScheme,
            orgUnitIdScheme,
            eventIdScheme,
            idScheme,
        } = values

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = 'events.json'
        const params = [
            'skipFirst=true',
            `async=${isAsync}`,
            `dryRun=${dryRun}`,
            `dataElementIdScheme=${dataElementIdScheme}`,
            `orgUnitIdScheme=${orgUnitIdScheme}`,
            `eventIdScheme=${eventIdScheme}`,
            `idScheme=${idScheme}`,
            `payloadFormat=${format}`,
        ].join('&')
        const url = `${apiBaseUrl}${endpoint}?${params}`

        try {
            await uploadFile({
                url,
                file: files[0],
                format: format,
                type: 'EVENT_IMPORT',
                isAsync: isAsync,
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
