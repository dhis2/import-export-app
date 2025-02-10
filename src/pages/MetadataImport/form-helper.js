import i18n from '@dhis2/d2-i18n'
import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { uploadFile } from '../../utils/helper.js'

const onImport =
    ({ baseUrl, setProgress, addTask, setShowFullSummaryTask }) =>
    async (values) => {
        const {
            dryRun,
            files,
            format,
            identifier,
            importReportMode,
            importStrategy,
            atomicMode,
            mergeMode,
            flushMode,
            skipSharing,
            skipValidation,
            inclusionStrategy,
            isAsync,
            firstRowIsHeader,
            classKey,
        } = values

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = 'metadata'
        const params = [
            `importMode=${dryRun ? 'VALIDATE' : 'COMMIT'}`,
            `identifier=${identifier}`,
            `importReportMode=${importReportMode}`,
            `importStrategy=${importStrategy}`,
            `atomicMode=${atomicMode}`,
            `mergeMode=${mergeMode}`,
            `flushMode=${flushMode}`,
            `skipSharing=${skipSharing}`,
            `skipValidation=${skipValidation}`,
            `inclusionStrategy=${inclusionStrategy}`,
            `async=${isAsync}`,
            format == 'csv'
                ? `firstRowIsHeader=${firstRowIsHeader}&classKey=${classKey}`
                : '',
        ]
            .filter((s) => s != '')
            .join('&')
        const url = `${apiBaseUrl}${endpoint}?${params}`

        try {
            await uploadFile({
                url,
                file: files[0],
                format: format,
                type: 'METADATA_IMPORT',
                isAsync: isAsync,
                setProgress,
                addEntry: (id, entry) =>
                    addTask('metadata', id, { ...entry, jobDetails: values }),
            })
            return jobStartedMessage
        } catch (e) {
            const formErrors = validate(values)
            const allErrors = { [FORM_ERROR]: [e], ...formErrors }
            return allErrors
        } finally {
            setShowFullSummaryTask(true)
        }
    }

const validate = (values) => {
    const classKeyValidator = (format, classKey) =>
        format == 'csv' && !classKey
            ? i18n.t('A class key must be selected')
            : undefined

    return {
        classKey: classKeyValidator(values.format, values.classKey),
    }
}

export { onImport, validate }
