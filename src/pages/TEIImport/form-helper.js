import i18n from '@dhis2/d2-i18n'
import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { uploadFile } from '../../utils/helper.js'

const unsupportedFileFormatMessage = {
    [FORM_ERROR]: [
        {
            id: 'tei-import-unsupported-format',
            critical: true,
            message: i18n.t(
                'This file is not in a supported format. Files exported from DHIS2 2.40 or earlier are no longer supported by this app — please re-export the data using DHIS2 2.41 or later.'
            ),
        },
    ],
}

const isLegacyTrackerPayload = async (file) => {
    try {
        const data = JSON.parse(await file.text())
        return 'trackedEntityInstances' in data
    } catch (e) {
        console.error('tei-import: failed to pre-check file contents', e)
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
            idScheme,
        } = values

        if (await isLegacyTrackerPayload(files[0])) {
            return unsupportedFileFormatMessage
        }

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/tracker/`
        const params = [
            `importMode=${dryRun ? 'VALIDATE' : 'COMMIT'}`,
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
            `dataElementIdScheme=${dataElementIdScheme}`,
            `orgUnitIdScheme=${orgUnitIdScheme}`,
            `idScheme=${idScheme}`,
        ]
            .filter((s) => s != '')
            .join('&')
        const url = `${apiBaseUrl}?${params}`

        try {
            await uploadFile({
                url,
                file: files[0],
                format: format,
                type: 'TRACKER_IMPORT_JOB',
                isAsync: isAsync,
                setProgress,
                addEntry: (id, entry) => {
                    addTask('tei', id, { ...entry, jobDetails: values })
                },
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
