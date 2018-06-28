import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { NavLink } from 'react-router-dom'
import { ArrowUpIcon, ArrowDownIcon } from 'components/Icon'
import s from './styles.css'
import {
  MetaDataImport,
  MetaDataExport,
  DataImport,
  DataExport,
  GMLImport,
  EventImport,
  EventExport,
  MetaDataDependencyExport
} from 'pages'

export class SidePanel extends React.Component {
  render() {
    const importLinks = [
      {
        to: '/import/metadata',
        text: i18n.t('Metadata Import'),
        icon: MetaDataImport.menuIcon
      },
      {
        to: '/import/data',
        text: i18n.t('Data Import'),
        icon: DataImport.menuIcon
      },
      {
        to: '/import/event',
        text: i18n.t('Event Import'),
        icon: EventImport.menuIcon
      },
      {
        to: '/import/gml',
        text: i18n.t('GML Import'),
        icon: GMLImport.menuIcon
      }
    ]

    const exportLinks = [
      {
        to: '/export/metadata',
        text: i18n.t('Metadata Export'),
        icon: MetaDataExport.menuIcon
      },
      {
        to: '/export/data',
        text: i18n.t('Data Export'),
        icon: DataExport.menuIcon
      },
      {
        to: '/export/event',
        text: i18n.t('Event Export'),
        icon: EventExport.menuIcon
      },
      {
        to: '/export/metadata-dependency',
        text: i18n.t('Metadata Dependency Export'),
        icon: MetaDataDependencyExport.menuIcon
      }
    ]

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
}
