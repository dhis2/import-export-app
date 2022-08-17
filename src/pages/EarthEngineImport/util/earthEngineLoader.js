import i18n from '@dhis2/d2-i18n'
import {
    defaultEarthEngineOptions,
    getEarthEngineOptions,
} from '@dhis2/maps-gl/'
import { NO_ASSOCIATED_GEOMETRY } from '../components/AssociatedGeometry.js'
import { getEarthEngineConfigs } from './earthEngines.js'
import { toGeoJson } from './toGeoJson.js'

const getGeoFeaturesQuery = (ouIds, coordinateField) => ({
    resource: 'geoFeatures',
    params: {
        ou: ouIds,
        coordinateField,
    },
})

// Returns a promise
const getEarthEngineConfig = async (config, engine) => {
    const orgUnitIds = config.rows.map((row) => row.id)
    let features

    if (orgUnitIds && orgUnitIds.length) {
        const ouIdsString = orgUnitIds.reduce((previousValue, currentValue) => {
            return previousValue.concat(`${currentValue};`)
        }, 'ou:')

        const coordinateField =
            config.coordinateField !== NO_ASSOCIATED_GEOMETRY
                ? config.coordinateField
                : undefined

        const query = getGeoFeaturesQuery(ouIdsString, coordinateField)

        const geoFeatures = await engine.query({ geoFeatures: query })
        // only polygons, no points
        features = toGeoJson(
            geoFeatures.geoFeatures.filter((gf) => gf.ty === 2)
        )

        if (!features.length) {
            throw new Error(
                i18n.t('No geofeatures found for selected organisation units')
            )
        }
    } else {
        throw new Error(i18n.t('No organisation units have been selected'))
    }

    const dataset = getEarthEngineConfigs(config.id)

    const data =
        Array.isArray(features) && features.length ? features : undefined

    return getEarthEngineOptions({
        ...defaultEarthEngineOptions,
        ...dataset,
        ...config,
        data,
    })
}

export default getEarthEngineConfig
