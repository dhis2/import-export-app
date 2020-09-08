import React from 'react'
import PropTypes from 'prop-types'
import styles from './SchemeContainer.module.css'

const SchemeContainer = ({ children }) => (
    <div className={styles.container}>{children}</div>
)

SchemeContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

export { SchemeContainer }
