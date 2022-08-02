import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import React from 'react'
import { POPULATION_DATASET_ID } from '../util/earthEngines.js'
import { DataElementGroup } from './DataElementGroup.js'
import { PopulationAgegroupsDataPreview } from './PopulationAgegroupsDataPreview.js'
import { PopulationDataPreview } from './PopulationDataPreview.js'
import styles from './styles/DataPreview.module.css'

const { useField, Field } = ReactFinalForm

const DataPreview = () => {
    const { input: eeInput } = useField('earthEngineId')
    const { value: earthEngineId } = eeInput
    const { input } = useField('showDataPreview')
    const { value: showDataPreview } = input

    return (
        <div className={styles.container}>
            <Field
                type="checkbox"
                component={CheckboxFieldFF}
                name="showDataPreview"
                label={i18n.t('Show data preview')}
            />
            {showDataPreview && (
                <div className={styles.indent}>
                    <DataElementGroup />
                    {earthEngineId === POPULATION_DATASET_ID ? (
                        <PopulationDataPreview />
                    ) : (
                        <PopulationAgegroupsDataPreview />
                    )}
                </div>
            )}
        </div>
    )
}

export { DataPreview }
