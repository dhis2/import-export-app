import React from 'react'
import i18n from 'd2-i18n'
import { today } from 'helpers'
import {
  FormBase,
  CTX_DEFAULT,
  TYPE_SELECT,
  TYPE_RADIO,
  TYPE_DATE,
  TYPE_ORG_UNIT
} from 'components'

export class EventExport extends FormBase {
  static path = '/export/event'

  static order = 8
  static title = i18n.t('Event Export')
  static description = i18n.t(
    'Export event data for programs, stages and tracked entities in the DXF 2 format.'
  )

  formWidth = 600
  formTitle = i18n.t('Event Export')
  submitLabel = i18n.t('Export')

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_ORG_UNIT,
      name: 'orgUnit',
      label: i18n.t('Organisation unit')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'programs',
      label: i18n.t('Programs')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_ORG_UNIT,
      name: 'programStages',
      label: i18n.t('Program Stages')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'idscheme',
      label: i18n.t('ID scheme')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_DATE,
      name: 'startDate',
      label: i18n.t('Start date')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_DATE,
      name: 'endDate',
      label: i18n.t('End date')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'inclusion',
      label: i18n.t('Inclusion')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'format',
      label: i18n.t('Format')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'compression',
      label: i18n.t('Compression')
    }
  ]

  state = {
    orgUnit: '',
    programs: {
      selected: '',
      values: []
    },
    programStages: {
      selected: '',
      values: [
        {
          value: '',
          label: i18n.t('[ All program stages]')
        }
      ]
    },
    idscheme: {
      selected: 'UID',
      values: [
        {
          value: 'UID',
          label: i18n.t('UID')
        },
        {
          value: 'CODE',
          label: i18n.t('Code')
        }
      ]
    },
    startDate: today(),
    endDate: today(),

    inclusion: {
      selected: 'selected',
      values: [
        {
          value: 'selected',
          label: i18n.t('Selected organisation unit')
        },
        {
          value: 'children',
          label: i18n.t('Include children of organisation unit')
        },
        {
          value: 'descendants',
          label: i18n.t('Include descendants of organisation unit')
        }
      ]
    },
    format: {
      selected: '.xml',
      values: [
        {
          value: '.xml',
          label: i18n.t('XML')
        },
        {
          value: '.json',
          label: i18n.t('JSON')
        },
        {
          value: '.csv',
          label: i18n.t('CSV')
        }
      ]
    },
    compression: {
      selected: '.zip',
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
          label: 'Uncompressed'
        }
      ]
    }
  }

  onSubmit = () => {
    console.log('onSubmit Event Export')
  }
}
