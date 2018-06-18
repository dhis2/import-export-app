import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { NavLink } from 'react-router-dom'
import { ArrowUpIcon, ArrowDownIcon } from 'components/Icon'
import s from './styles.css'
import { importLinks, exportLinks } from './data'

export class SidePanel extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <div className={s.heading}>
          <ArrowDownIcon width="20" height="20" />
          <span>{i18n.t('Import')}</span>
        </div>
        <div className={s.list}>
          {importLinks.map(({ to, text, svg }) => (
            <NavLink
              to={to}
              key={`import-${to}`}
              className={s.link}
              activeClassName={s.active}
            >
              <div className={s.item}>
                {typeof svg !== 'undefined' && svg}
                <div className={s.text}>{text}</div>
              </div>
            </NavLink>
          ))}
        </div>

        <div className={s.heading}>
          <ArrowUpIcon width="20" height="20" />
          <span>{i18n.t('Export')}</span>
        </div>
        <div className={s.list}>
          {exportLinks.map(({ to, text, svg }) => (
            <NavLink
              to={to}
              key={`export-${to}`}
              className={s.link}
              activeClassName={s.active}
            >
              <div className={s.item}>
                {typeof svg !== 'undefined' && svg}
                <div className={s.text}>{text}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    )
  }
}
