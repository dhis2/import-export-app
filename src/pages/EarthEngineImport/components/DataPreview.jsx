import {
    ReactFinalForm,
    ComponentCover,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { getEarthEngineBands } from '../util/earthEngines.js'
import { EARTH_ENGINE_ID } from '../util/formFieldConstants.js'
import { PopulationAgegroupsDataPreview } from './PopulationAgegroupsDataPreview.jsx'
import { PopulationDataPreview } from './PopulationDataPreview.jsx'
import styles from './styles/DataPreview.module.css'

const { useField } = ReactFinalForm

const DEFAULT_ROWS_PER_PAGE = 10

const DataPreview = ({
    loading,
    eeData,
    pointOuRows,
    modifiedSinceLastSubmit,
}) => {
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)
    const { input } = useField(EARTH_ENGINE_ID)
    const { value: earthEngineId } = input

    if (modifiedSinceLastSubmit) {
        return null
    }

    if (!loading && !eeData.length) {
        return null
    }

    return (
        <div className={styles.content}>
            {loading ? (
                <div className={styles.loading}>
                    <ComponentCover translucent>
                        <CenteredContent>
                            <CircularLoader />
                        </CenteredContent>
                    </ComponentCover>
                </div>
            ) : (
                <>
                    {!getEarthEngineBands(earthEngineId).length ? (
                        <PopulationDataPreview
                            eeData={eeData}
                            pointOuRows={pointOuRows}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChanged={setRowsPerPage}
                        />
                    ) : (
                        <PopulationAgegroupsDataPreview
                            eeData={eeData}
                            pointOuRows={pointOuRows}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChanged={setRowsPerPage}
                        />
                    )}
                </>
            )}
        </div>
    )
}

DataPreview.propTypes = {
    eeData: PropTypes.array,
    loading: PropTypes.bool,
    modifiedSinceLastSubmit: PropTypes.bool,
    pointOuRows: PropTypes.array,
}

export { DataPreview }
