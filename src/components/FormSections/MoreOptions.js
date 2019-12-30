import React, { useCallback, useState } from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
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
        <Field>
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
        </Field>
    )
}

MoreOptions.defaultProps = {
    openInitially: false,
}
