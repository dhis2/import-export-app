import React, { useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { MinusIcon, PlusIcon } from '../Icon'
import s from './MoreOptions.module.css'

const MoreOptions = ({ children, initiallyVisible = false, dataTest }) => {
    const [hidden, setHidden] = useState(!initiallyVisible)

    const onToggle = () => {
        setHidden(!hidden)
    }

    return (
        <div className={s.container} data-test={dataTest}>
            <div className={s.header} onClick={onToggle}>
                {hidden ? <PlusIcon /> : <MinusIcon />}
                {i18n.t('more options')}
            </div>
            <div className={s.children}>{!hidden && children}</div>
        </div>
    )
}

MoreOptions.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
    dataTest: PropTypes.string.isRequired,
    initiallyVisible: PropTypes.bool,
}

export { MoreOptions }
