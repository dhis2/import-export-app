import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { NavLink } from 'react-router-dom'
import { ArrowUpIcon, ArrowDownIcon } from '../Icon'
import { importLinks, exportLinks } from './links'
import s from './styles.css'

function Heading({ children }) {
    return <div className={s.heading}>{children}</div>
}

function Contents({ type, list }) {
    return (
        <div className={s.list}>
            {list.map(({ to, text, icon }) => (
                <NavLink
                    to={to}
                    key={`${type}-${to}`}
                    className={s.link}
                    activeClassName={s.active}
                >
                    <div className={s.item}>
                        {icon}
                        <div className={s.text}>{text}</div>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export function SidePanel() {
    return (
        <div className={s.container}>
            <Heading>
                <ArrowDownIcon />
                <span>{i18n.t('Import')}</span>
            </Heading>
            <Contents type="import" list={importLinks} />

            <Heading>
                <ArrowUpIcon />
                <span>{i18n.t('Export')}</span>
            </Heading>
            <Contents type="export" list={exportLinks} />
        </div>
    )
}
