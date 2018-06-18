import i18n from '@dhis2/d2-i18n'
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

export const importLinks = [
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

export const exportLinks = [
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
