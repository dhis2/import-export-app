import React from 'react'
import PropTypes from 'prop-types'

import styles from './Tag.module.css'

const Tag = ({ text, success, warning, error, info }) => {
    const classNames = [
        styles.container,
        warning && styles.warning,
        error && styles.error,
        success && styles.success,
        info && styles.info,
    ]
        .filter(a => !!a)
        .join(' ')

    return (
        <div className={classNames}>
            <span className={styles.text}>{text}</span>
        </div>
    )
}

Tag.propTypes = {
    text: PropTypes.string.isRequired,
    error: PropTypes.bool,
    info: PropTypes.bool,
    success: PropTypes.bool,
    warning: PropTypes.bool,
}

export { Tag }
