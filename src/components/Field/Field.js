import React from 'react'
import propTypes from 'prop-types'
import styles from './Field.module.css'

export const Field = ({ children }) => (
    <div className={styles.field}>{children}</div>
)

Field.propTypes = {
    children: propTypes.node.isRequired,
}
