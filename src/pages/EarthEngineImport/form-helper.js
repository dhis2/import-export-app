// import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { genericErrorMessage } from '../../utils/helper.js'
import { extractIdAndMessage } from '../../utils/xhr.js'

const isAsync = true

const onImport =
    ({ engine, setProgress, addTask, setShowFullSummaryTask }) =>
    async (values) => {
        const {
            dryRun,
            eeData,
            period,
            dataElement,
            earthEngineId, //eslint-disable-line no-unused-vars
            organisationUnits, //eslint-disable-line no-unused-vars
            aggregationType, //eslint-disable-line no-unused-vars
            rounding, //eslint-disable-line no-unused-vars
            ...bandCocs
        } = values

        setProgress(true)

        let dataValues

        if (Object.keys(bandCocs).length) {
            dataValues = eeData.map(({ ouId, bandId, value }) => {
                return {
                    dataElement,
                    period,
                    orgUnit: ouId,
                    categoryOptionCombo: bandCocs[bandId],
                    value,
                }
            })
        } else {
            dataValues = eeData.map(({ ouId, value }) => {
                return {
                    dataElement,
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
