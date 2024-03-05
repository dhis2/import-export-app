import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { uploadFile } from '../../utils/helper.js'

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
            idScheme,
        } = values

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
