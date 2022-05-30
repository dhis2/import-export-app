import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form'
import { uploadFile } from '../../utils/helper'

// const isAsync = true
const isAsync = false

// https://github.com/dhis2/dhis2-docs/pull/1006

const onImport = ({
    baseUrl,
    setProgress,
    addTask,
    setShowFullSummaryTask,
}) => async values => {
    const { dryRun, files } = values

    // send xhr
    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = 'organisationUnits/geometry'
    const params = `dryRun=${dryRun}`
    const url = `${apiBaseUrl}${endpoint}?${params}`

    try {
        await uploadFile({
            url,
            file: files[0],
            format: 'geojson',
            type: 'GEOJSON_IMPORT',
            isAsync: isAsync,
            setProgress,
            addEntry: (id, entry) =>
                addTask('geojson', id, { ...entry, jobDetails: values }),
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
