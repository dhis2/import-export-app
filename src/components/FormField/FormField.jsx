import PropTypes from 'prop-types'
import React from 'react'
import styles from './FormField.module.css'

const FormField = ({ dataTest, label, required = false, children }) => {
    return (
        <div className={styles.container} data-test={dataTest}>
            <span className={styles.label}>
                {label}
                {required && <span> *</span>}
            </span>
            {children}
        </div>
    )
}

FormField.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.node,
    required: PropTypes.bool,
}

export { FormField }
