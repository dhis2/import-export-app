import { useConfig } from '@dhis2/app-runtime'
import { ReactFinalForm } from '@dhis2/ui'
import { useState, useEffect } from 'react'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
// import { POPULATION_AGE_GROUPS_DATASET_ID } from '../util/earthEngines.js'
// import { useCatOptComboSelections } from './useCatOptComboSelections.js'

const { useFormState } = ReactFinalForm

// TODO - replace with useDataQuery when it supports repeating param list
// (e.g., orgUnit=O6uvpzGd5pu&orgUnit=fdc6uOvgoji)
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

const useFetchCurrentValues = (eeData) => {
    const { values } = useFormState()
    const {
        earthEngineId,
        organisationUnits,
        dataElement: dataElementId,
        period,
    } = values

    // const { allBandsSelected } = useCatOptComboSelections()
    const { dataElements } = useCachedDataQuery()
    const [currentValues, setCurrentValues] = useState([])
    const { baseUrl } = useConfig()

    // TODO there could be a lot of dataElements. Possible to make this more efficient
    // by fetching more info about the dataElement?
    const dataElement = dataElements.find((el) => el.id === dataElementId)
    const dataElementGroupId = dataElement?.dataElementGroups[0].id

    useEffect(() => {
        const fetchCurrVals = async (url) => {
            const { dataValues } = await fetchCurrentValues(url)
            const cv = dataValues.filter((v) => v.dataElement === dataElementId)

            setCurrentValues(cv)
        }

        if (
            eeData &&
            organisationUnits &&
            period &&
            dataElementId &&
            dataElementGroupId
        ) {
            // if (
            //     (earthEngineId === POPULATION_AGE_GROUPS_DATASET_ID &&
            //         allBandsSelected) ||
            //     earthEngineId !== POPULATION_AGE_GROUPS_DATASET_ID
            // ) {
            //TODO FIX - only add the ouId if it hasn't already been added?
            const ouQueryParams = eeData
                .map(({ ouId }) => `orgUnit=${ouId}`)
                .join('&')

            fetchCurrVals(
                `${baseUrl}/api/dataValueSets?dataElementGroup=${dataElementGroupId}&period=${period}&${ouQueryParams}`
            )
            // }
        }
    }, [
        earthEngineId,
        dataElementId,
        dataElementGroupId,
        period,
        eeData,
        organisationUnits,
        // allBandsSelected,
        baseUrl,
    ])

    return { currentValues }
}

export { useFetchCurrentValues }
