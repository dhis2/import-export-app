import {
    ReactFinalForm,
    ComponentCover,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { POPULATION_DATASET_ID } from '../util/earthEngines.js'
import { EARTH_ENGINE_ID } from '../util/formFieldConstants.js'
import { PopulationAgegroupsDataPreview } from './PopulationAgegroupsDataPreview.js'
import { PopulationDataPreview } from './PopulationDataPreview.js'
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
    const [pageNo, setPageNo] = useState(1)
    const { input } = useField(EARTH_ENGINE_ID)
    const { value: earthEngineId } = input

    const updateTable = (rows) => {
        setPageNo(1)
        setRowsPerPage(rows)
    }

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
                <div className={styles.indent}>
                    {earthEngineId === POPULATION_DATASET_ID ? (
                        <PopulationDataPreview
                            eeData={eeData}
                            pointOuRows={pointOuRows}
                            rowsPerPage={rowsPerPage}
                            pageNo={pageNo}
                            onRowsPerPageChanged={updateTable}
                            onPageChanged={(n) => setPageNo(n)}
                        />
                    ) : (
                        <PopulationAgegroupsDataPreview
                            eeData={eeData}
                            pointOuRows={pointOuRows}
                            rowsPerPage={rowsPerPage}
                            pageNo={pageNo}
                            onRowsPerPageChanged={updateTable}
                            onPageChanged={(n) => setPageNo(n)}
                        />
                    )}
                </div>
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
