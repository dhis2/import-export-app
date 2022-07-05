import { getEarthEngineConfigs } from './earthEngines.js'

const getCocMap = (eeId, values) => {
    const config = getEarthEngineConfigs(eeId)
    if (config?.bands) {
        const bandIds = config.bands.map((b) => b.id)

        return bandIds.reduce(
            (acc, curr) => ({
                [curr]: values[curr],
                ...acc,
            }),
            {}
        )
    }

    return null
}

export { getCocMap }
