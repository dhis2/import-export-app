import i18n from '@dhis2/d2-i18n'
import { Divider, IconChevronRight24 } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styles from './MoreOptions.module.css'

/**
 * If not initially visible, doesn't render children. After opening the first
 * time, however, children are instead hidden by CSS on toggle to preserve
 * state
 */
const MoreOptions = ({
    children,
    initiallyVisible,
    noBottomMargin,
    label = i18n.t('Advanced options'),
    dataTest = 'interaction-more-options',
}) => {
    const [hidden, setHidden] = useState(!initiallyVisible)
    const [hasOpened, setHasOpened] = useState(initiallyVisible)

    const onToggle = () => {
        if (!hasOpened) {
            setHasOpened(true)
        }
        setHidden(!hidden)
    }

    return (
        <section
            className={cx({ [styles.container]: !noBottomMargin })}
            data-test={dataTest}
        >
            <header
                className={styles.header}
                onClick={onToggle}
                data-test={`${dataTest}-header`}
            >
                <div
                    className={cx({
                        [styles.chevronHidden]: hidden,
                        [styles.chevronVisible]: !hidden,
                    })}
                >
                    <IconChevronRight24 />
                </div>
                <h2 className={styles.label}>{label}</h2>
            </header>
            {!hidden && <Divider />}
            <div
                className={cx(styles.children, { [styles.hidden]: hidden })}
                data-test={`${dataTest}-children`}
            >
                {hasOpened && children}
            </div>
        </section>
    )
}

MoreOptions.defaultProps = {
    initiallyVisible: false,
    noBottomMargin: false,
}

MoreOptions.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
    dataTest: PropTypes.string,
    initiallyVisible: PropTypes.bool,
    label: PropTypes.string,
    noBottomMargin: PropTypes.bool,
}

export { MoreOptions }
