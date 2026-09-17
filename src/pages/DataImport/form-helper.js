import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { uploadFile } from '../../utils/helper.js'
import { idSchemeParams } from '../../utils/idSchemeParams.js'

const isAsync = true

const onImport =
    ({ baseUrl, setProgress, addTask, setShowFullSummaryTask }) =>
    async (values) => {
        const {
            dryRun,
            files,
            strategy,
            preheatCache,
            skipAudit,
            skipExistingCheck,
            format,
            firstRowIsHeader,
        } = values

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = 'dataValueSets'
        const params = [
            `async=${isAsync}`,
            `dryRun=${dryRun}`,
            `strategy=${strategy}`,
            `preheatCache=${preheatCache}`,
            `skipAudit=${skipAudit}`,
            ...idSchemeParams(values, 'dataValueSets'),
            `skipExistingCheck=${skipExistingCheck}`,
            format == 'csv' ? `firstRowIsHeader=${firstRowIsHeader}` : '',
        ]
            .filter((s) => s != '')
            .join('&')
        const url = `${apiBaseUrl}${endpoint}?${params}`

        try {
            await uploadFile({
                url,
                file: files[0],
                format: format,
                type: 'DATAVALUE_IMPORT',
                isAsync: isAsync,
                setProgress,
                addEntry: (id, entry) =>
                    addTask('data', id, { ...entry, jobDetails: values }),
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
