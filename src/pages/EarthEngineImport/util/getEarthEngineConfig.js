import i18n from '@dhis2/d2-i18n'
import { NO_ASSOCIATED_GEOMETRY } from '../components/AssociatedGeometry.js'
import {
    earthEngines,
    POPULATION_AGE_GROUPS_DATASET_ID,
} from './earthEngines.js'
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
    'datasetId',
    'data',
    'filter',
    'mosaic',
    'params',
    'tileScale',
]

const TILE_SCALE = 4

// Returns a promise
const getEarthEngineConfig = async (
    {
        earthEngineId,
        organisationUnits,
        coordinateField,
        period,
        periods,
        aggregationType,
        bandCocs,
    },
    engine
) => {
    const orgUnitIds = organisationUnits.map((ou) => ou.id)
    let polygonFeatures
    let pointOrgUnits

    if (orgUnitIds && orgUnitIds.length) {
        const ouIdsString = orgUnitIds.reduce((previousValue, currentValue) => {
            return previousValue.concat(`${currentValue};`)
        }, 'ou:')

        const coordField =
            coordinateField !== NO_ASSOCIATED_GEOMETRY
                ? coordinateField
                : undefined

        // TODO - memoize?
        const query = getGeoFeaturesQuery(ouIdsString, coordField)

        const geoFeatures = await engine.query({ geoFeatures: query })
        // only polygons, no points to the Earth Engine
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

    const data =
        Array.isArray(polygonFeatures) && polygonFeatures.length
            ? polygonFeatures
            : undefined

    const cfg = {
        ...earthEngines[earthEngineId],
        aggregationType: [aggregationType],
        filter: periods.filter((p) => period === p.name),
        tileScale: TILE_SCALE,
        data,
    }

    const bandsWithCocs = bandCocs.filter((bc) => !!bc.coc)

    if (earthEngineId === POPULATION_AGE_GROUPS_DATASET_ID && bandsWithCocs) {
        cfg.band = bandsWithCocs.map((bc) => bc.bandId)
    }

    const options = Object.keys(cfg)
        .filter((option) => earthEngineOptions.includes(option))
        .reduce((obj, key) => {
            obj[key] = cfg[key]
            return obj
        }, {})

    return { config: options, pointOrgUnits }
}

export { getEarthEngineConfig }
