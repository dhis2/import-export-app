// import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { genericErrorMessage } from '../../utils/helper.js'
import { extractIdAndMessage } from '../../utils/xhr.js'

const isAsync = true

const onImport =
    ({ engine, setProgress, addTask, setShowFullSummaryTask }) =>
    async (values) => {
        /* eslint-disable no-unused-vars */
        const {
            dryRun,
            eeData,
            dataElementId,
            earthEngineId,
            period,
            organisationUnits,
            aggregationType,
            dataElement,
            rounding,
            ...bandCocs
        } = values
        /* eslint-enable no-unused-vars */

        setProgress(true)

        let dataValues

        if (Object.keys(bandCocs).length) {
            dataValues = eeData.reduce((acc, curr) => {
                const { ouId, bandId, value } = curr
                const ds = {
                    dataElement: dataElementId,
                    period,
                    orgUnit: ouId,
                    categoryOptionCombo: bandCocs[bandId],
                    value,
                }

                acc.push(ds)

                return acc
            }, [])
        } else {
            dataValues = eeData.map(({ ouId, value }) => {
                return {
                    dataElement: dataElementId,
                    period,
                    orgUnit: ouId,
                    value,
                }
            })
        }

        const mutation = {
            resource: 'dataValueSets',
            type: 'create',
            params: { async: isAsync, dryRun },
            data: { dataValues },
        }

        engine.mutate(mutation, {
            onComplete: (resp) => {
                setProgress(false)
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
                setProgress(false)
                // 404 - err is a string
                console.log('err', err)
                const message = err?.length ? err : genericErrorMessage
                console.error('uploadJson error', message)
                // reject(errF(message))
            },
        })
    }

export { onImport }
