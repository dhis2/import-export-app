import React, { useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { MinusIcon, PlusIcon } from '../'
import styles from './MoreOptions.module.css'

const MoreOptions = ({
    children,
    initiallyVisible = false,
    label = i18n.t('more options'),
    dataTest = 'interaction-more-options',
}) => {
    const [hidden, setHidden] = useState(!initiallyVisible)

    const onToggle = () => {
        setHidden(!hidden)
    }

    return (
        <div className={styles.container} data-test={dataTest}>
            <div
                className={styles.header}
                onClick={onToggle}
                data-test={`${dataTest}-header`}
            >
                {hidden ? <PlusIcon /> : <MinusIcon />}
                {label}
            </div>
            <div className={styles.children} data-test={`${dataTest}-children`}>
                {!hidden && children}
            </div>
        </div>
    )
}

MoreOptions.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
    dataTest: PropTypes.string,
    initiallyVisible: PropTypes.bool,
    label: PropTypes.string,
}

export { MoreOptions }
