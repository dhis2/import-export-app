import React, { Fragment, useCallback, useState } from 'react'
import i18n from '@dhis2/d2-i18n'

import { MinusIcon, PlusIcon } from './Form/MoreOptions'
import styles from './MoreOptions.module.css'

export const MoreOptions = ({ children }) => {
    const [show, setShow] = useState(false)
    const toggleShow = useCallback(
        e => {
            e.preventDefault()
            setShow(!show)
        },
        [show]
    )

    return (
        <Fragment>
            <button onClick={toggleShow} className={styles.button}>
                <span className={styles.icon}>
                    {show ? <MinusIcon /> : <PlusIcon />}
                </span>

                <span className={styles.label}>{i18n.t('more options')}</span>
            </button>

            {show && children}
        </Fragment>
    )
}
