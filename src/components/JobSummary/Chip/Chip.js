import React from 'react'
import PropTypes from 'prop-types'

import s from './Chip.module.css'

const Chip = ({ text, success, warning, error }) => (
    <div
        className={`${s.container} ${warning && s.warning} ${error &&
            s.error} ${success && s.success}`}
    >
        <span className={s.text}>{text}</span>
    </div>
)

Chip.propTypes = {
    text: PropTypes.string.isRequired,
    error: PropTypes.bool,
    success: PropTypes.bool,
    warning: PropTypes.bool,
}

export { Chip }
