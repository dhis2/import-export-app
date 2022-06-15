import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form'
import { uploadFile } from '../../utils/helper'

const isAsync = false // TODO: use async mode

const onImport =
    ({ baseUrl, setProgress, addTask, setShowFullSummaryTask }) =>
    async (values) => {
        const {
            dryRun,
            files,
            matchProperty,
            geojsonProperty,
            orgUnitIdSchemeCore,
            useAttribute,
            geojsonAttribute,
        } = values

        const apiUrl = `${baseUrl}/api/organisationUnits/geometry`
        const params = { dryRun, async: isAsync }

        if (matchProperty && geojsonProperty && orgUnitIdSchemeCore) {
            params.geoJsonId = false
            params.geoJsonProperty = geojsonProperty
            params.orgUnitProperty = orgUnitIdSchemeCore
        }

        if (useAttribute && geojsonAttribute) {
            params.attributeId = geojsonAttribute
        }

        const paramsString = Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join('&')

        const url = `${apiUrl}?${paramsString}`

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
