import i18n from '@dhis2/d2-i18n'
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

const earthEngineOptions = [
    'format',
    'aggregationType',
    'band',
    'bandReducer',
    'buffer',
    'data',
    'datasetId',
    'filter',
    'legend',
    'mask',
    'methods',
    'mosaic',
    'params',
]

// Returns a promise
const getEarthEngineConfig = async (config, engine) => {
    const orgUnitIds = config.organisationUnits.map((ou) => ou.id)
    let polygonFeatures
    let pointOrgUnits

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
        // only polygons, no points to to the Earth Engine
        polygonFeatures = toGeoJson(
            geoFeatures.geoFeatures.filter((gf) => gf.ty === 2)
        )

        if (!polygonFeatures.length) {
            throw new Error(
                i18n.t('No geofeatures found for selected organisation units')
            )
        }

        const pointFeatures =
            toGeoJson(geoFeatures.geoFeatures.filter((gf) => gf.ty === 1)) || []

        pointOrgUnits = pointFeatures.map(({ properties }) => ({
            id: properties.id,
            name: properties.name,
        }))
    } else {
        throw new Error(i18n.t('No organisation units have been selected'))
    }

    const dataset = getEarthEngineConfigs(config.id)

    const data =
        Array.isArray(polygonFeatures) && polygonFeatures.length
            ? polygonFeatures
            : undefined

    const cfg = {
        ...dataset,
        aggregationType: [config.aggregationType],
        filter: config.periods.filter((p) => config.period === p.name),
        band:
            Object.keys(config.bandCocs).length && Object.keys(config.bandCocs),
        data,
    }

    const options = Object.keys(cfg)
        .filter((option) => earthEngineOptions.includes(option))
        .reduce((obj, key) => {
            obj[key] = cfg[key]
            return obj
        }, {})

    return { config: options, pointOrgUnits }
}

export default getEarthEngineConfig
