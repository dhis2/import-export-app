import i18n from '@dhis2/d2-i18n'
import { loadEarthEngineWorker } from '@dhis2/maps-gl'
import { earthEngines } from './earthEngines.js'

const DEFAULT_LOCALE = 'en'
const fallbackDateFormat = (dateString) => dateString.substr(0, 10)

const hasIntlSupport = typeof window.Intl !== 'undefined' && Intl.DateTimeFormat
const dateLocale = (locale) =>
    locale && locale.includes('_') ? locale.replace('_', '-') : locale
const toDate = (date) => {
    if (Array.isArray(date)) {
        return new Date(date[0], date[1], date[2])
    }
    return new Date(date)
}

const formatLocaleDate = (dateString) =>
    hasIntlSupport
        ? new Intl.DateTimeFormat(dateLocale(i18n.language || DEFAULT_LOCALE), {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          }).format(toDate(dateString))
        : fallbackDateFormat(dateString)

const formatStartEndDate = (startDate, endDate) => {
    return `${formatLocaleDate(startDate)} - ${formatLocaleDate(endDate)}`
}

const getStartEndDate = (data) =>
    formatStartEndDate(
        data['system:time_start'],
        data['system:time_end'] // - 7200001, // Minus 2 hrs to end the day before
    )

let workerPromise

// Load EE worker and set token
const getWorkerInstance = async (engine) => {
    workerPromise =
        workerPromise ||
        (async () => {
            const EarthEngineWorker = await loadEarthEngineWorker(
                getAuthToken(engine)
            )
            return await new EarthEngineWorker()
        })()

    return workerPromise
}

export const getPeriods = async (eeId, engine) => {
    const { periodType, filters } = earthEngines[eeId]

    const getPeriod = ({ id, properties }) => {
        const year = new Date(properties['system:time_start']).getFullYear()
        const name =
            periodType === 'Yearly' ? String(year) : getStartEndDate(properties)

        return { id, name, year }
    }

    const eeWorker = await getWorkerInstance(engine)
    const { features } = await eeWorker.getPeriods(earthEngines[eeId].datasetId)

    const periods = features.map(getPeriod).map((p) => {
        const period = filters ? filters(p)[0] : p
        return { label: p.name, value: p.year.toString(), ...period }
    })

    return Promise.resolve(periods)
}

export const getAggregations = async (engine, config) => {
    const eeWorker = await getWorkerInstance(engine)
    const aggregations = await eeWorker.getAggregations(config)

    return aggregations
}

// Returns auth token for EE API as a promise
const getAuthToken = (engine) => () => {
    const googleTokenQuery = {
        data: { resource: 'tokens/google' },
    }

    /* eslint-disable-next-line no-async-promise-executor */
    return new Promise(async (resolve, reject) => {
        const result = await engine
            .query(googleTokenQuery)
            .catch(() =>
                reject(
                    new Error(
                        i18n.t(
                            'Cannot get authorization token for Google Earth Engine.'
                        )
                    )
                )
            )

        const token = result.data

        if (token && token.status === 'ERROR') {
            reject(
                new Error(
                    i18n.t(
                        'Requires a Google Earth Engine account. Check the DHIS2 documentation for more information.'
                    )
                )
            )
        }

        resolve({
            token_type: 'Bearer',
            ...token,
        })
    })
}
