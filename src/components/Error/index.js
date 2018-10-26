import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RaisedButton } from 'material-ui'
import s from './styles.css'

export function Error({ message, onClear }) {
    return (
        <div className={s.container}>
            <div className={s.head}>
                <div className={s.title}>{i18n.t('Import Error')}</div>
            </div>
            <div className={s.contents}>{message}</div>
            <div className={s.buttons}>
                <RaisedButton
                    primary={true}
                    label={i18n.t('Go Back')}
                    onClick={onClear}
                />
            </div>
        </div>
    )
}
