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
        'async=true',
        `dryRun=${dryRun}`,
        `dataElementIdScheme=${dataElementIdScheme.value}`,
        `orgUnitIdScheme=${orgUnitIdScheme.value}`,
        `eventIdScheme=${eventIdScheme.value}`,
        `idScheme=${idScheme.value}`,
        `payloadFormat=${format.value}`,
    ].join('&')
    const url = `${apiBaseUrl}${endpoint}?${params}`

    try {
        await uploadFile({
            url,
            file: files[0],
            format: format.value,
            type: 'EVENT_IMPORT',
            setProgress,
            addEntry: (id, entry) =>
                addTask('event', id, { ...entry, jobDetails: values }),
        })
    } catch (e) {
        const errors = [e]
        return { [FORM_ERROR]: errors }
    } finally {
        setShowFullSummaryTask(true)
    }
}

export { onImport }
