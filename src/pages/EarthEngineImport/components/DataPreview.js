import {
    ReactFinalForm,
    ComponentCover,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { POPULATION_DATASET_ID } from '../util/earthEngines.js'
import { EARTH_ENGINE_ID } from '../util/formFieldConstants.js'
import { PopulationAgegroupsDataPreview } from './PopulationAgegroupsDataPreview.js'
import { PopulationDataPreview } from './PopulationDataPreview.js'
import styles from './styles/DataPreview.module.css'

const { useField } = ReactFinalForm

const DataPreview = ({ fetching, eeData, pointOuRows }) => {
    const { input } = useField(EARTH_ENGINE_ID)
    const { value: earthEngineId } = input

    if (!fetching && !eeData.length) {
        return null
    }

    return (
        <div className={styles.content}>
            {fetching ? (
                <div className={styles.loading}>
                    <ComponentCover translucent>
                        <CenteredContent>
                            <CircularLoader />
                        </CenteredContent>
                    </ComponentCover>
                </div>
            ) : (
                <div className={styles.indent}>
                    {earthEngineId === POPULATION_DATASET_ID ? (
                        <PopulationDataPreview
                            eeData={eeData}
                            pointOuRows={pointOuRows}
                        />
                    ) : (
                        <PopulationAgegroupsDataPreview
                            eeData={eeData}
                            pointOuRows={pointOuRows}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

DataPreview.propTypes = {
    eeData: PropTypes.array,
    fetching: PropTypes.bool,
    pointOuRows: PropTypes.array,
}

export { DataPreview }
