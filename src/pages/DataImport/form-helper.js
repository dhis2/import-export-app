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
        strategy,
        preheatCache,
        skipAudit,
        dataElementIdScheme,
        orgUnitIdScheme,
        idScheme,
        skipExistingCheck,
        format,
        firstRowIsHeader,
    } = values

    // send xhr
    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = 'dataValueSets.json'
    const params = [
        'async=true',
        `dryRun=${dryRun}`,
        `strategy=${strategy.value}`,
        `preheatCache=${preheatCache}`,
        `skipAudit=${skipAudit}`,
        `dataElementIdScheme=${dataElementIdScheme.value}`,
        `orgUnitIdScheme=${orgUnitIdScheme.value}`,
        `idScheme=${idScheme.value}`,
        `skipExistingCheck=${skipExistingCheck}`,
        `format=${format.value}`,
        format == 'csv' ? `firstRowIsHeader=${firstRowIsHeader}` : '',
    ]
        .filter(s => s != '')
        .join('&')
    const url = `${apiBaseUrl}${endpoint}?${params}`

    try {
        await uploadFile({
            url,
            file: files[0],
            format: format.value,
            type: 'DATAVALUE_IMPORT',
            setProgress,
            addEntry: (id, entry) =>
                addTask('data', id, { ...entry, jobDetails: values }),
        })
    } catch (e) {
        const errors = [e]
        return { [FORM_ERROR]: errors }
    } finally {
        setShowFullSummaryTask(true)
    }
}

export { onImport }
