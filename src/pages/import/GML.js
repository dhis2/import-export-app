import React from 'react'
import i18n from 'd2-i18n'
import { CTX_DEFAULT, TYPE_FILE, TYPE_SELECT } from '../../components'

export class GMLImport extends React.Component {
  static path = '/import/gml'

  static order = 3
  static title = i18n.t('GML Import')
  static description = i18n.t(
    'Import geographic data for organisation units using GML format. GML is an XML grammar for expressing geographical features.',
  )

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_FILE,
      name: 'file',
      label: i18n.t('File'),
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'dryRun',
      label: i18n.t('Dry run'),
    },
  ]

  state = {
    dryRun: {
      selected: 'false',
      values: [
        {
          value: 'false',
          label: i18n.t('No'),
        },
        {
          value: 'true',
          label: i18n.t('Yes'),
        },
      ],
    },
  }

  render() {
    return <div>import gml</div>
  }
}
