import { useConfig } from '@dhis2/app-runtime'
import { ReactFinalForm } from '@dhis2/ui'
import { useState, useEffect } from 'react'
import { POPULATION_AGE_GROUPS_DATASET_ID } from '../util/earthEngines.js'
import { fetchCurrentValues } from '../api/fetchCurrentValues.js'
import { useCatOptComboSelections } from './useCatOptComboSelections.js'

const { useField } = ReactFinalForm

const useFetchCurrentValues = (eeData) => {
    const { input: earthEngineIdInput } = useField('earthEngineId')
    const { value: eeId } = earthEngineIdInput
    const { input: orgUnitInput } = useField('organisationUnits')
    const { value: orgUnits } = orgUnitInput
    const { input: periodInput } = useField('period')
    const { value: period } = periodInput
    const { input: dataElementInput } = useField('dataElement')
    const { value: dataElementId } = dataElementInput
    const { input: degInput } = useField('dataElementGroup')
    const { value: dataElementGroupId } = degInput
    const { allBandsSelected } = useCatOptComboSelections()

    const [currentValues, setCurrentValues] = useState([])

    const { baseUrl } = useConfig()

    useEffect(() => {
        const fetchCurrVals = async (url) => {
            const { dataValues } = await fetchCurrentValues(url)
            const cv = dataValues.filter((v) => v.dataElement === dataElementId)

            setCurrentValues(cv)
        }

        if (
            eeData &&
            orgUnits &&
            period &&
            dataElementId &&
            dataElementGroupId
        ) {
            if (
                (eeId === POPULATION_AGE_GROUPS_DATASET_ID &&
                    allBandsSelected) ||
                eeId !== POPULATION_AGE_GROUPS_DATASET_ID
            ) {
                const ouQueryParams = eeData
                    .map(({ ouId }) => `orgUnit=${ouId}`)
                    .join('&')

                fetchCurrVals(
                    `${baseUrl}/api/dataValueSets?dataElementGroup=${dataElementGroupId}&period=${period}&${ouQueryParams}`
                )
            }
        }
    }, [
        dataElementId,
        dataElementGroupId,
        period,
        eeData,
        orgUnits,
        allBandsSelected,
    ])

    return { currentValues }
}

export { useFetchCurrentValues }
