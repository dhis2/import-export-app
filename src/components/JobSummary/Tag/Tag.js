import React from 'react'
import PropTypes from 'prop-types'

import s from './Tag.module.css'

const Tag = ({ text, success, warning, error, info }) => {
    const classNames = [
        s.container,
        warning && s.warning,
        error && s.error,
        success && s.success,
        info && s.info,
    ]
        .filter(a => !!a)
        .join(' ')

    return (
        <div className={classNames}>
            <span className={s.text}>{text}</span>
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
