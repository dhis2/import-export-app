import { ouIdHelper } from '@dhis2/analytics'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import { useState, useEffect } from 'react'

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

    const [currentValues, setCurrentValues] = useState([])
    const [error, setError] = useState(null)
    const { baseUrl } = useConfig()

    useEffect(() => {
        const fetchCurrVals = async (url) => {
            const { dataValues } = await fetchCurrentValues(url)
            const cv = dataValues.filter((v) => v.dataElement === dataElementId)

            setCurrentValues(cv)
        }

        if (organisationUnits && period && dataElementId) {
            setError(null)
            const ouQueryParams = organisationUnits
                .map(({ id }) => `orgUnit=${id}`)
                .join('&')

            const hasLevelPrefix = organisationUnits.find((ou) =>
                ouIdHelper.hasLevelPrefix(ou.id)
            )
            let url = `${baseUrl}/api/dataValueSets?dataElement=${dataElementId}&period=${period}&${ouQueryParams}`
            if (hasLevelPrefix) {
                url = url.concat('&children=true')
            }

            fetchCurrVals(url)
        } else {
            const missingPeriod = period === undefined ? 'Period' : null
            const missingOus = !organisationUnits.length
                ? 'Organisation units'
                : null
            const missingParams = [missingPeriod, missingOus]
                .filter((m) => m !== null)
                .join(', ')
            setError(
                i18n.t(
                    `Could not fetch current values due to missing parameters: ${missingParams}`
                )
            )
        }
    }, [earthEngineId, dataElementId, period, organisationUnits, baseUrl])

    return { currentValues, error }
}

export { useFetchCurrentValues }
