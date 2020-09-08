import React from 'react'
import PropTypes from 'prop-types'

import styles from './JobOverview.module.css'

const ChipContainer = ({ children }) => (
    <div className={styles.chips} data-test="job-overview-chips">
        {children}
    </div>
)

ChipContainer.propTypes = {
    children: PropTypes.node,
}

export { ChipContainer }
