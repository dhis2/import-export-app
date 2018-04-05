import React from 'react'
import i18n from 'd2-i18n'
import { CTX_DEFAULT, TYPE_SELECT } from 'components'

export class MetaDataDependencyExport extends React.Component {
  static path = '/export/metadata-dependency'

  static order = 6
  static title = i18n.t('Metadata Dependency Export')
  static description = i18n.t(
    'Export metadata like data sets and programs including related metadata objects.'
  )

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'objectType',
      label: i18n.t('Object type')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'objectList',
      label: i18n.t('Object')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'format',
      label: i18n.t('Format')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'compression',
      label: i18n.t('Compression')
    }
  ]

  state = {
    objectType: {
      selected: 'dataSets',
      values: [
        {
          value: 'dataSets',
          label: i18n.t('Data sets')
        },
        {
          value: 'programs',
          label: i18n.t('Programs')
        },
        {
          value: 'categoryCombos',
          label: i18n.t('Category combination')
        },
        {
          value: 'dashboards',
          label: i18n.t('Dashboard')
        },
        {
          value: 'dataElementGroups',
          label: i18n.t('Data element groups')
        }
      ]
    },
    objectList: {
      selected: '',
      values: []
    },
    format: {
      selected: '.json',
      values: [
        {
          value: '.json',
          label: i18n.t('JSON')
        },
        {
          value: '.xml',
          label: i18n.t('XML')
        }
      ]
    },
    compression: {
      selected: '',
      values: [
        {
          value: '.zip',
          label: i18n.t('Zip')
        },
        {
          value: '.gz',
          label: i18n.t('Gzip')
        },
        {
          value: '',
          label: i18n.t('Uncompressed')
        }
      ]
    }
  }

  render() {
    return <div>export MetaData dependency</div>
  }
}
