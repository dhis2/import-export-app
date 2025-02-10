import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { uploadFile } from '../../utils/helper.js'

const isAsync = true

const onImport =
    ({ baseUrl, setProgress, addTask, setShowFullSummaryTask }) =>
    async (values) => {
        const { dryRun, files } = values

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = 'metadata/gml.json'
        const params = `dryRun=${dryRun}`
        const url = `${apiBaseUrl}${endpoint}?${params}`

        try {
            await uploadFile({
                url,
                file: files[0],
                format: 'gml',
                type: 'GML_IMPORT',
                isAsync: isAsync,
                setProgress,
                addEntry: (id, entry) =>
                    addTask('gml', id, { ...entry, jobDetails: values }),
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
