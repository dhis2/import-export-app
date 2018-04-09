import React from 'react'
import i18n from 'd2-i18n'
import {
  Form,
  FormBase,
  CTX_DEFAULT,
  CTX_MORE_OPTIONS,
  TYPE_FILE,
  TYPE_SELECT,
  TYPE_RADIO
} from 'components/index'

import s from './styles.css'

export class MetaDataImport extends FormBase {
  static path = '/import/metadata'

  static order = 1
  static title = i18n.t('Metadata Import')
  static description = i18n.t(
    'Import metadata like data elements and organisation units using the standard DHIS 2 exchange format called DXF 2.'
  )

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_FILE,
      name: 'file',
      label: i18n.t('File')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'importFormat',
      label: i18n.t('Format'),
      className: s.importFormat
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'dryRun',
      label: i18n.t('Dry run')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'strategy',
      label: i18n.t('Strategy')
    },

    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'atomicMode',
      label: i18n.t('Reference mode')
    }
  ]

  state = {
    _context: CTX_DEFAULT,

    importFormat: {
      selected: 'json',
      values: [
        {
          value: 'json',
          label: i18n.t('json')
        },
        {
          value: 'xml',
          label: i18n.t('xml')
        },
        {
          value: 'csv',
          label: i18n.t('csv')
        }
      ]
    },

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
    },

    strategy: {
      selected: 'NEW_AND_UPDATES',
      values: [
        {
          value: 'NEW_AND_UPDATES',
          label: i18n.t('New and Updates')
        },
        {
          value: 'NEW',
          label: i18n.t('New only')
        },
        {
          value: 'UPDATES',
          label: i18n.t('Updates only')
        }
      ]
    },

    atomicMode: {
      selected: 'NONE',
      values: [
        {
          value: 'NONE',
          label: i18n.t('Allow invalid references')
        },
        {
          value: 'ALL',
          label: i18n.t('Deny invalid references')
        }
      ]
    }
  }

  onSubmit = () => {
    console.log('onSubmit')
  }

  render() {
    return (
      <Form
        className={s.form}
        fields={this.fields}
        fieldValues={this.state}
        title={i18n.t('Metadata Import')}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    )
  }
}
