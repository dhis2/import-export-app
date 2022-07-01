import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { POPULATION_DATASET_ID } from '../util/earthEngines.js'
import { PopulationAgegroupsDataPreview } from './PopulationAgegroupsDataPreview.js'
import { PopulationDataPreview } from './PopulationDataPreview.js'

const { useField } = ReactFinalForm

const DataPreview = () => {
    const { input } = useField('earthEngineId')
    const { value: earthEngineId } = input

    if (earthEngineId === POPULATION_DATASET_ID) {
        return <PopulationDataPreview />
    }

    return null
    // return <PopulationAgegroupsDataPreview />
}

export { DataPreview }
