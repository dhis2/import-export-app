import React from 'react'
import i18n from 'd2-i18n'
import {
  CTX_DEFAULT,
  CTX_MORE_OPTIONS,
  TYPE_FILE,
  TYPE_SELECT
} from '../../components'

export class EventImport extends React.Component {
  static path = '/import/event'

  static order = 4
  static title = i18n.t('Event Import')
  static description = i18n.t(
    'Import events for programs, stages and tracked entities in the DXF 2 format.'
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
      type: TYPE_SELECT,
      name: 'payloadFormat',
      label: i18n.t('Format')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'dryRun',
      label: i18n.t('Dry run')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'eventIdScheme',
      label: i18n.t('Event ID Scheme')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'orgUnitIdScheme',
      label: i18n.t('Org unit ID scheme')
    }
  ]

  state = {
    payloadFormat: {
      selected: 'json',
      values: [
        {
          value: 'json',
          label: i18n.t('JSON')
        },
        {
          value: 'xml',
          label: i18n.t('XML')
        },
        {
          value: 'csv',
          label: i18n.t('CSV')
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

    eventIdScheme: {
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

    orgUnitIdScheme: {
      selected: 'UID',
      values: [
        {
          value: 'UID',
          label: i18n.t('UID')
        },
        {
          value: 'CODE',
          label: i18n.t('Code')
        },
        {
          value: 'NAME',
          label: i18n.t('Name')
        },
        {
          value: 'ATTRIBUTE:UKNKz1H10EE',
          label: i18n.t('HR identifier')
        }
      ]
    }
  }

  render() {
    return <div>import event</div>
  }
}
