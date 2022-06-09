// import i18n from '@dhis2/d2-i18n'
import { getEarthEngineLayer } from './earthEngines'
import { defaultEarthEngineOptions, getEarthEngineOptions } from './mapsGl.js'
import { toGeoJson } from './toGeoJson'
// import {
//     defaultEarthEngineOptions,
//     getEarthEngineOptions,
// } from '@dhis2/maps-gl/'

const getGeoFeaturesQuery = (ouIds, displayProperty) => ({
    resource: 'geoFeatures',
    params: {
        ou: ouIds,
        displayProperty,
    },
})

// Returns a promise
const getEarthEngineConfig = async (config, engine, displayProperty) => {
    const orgUnitIds = config.rows.map(row => row.id)
    let features

    if (orgUnitIds && orgUnitIds.length) {
        const ouIdsString = orgUnitIds.reduce((previousValue, currentValue) => {
            return previousValue.concat(`${currentValue};`)
        }, 'ou:')

        const query = getGeoFeaturesQuery(
            ouIdsString,
            displayProperty.toUpperCase()
        )
        const geoFeatures = await engine.query({ geoFeatures: query })
        features = toGeoJson(geoFeatures.geoFeatures)

        // if (!features.length) {
        //     //handle error/feedback to user
        // }
    }

    const dataset = getEarthEngineLayer(config.id)

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
