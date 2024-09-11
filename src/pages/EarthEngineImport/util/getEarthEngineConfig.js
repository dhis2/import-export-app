import i18n from '@dhis2/d2-i18n'
import { NO_ASSOCIATED_GEOMETRY } from '../components/AssociatedGeometry.jsx'
import { earthEngines, getEarthEngineBands } from './earthEngines.js'
import { toGeoJson } from './toGeoJson.js'

const getGeoFeaturesQuery = (ouIds, coordinateField) => ({
    resource: 'geoFeatures',
    params: {
        ou: ouIds,
        coordinateField,
    },
})

const earthEngineParams = [
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

const getEarthEngineConfig = async (
    {
        earthEngineId,
        organisationUnits,
        associatedGeometry,
        period,
        periods,
        aggregationType,
        selectedBandCocs,
    },
    engine
) => {
    if (!organisationUnits || !organisationUnits.length) {
        throw new Error(i18n.t('No organisation units have been selected'))
    }

    const orgUnitIds = organisationUnits.map((ou) => ou.id)

    const ouIdsString = orgUnitIds.reduce((previousValue, currentValue) => {
        return previousValue.concat(`${currentValue};`)
    }, 'ou:')

    const coordinateField =
        associatedGeometry !== NO_ASSOCIATED_GEOMETRY
            ? associatedGeometry
            : undefined

    const query = getGeoFeaturesQuery(ouIdsString, coordinateField)

    const geoFeatures = await engine.query({ geoFeatures: query })
    // only polygons, no points to the Earth Engine
    const polygonFeatures = toGeoJson(
        geoFeatures.geoFeatures.filter((gf) => gf.ty === 2)
    )

    if (!polygonFeatures.length) {
        throw new Error(
            i18n.t(
                'It is not possible to get data from Earth Engine for point facilities. Select polygon organisation units or use a catchment area as associated geometry.'
            )
        )
    }

    const pointFeatures =
        toGeoJson(geoFeatures.geoFeatures.filter((gf) => gf.ty === 1)) || []

    const pointOrgUnits = pointFeatures.map(({ properties }) => ({
        id: properties.id,
        name: properties.name,
        parentName: properties.parentName,
    }))

    const cfg = {
        ...earthEngines[earthEngineId],
        aggregationType: [aggregationType],
        filter: periods.filter((p) => period === p.name),
        tileScale: TILE_SCALE,
        data: polygonFeatures,
    }

    if (getEarthEngineBands(earthEngineId).length && selectedBandCocs) {
        cfg.band = selectedBandCocs.map((bc) => bc.id)
    }

    const config = Object.fromEntries(
        earthEngineParams
            .filter((key) => key in cfg)
            .map((key) => [key, cfg[key]])
    )

    return { config, pointOrgUnits }
}

export { getEarthEngineConfig }
