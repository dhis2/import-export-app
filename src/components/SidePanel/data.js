import React from 'react'
import i18n from '@dhis2/d2-i18n'
import {
  MetadataImportIcon,
  MetadataExportIcon,
  MetadataDependencyExportIcon,
  DataIcon,
  EventIcon,
  GMLIcon
} from 'components/Icon'

export const importLinks = [
  {
    to: '/import/metadata',
    text: i18n.t('Metadata Import'),
    svg: <MetadataImportIcon />
  },
  {
    to: '/import/data',
    text: i18n.t('Data Import'),
    svg: <DataIcon />
  },
  {
    to: '/import/event',
    text: i18n.t('Event Import'),
    svg: <EventIcon />
  },
  {
    to: '/import/gml',
    text: i18n.t('GML Import'),
    svg: <GMLIcon />
  }
]

export const exportLinks = [
  {
    to: '/export/metadata',
    text: i18n.t('Metadata Export'),
    svg: <MetadataExportIcon />
  },
  {
    to: '/export/data',
    text: i18n.t('Data Export'),
    svg: <DataIcon />
  },
  {
    to: '/export/event',
    text: i18n.t('Event Export'),
    svg: <EventIcon />
  },
  {
    to: '/export/metadata-dependency',
    text: i18n.t('Metadata Dependency Export'),
    svg: <MetadataDependencyExportIcon />
  }
]
