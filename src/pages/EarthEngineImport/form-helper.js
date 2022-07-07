// import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { extractIdAndMessage } from '../../utils/xhr.js'
import { getPrecisionFn } from './components/Rounding.js'
import { getAggregations } from './util/earthEngineHelper.js'
import getEarthEngineConfig from './util/earthEngineLoader.js'
import { getEarthEngineConfigs } from './util/earthEngines.js'
import { EEPeriods } from './util/EEPeriods.js'
import { getCocMap } from './util/getCocMap.js'

const isAsync = true

const onImport =
    ({ engine, userSettings, setProgress, addTask, setShowFullSummaryTask }) =>
    async (values) => {
        const {
            dryRun,
            earthEngineId,
            organisationUnits,
            period,
            aggregationType,
            dataElement,
            rounding,
            ...rest
        } = values

        const allBands = getEarthEngineConfigs(earthEngineId).bands
        const bands = allBands ? allBands.map((b) => b.id) : null

        //TODO replace EEPeriods with periods provided by the usePeriods hook
        const eeOptions = {
            id: earthEngineId,
            rows: organisationUnits,
            filter: EEPeriods.filter((p) => period === p.name),
            aggregationType: [aggregationType],
            band: bands,
        }

        const config = await getEarthEngineConfig(
            eeOptions,
            engine,
            userSettings.keyAnalysisDisplayProperty
        )

        const data = await getAggregations(engine, config)
        const cocMap = getCocMap(earthEngineId, rest)

        const getValueWithPrecision = getPrecisionFn(rounding)

        let dataValues

        if (cocMap) {
            dataValues = Object.entries(data).reduce((acc, curr) => {
                const [orgUnit, valueSet] = curr
                Object.entries(valueSet).forEach(([bandId, rawValue]) => {
                    const ds = {
                        dataElement,
                        period,
                        orgUnit,
                        categoryOptionCombo: cocMap[bandId],
                        value: getValueWithPrecision(rawValue),
                    }

                    acc.push(ds)
                })

                return acc
            }, [])
        } else {
            dataValues = Object.entries(data).map(([orgUnit, valueSet]) => {
                return {
                    dataElement,
                    period,
                    orgUnit,
                    value: getValueWithPrecision(valueSet[aggregationType]),
                }
            })
        }

        console.log('dataValues', dataValues)

        const mutation = {
            resource: 'dataValueSets',
            type: 'create',
            params: { async: isAsync, dryRun },
            data: { dataValues },
        }

        engine.mutate(mutation, {
            onComplete: (res) => {
                const { id, error, msg, typeReports } = extractIdAndMessage(res)
                console.log('completed POST', id, error, msg, typeReports)

                const entry = {
                    id: id || new Date().getTime(),
                    created: new Date(),
                    lastUpdated: new Date(),
                    importType: 'DATAVALUE_IMPORT',
                    level: error ? 'ERROR' : 'INFO',
                    completed: Boolean(!isAsync || error),
                    events: msg ? [msg] : undefined,
                    error: Boolean(error),
                    summary:
                        !isAsync || (error && msg) ? typeReports : undefined,
                }

                addTask('earthengine', id, {
                    ...entry,
                    jobDetails: values,
                })

                setShowFullSummaryTask(true)
            },
            onError: (err) => {
                console.log('POST failed', err)
                // TODO - from /util/helper onError
            },
        })

        // const apiUrl = `${baseUrl}/api/dataValueSets`
        // const params = { dryRun, async: isAsync }

        // const paramsString = Object.keys(params)
        //     .map((key) => `${key}=${params[key]}`)
        //     .join('&')

        // const url = `${apiUrl}?${paramsString}`

        // return apiFetch(url, 'POST', {
        //     dataValues,
        // })
        //     .then(() => {
        //         // const res = response.body
        //         // console.log('here', res)
        //         // return res
        //         setShowFullSummaryTask(true)
        //     })
        //     .catch((error) => {
        //         console.log('Abc error', error)
        //         const errorArr = [error]
        //         return { [FORM_ERROR]: errorArr }
        //     })

        // try {
        //     await uploadJson({
        //         url,
        //         data: { dataValues },
        //         format: 'json',
        //         type: 'DATAVALUE_IMPORT',
        //         isAsync,
        //         setProgress,
        //         addEntry: (id, entry) => {
        //             return addTask('earthengine', id, {
        //                 ...entry,
        //                 jobDetails: values,
        //             })
        //         },
        //     })
        // } catch (e) {
        //     const errors = [e]
        //     return { [FORM_ERROR]: errors }
        // } finally {
        //     setShowFullSummaryTask(true)
        // }
    }

export { onImport }
