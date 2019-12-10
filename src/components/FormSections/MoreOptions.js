import React, { Fragment, useCallback, useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import cx from 'classnames'

import { MinusIcon, PlusIcon } from '../Form/MoreOptions'
import styles from './MoreOptions.module.css'

export const MoreOptions = ({ children, openInitially }) => {
    const [show, setShow] = useState(openInitially)
    const toggleShow = useCallback(
        e => {
            e.preventDefault()
            setShow(!show)
        },
        [show]
    )

    return (
        <Fragment>
            <button
                onClick={toggleShow}
                className={styles.button}
                data-test="more-options-button"
            >
                <span className={styles.icon}>
                    {show ? <MinusIcon /> : <PlusIcon />}
                </span>

                <span className={styles.label}>{i18n.t('more options')}</span>
            </button>

            <div className={cx(styles.content, { [styles.show]: show })}>
                {children}
            </div>
        </Fragment>
    )
}

MoreOptions.defaultProps = {
    openInitially: false,
}
