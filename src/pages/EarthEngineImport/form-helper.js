// import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js' // TODO
import { genericErrorMessage } from '../../utils/helper.js'
import { extractIdAndMessage } from '../../utils/xhr.js'
import { OU_ID, BAND_ID, VALUE } from './util/getStructuredData.js'

const isAsync = true

const onImport =
    ({ engine, setProgress, addTask, setShowFullSummaryTask }) =>
    async (values) => {
        const {
            dryRun,
            eeData,
            dataElementId: dataElement,
            period,
            bandCocs = [],
        } = values

        setProgress(true)

        let dataValues

        if (bandCocs.length) {
            dataValues = eeData.map((d) => ({
                dataElement,
                period,
                orgUnit: d[OU_ID],
                categoryOptionCombo: bandCocs.find((bc) => bc.id === d[BAND_ID])
                    .coc,
                value: d[VALUE],
            }))
        } else {
            dataValues = eeData.map((d) => ({
                dataElement,
                period,
                orgUnit: d[OU_ID],
                value: d[VALUE],
            }))
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
