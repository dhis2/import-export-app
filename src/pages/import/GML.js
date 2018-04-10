import React from 'react'
import i18n from 'd2-i18n'
import { FormBase, CTX_DEFAULT, TYPE_FILE, TYPE_RADIO } from 'components'

export class GMLImport extends FormBase {
  static path = '/import/gml'

  static order = 3
  static title = i18n.t('GML Import')
  static description = i18n.t(
    'Import geographic data for organisation units using GML format. GML is an XML grammar for expressing geographical features.'
  )

  formWidth = 600
  formTitle = i18n.t('GML Import')
  submitLabel = i18n.t('Import')

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_FILE,
      name: 'file',
      label: null
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'dryRun',
      label: i18n.t('Dry run')
    }
  ]

  state = {
    dryRun: {
      selected: 'false',
      values: [
        {
          value: 'false',
          label: i18n.t('No')
        },
        {
          value: 'true',
          label: i18n.t('Yes')
        }
      ]
    }
  }

  onSubmit = () => {
    console.log('onSubmit GML Import')
  }
}
