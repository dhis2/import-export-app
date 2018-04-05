import React from 'react'
import i18n from 'd2-i18n'
import {
  CTX_DEFAULT,
  CTX_MORE_OPTIONS,
  TYPE_DATE,
  TYPE_SELECT,
  TYPE_ORG_UNIT,
  TYPE_SELECT_DATA_SETS
} from 'components'
import { today } from 'helpers'

export class DataExport extends React.Component {
  static path = '/export/data'

  static order = 7
  static title = i18n.t('Data Export')
  static description = i18n.t(
    'Export data values. This is the regular export function which exports data to the DHIS 2 exchange format called DXF 2.'
  )

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_ORG_UNIT,
      name: 'orgUnit',
      label: i18n.t('Organisation unit')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT_DATA_SETS,
      name: 'dataSets',
      label: i18n.t('')
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
      type: TYPE_SELECT,
      name: 'exportFormat',
      label: i18n.t('Format')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'compression',
      label: i18n.t('Compression')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_SELECT,
      name: 'dataElementIdScheme',
      label: i18n.t('Data element ID scheme')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_SELECT,
      name: 'orgUnitIdScheme',
      label: i18n.t('Org unit ID scheme')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_SELECT,
      name: 'categoryOptionComboIdScheme',
      label: i18n.t('Category ID scheme')
    }
  ]

  state = {
    orgUnit: '',
    dataSets: [],
    startDate: today(),
    endDate: today(),
    exportFormat: {
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
    compression: {
      selected: 'zip',
      values: [
        {
          value: 'zip',
          label: i18n.t('Zip')
        },
        {
          value: '',
          label: 'Uncompressed'
        }
      ]
    },
    dataElementIdScheme: {
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
    },
    categoryOptionComboIdScheme: {
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
    }
  }

  render() {
    return <div>export data</div>
  }
}
