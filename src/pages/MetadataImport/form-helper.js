import i18n from '@dhis2/d2-i18n'
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
        firstRowIsHeader,
        classKey,
    } = values

    // send xhr
    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = 'metadata.json'
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
        format.value == 'csv'
            ? `firstRowIsHeader=${firstRowIsHeader}&classKey=${classKey.value}`
            : '',
    ]
        .filter(s => s != '')
        .join('&')
    const url = `${apiBaseUrl}${endpoint}?${params}`

    try {
        uploadFile({
            url,
            file: files[0],
            format: format.value,
            type: 'METADATA_IMPORT',
            setProgress,
            addEntry: (id, entry) =>
                addTask('metadata', id, { ...entry, jobDetails: values }),
        })
    } catch (e) {
        const errors = [e]
        return { [FORM_ERROR]: errors }
    } finally {
        setShowFullSummaryTask(true)
    }
}

const validate = values => {
    const classKeyValidator = (format, classKey) =>
        format.value == 'csv' && !classKey
            ? i18n.t('A class key must be selected')
            : undefined

    return {
        classKey: classKeyValidator(values.format, values.classKey),
    }
}

export { onImport, validate }
