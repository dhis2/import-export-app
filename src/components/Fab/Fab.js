import React from 'react'
import PropTypes from 'prop-types'

import s from './Fab.module.css'

const Fab = ({ icon, text, onClick, dataTest }) => {
    return (
        <div className={s.fabContainer} data-test={dataTest}>
            <div className={s.insideButton}>
                <button className={s.fabButton} onClick={onClick}>
                    <div className={s.icon}>{icon}</div>
                    {text}
                </button>
            </div>
        </div>
    )
}

Fab.propTypes = {
    dataTest: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.node,
    text: PropTypes.string,
}

export { Fab }
