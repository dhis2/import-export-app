import React from 'react'
import i18n from 'd2-i18n'
import { NavLink } from 'react-router-dom'
import s from './styles.css'

const importLinks = [
  {
    to: '/import/metadata',
    text: i18n.t('Metadata Import')
  },
  {
    to: '/import/data',
    text: i18n.t('Data Import')
  },
  {
    to: '/import/gml',
    text: i18n.t('GML Import')
  },
  {
    to: '/import/event',
    text: i18n.t('Event Import')
  }
]

const exportLinks = [
  {
    to: '/export/metadata',
    text: i18n.t('Metadata Export')
  },
  {
    to: '/export/metadata-dependency',
    text: i18n.t('Metadata Dependency Export')
  },
  {
    to: '/export/data',
    text: i18n.t('Data Export')
  },
  {
    to: '/export/event',
    text: i18n.t('Event Export')
  }
]

export class SidePanel extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <div className={s.heading}>{i18n.t('Import')}</div>
        <div className={s.list}>
          {importLinks.map(({ to, text }) => (
            <NavLink
              to={to}
              key={`import-${to}`}
              className={s.link}
              activeClassName={s.active}
            >
              <div className={s.item}>
                <div className={s.text}>{text}</div>
              </div>
            </NavLink>
          ))}
        </div>

        <div className={s.heading}>{i18n.t('Export')}</div>
        <div className={s.list}>
          {exportLinks.map(({ to, text }) => (
            <NavLink
              to={to}
              key={`export-${to}`}
              className={s.link}
              activeClassName={s.active}
            >
              <div className={s.item}>
                <div className={s.text}>{text}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    )
  }
}
