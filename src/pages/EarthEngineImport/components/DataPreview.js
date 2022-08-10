import {
    ReactFinalForm,
    ComponentCover,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import React from 'react'
import { POPULATION_DATASET_ID } from '../util/earthEngines.js'
import { PopulationAgegroupsDataPreview } from './PopulationAgegroupsDataPreview.js'
import { PopulationDataPreview } from './PopulationDataPreview.js'
import styles from './styles/DataPreview.module.css'

const { useField } = ReactFinalForm

const DataPreview = (props) => {
    const { input: eeInput } = useField('earthEngineId')
    const { value: earthEngineId } = eeInput

    return (
        <div className={styles.content}>
            {!props.eeData.length && (
                <div className={styles.loading}>
                    <ComponentCover translucent>
                        <CenteredContent>
                            <CircularLoader />
                        </CenteredContent>
                    </ComponentCover>
                </div>
            )}
            <div className={styles.indent}>
                {earthEngineId === POPULATION_DATASET_ID ? (
                    <PopulationDataPreview {...props} />
                ) : (
                    <PopulationAgegroupsDataPreview {...props} />
                )}
            </div>
        </div>
    )

    // return (
    //     <div className={styles.indent}>
    //         {earthEngineId === POPULATION_DATASET_ID ? (
    //             <PopulationDataPreview {...props} />
    //         ) : (
    //             <PopulationAgegroupsDataPreview {...props} />
    //         )}
    //     </div>
    // )
}

export { DataPreview }
