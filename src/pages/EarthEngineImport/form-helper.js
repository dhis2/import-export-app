// import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { genericErrorMessage } from '../../utils/helper.js'
import { extractIdAndMessage } from '../../utils/xhr.js'
import { getPrecisionFn } from './components/Rounding.js'
import { getAggregations } from './util/earthEngineHelper.js'
import getEarthEngineConfig from './util/earthEngineLoader.js'
import { getEarthEngineConfigs } from './util/earthEngines.js'
import { EEPeriods } from './util/EEPeriods.js'
import { getCocMap } from './util/getCocMap.js'

const isAsync = true

const onImport =
    ({
        engine,
        displayProperty,
        setProgress,
        addTask,
        setShowFullSummaryTask,
    }) =>
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

        const bands = getEarthEngineConfigs(earthEngineId)?.bands?.map(
            (b) => b.id
        )

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
            displayProperty
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
            onComplete: (resp) => {
                console.log('onComplete, resp', resp)
                const { id, error, msg, typeReports } =
                    extractIdAndMessage(resp)

                const currentDate = new Date()

                const entry = {
                    id: id || currentDate.getTime(),
                    created: currentDate,
                    lastUpdated: currentDate,
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
                // 404 - err is a string
                console.log('err', err)
                const message = err?.length ? err : genericErrorMessage
                console.error('uploadJson error', message)
                // reject(errF(message))
            },
        })
    }

export { onImport }
