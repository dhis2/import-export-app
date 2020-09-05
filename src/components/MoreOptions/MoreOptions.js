import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'
import { Divider } from '@dhis2/ui'
import { ChevronRight } from '@dhis2/ui-icons'

import styles from './MoreOptions.module.css'

const MoreOptions = ({
    children,
    initiallyVisible = false,
    label = i18n.t('Advanced options'),
    dataTest = 'interaction-more-options',
}) => {
    const [hidden, setHidden] = useState(!initiallyVisible)

    const onToggle = () => {
        setHidden(!hidden)
    }

    return (
        <section className={styles.container} data-test={dataTest}>
            <header
                className={styles.header}
                onClick={onToggle}
                data-test={`${dataTest}-header`}
            >
                <ChevronRight
                    className={cx({
                        [styles.chevronHidden]: hidden,
                        [styles.chevronVisible]: !hidden,
                    })}
                />
                <h2 className={styles.label}>{label}</h2>
            </header>
            <Divider />
            <div className={styles.children} data-test={`${dataTest}-children`}>
                {!hidden && children}
            </div>
        </section>
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
