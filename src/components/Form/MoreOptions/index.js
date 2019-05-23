import React from 'react'
import { SvgIcon } from 'material-ui'
import i18n from '@dhis2/d2-i18n'
import s from './styles.module.css'
import { CTX_DEFAULT, CTX_MORE_OPTIONS } from '../'

function PlusIcon() {
    return (
        <SvgIcon>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </SvgIcon>
    )
}

function MinusIcon() {
    return (
        <SvgIcon>
            <path d="M19 13H5v-2h14v2z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </SvgIcon>
    )
}

export default function MoreOptions({ enabled, onClick }) {
    return (
        <div
            className={s.container}
            onClick={() => onClick(enabled ? CTX_DEFAULT : CTX_MORE_OPTIONS)}
        >
            {enabled ? <MinusIcon /> : <PlusIcon />}
            {i18n.t('more options')}
        </div>
    )
}
