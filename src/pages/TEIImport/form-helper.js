import { FORM_ERROR } from '../../utils/final-form'
import { uploadFile } from '../../utils/helper'

const onImport = ({
    baseUrl,
    setProgress,
    addTask,
    setShowFullSummaryTask,
}) => async values => {
    const {
        dryRun,
        files,
        format,
        identifier,
        importReportMode,
        preheatMode,
        importStrategy,
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
        `importMode=${dryRun ? 'VALIDATE' : 'COMMIT'}`,
        `identifier=${identifier.value}`,
        `importReportMode=${importReportMode.value}`,
        `preheatMode=${preheatMode.value}`,
        `importStrategy=${importStrategy.value}`,
        `atomicMode=${atomicMode.value}`,
        `mergeMode=${mergeMode.value}`,
        `flushMode=${flushMode.value}`,
        `skipSharing=${skipSharing}`,
        `skipValidation=${skipValidation}`,
        `inclusionStrategy=${inclusionStrategy.value}`,
        `async=${isAsync}`,
        `format=${format.value}`,
        `dataElementIdScheme=${dataElementIdScheme.value}`,
        `orgUnitIdScheme=${orgUnitIdScheme.value}`,
        `eventIdScheme=${eventIdScheme.value}`,
        `idScheme=${idScheme.value}`,
    ]
        .filter(s => s != '')
        .join('&')
    const url = `${apiBaseUrl}${endpoint}?${params}`

    try {
        await uploadFile({
            url,
            file: files[0],
            format: format.value,
            type: 'TEI_IMPORT',
            setProgress,
            addEntry: (id, entry) =>
                addTask('tei', id, { ...entry, jobDetails: values }),
        })
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
