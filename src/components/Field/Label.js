import React from 'react'
import propTypes from 'prop-types'
import styles from './Label.module.css'

export const Label = ({ children, htmlFor }) => (
    <label className={styles.label} htmlFor={htmlFor}>
        {children}
    </label>
)

Label.propTypes = {
    children: propTypes.string.isRequired,
    htmlFor: propTypes.string,
}
