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
            preheatMode,
            strategy,
            atomicMode,
            mergeMode,
            flushMode,
            skipSharing,
            skipValidation,
            inclusionStrategy,
            isAsync,
            dataElementIdScheme,
            orgUnitIdScheme,
            eventIdScheme,
            idScheme,
        } = values

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = 'trackedEntityInstances.json'
        const params = [
            `dryRun=${dryRun}`,
            `identifier=${identifier}`,
            `importReportMode=${importReportMode}`,
            `preheatMode=${preheatMode}`,
            `strategy=${strategy}`,
            `atomicMode=${atomicMode}`,
            `mergeMode=${mergeMode}`,
            `flushMode=${flushMode}`,
            `skipSharing=${skipSharing}`,
            `skipValidation=${skipValidation}`,
            `inclusionStrategy=${inclusionStrategy}`,
            `async=${isAsync}`,
            `format=${format}`,
            `dataElementIdScheme=${dataElementIdScheme}`,
            `orgUnitIdScheme=${orgUnitIdScheme}`,
            `eventIdScheme=${eventIdScheme}`,
            `idScheme=${idScheme}`,
        ]
            .filter((s) => s != '')
            .join('&')
        const url = `${apiBaseUrl}${endpoint}?${params}`

        try {
            await uploadFile({
                url,
                file: files[0],
                format: format,
                type: 'TEI_IMPORT',
                isAsync: isAsync,
                setProgress,
                addEntry: (id, entry) =>
                    addTask('tei', id, { ...entry, jobDetails: values }),
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

const validate = () => {
    return {}
}

export { onImport, validate }
