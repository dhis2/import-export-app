import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import { useState, useEffect } from 'react'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'

const { useFormState } = ReactFinalForm

const fetchCurrentValues = async (url) => {
    const fetcher = (url) =>
        fetch(url, { credentials: 'include' })
            .then((resp) => {
                if (resp.status >= 200 && resp.status < 300) {
                    return Promise.resolve(resp.json())
                } else {
                    throw resp
                }
            })
            .catch((resp) => {
                const error = new Error(resp.statusText || resp.status)
                console.error(`fetchCurrentValues error: `, error)
                return Promise.reject(error)
            })

    return await fetcher(url).catch((error) => Promise.reject(error))
}

const useFetchCurrentValues = () => {
    const { values } = useFormState()
    const { earthEngineId, organisationUnits, dataElementId, period } = values

    const { dataElements } = useCachedDataQuery()
    const [currentValues, setCurrentValues] = useState([])
    const [error, setError] = useState(null)
    const { baseUrl } = useConfig()

    const dataElement = dataElements.find((el) => el.id === dataElementId)
    // TODO - what if no dataElementGroup has been set up? probably an alert with a warning that
    // current values couldn't be fetched
    const dataElementGroupId = dataElement?.dataElementGroups[0]?.id

    useEffect(() => {
        const fetchCurrVals = async (url) => {
            const { dataValues } = await fetchCurrentValues(url)
            const cv = dataValues.filter((v) => v.dataElement === dataElementId)

            setCurrentValues(cv)
        }

        if (
            organisationUnits &&
            period &&
            dataElementId &&
            dataElementGroupId
        ) {
            setError(null)
            const ouQueryParams = organisationUnits
                .map(({ id }) => `orgUnit=${id}`)
                .join('&')

            fetchCurrVals(
                `${baseUrl}/api/dataValueSets?dataElementGroup=${dataElementGroupId}&period=${period}&${ouQueryParams}`
            )
        } else {
            const missingDEG =
                dataElementGroupId === undefined ? 'Data element group' : null
            const missingPeriod = period === undefined ? 'Period' : null
            const missingOus = !organisationUnits.length
                ? 'Organisation units'
                : null
            const missingParams = [missingDEG, missingPeriod, missingOus]
                .filter((m) => m !== null)
                .join(', ')
            setError(
                i18n.t(
                    `Could not fetch current values due to missing parameters: ${missingParams}`
                )
            )
        }
    }, [
        earthEngineId,
        dataElementId,
        dataElementGroupId,
        period,
        organisationUnits,
        baseUrl,
    ])

    return { currentValues, error }
}

export { useFetchCurrentValues }
