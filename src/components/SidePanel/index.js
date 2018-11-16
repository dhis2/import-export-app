import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { NavLink } from 'react-router-dom'
import { ArrowUpIcon, ArrowDownIcon } from 'components/Icon'
import { importLinks, exportLinks } from './links'
import s from './styles.css'

export function SidePanel() {
    return (
        <div className={s.container}>
            <div className={s.heading}>
                <ArrowDownIcon width={20} height={20} />
                <span>{i18n.t('Import')}</span>
            </div>
            <div className={s.list}>
                {importLinks.map(({ to, text, icon }) => (
                    <NavLink
                        to={to}
                        key={`import-${to}`}
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

            <div className={s.heading}>
                <ArrowUpIcon width={20} height={20} />
                <span>{i18n.t('Export')}</span>
            </div>
            <div className={s.list}>
                {exportLinks.map(({ to, text, icon }) => (
                    <NavLink
                        to={to}
                        key={`export-${to}`}
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
        </div>
    )
}
