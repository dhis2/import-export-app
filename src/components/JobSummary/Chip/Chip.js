import React from 'react'
import PropTypes from 'prop-types'

import s from './Chip.module.css'

const Chip = ({ text, success, warning, error, info }) => (
    <div
        className={`${s.container} ${warning && s.warning} ${error &&
            s.error} ${success && s.success} ${info && s.info}`}
    >
        <span className={s.text}>{text}</span>
    </div>
)

Chip.propTypes = {
    text: PropTypes.string.isRequired,
    error: PropTypes.bool,
    info: PropTypes.bool,
    success: PropTypes.bool,
    warning: PropTypes.bool,
}

export { Chip }
