import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { FormBase } from 'components/FormBase'
import {
  CTX_DEFAULT,
  CTX_MORE_OPTIONS,
  TYPE_DATE,
  TYPE_RADIO,
  TYPE_ORG_UNIT,
  TYPE_MORE_OPTIONS,
  TYPE_DATASET_PICKER
} from 'components/Form'
import moment from 'moment'
import { eventEmitter } from 'services'
import { apiConfig } from 'config'
import { today, downloadBlob, createBlob } from 'helpers'
import { getMimeTypeFromName } from '../import/helpers'
import { getInstance } from 'd2/lib/d2'
import { DataIcon } from 'components/Icon'

export class DataExport extends FormBase {
  static path = '/export/data'

  static order = 7
  static title = i18n.t('Data Export')
  static menuIcon = <DataIcon />
  icon = <DataIcon />

  static contextTypes = {
    d2: PropTypes.object
  }

  formWidth = 600
  formTitle = i18n.t('Data Export')
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
      type: TYPE_DATASET_PICKER,
      name: 'selectedDataSets',
      label: i18n.t('Data Sets')
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
      name: 'exportFormat',
      label: i18n.t('Format')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'compression',
      label: i18n.t('Compression')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_MORE_OPTIONS
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'dataElementIdScheme',
      label: i18n.t('Data element ID scheme')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'orgUnitIdScheme',
      label: i18n.t('Org unit ID scheme')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'categoryOptionComboIdScheme',
      label: i18n.t('Category ID scheme')
    }
  ]

  state = {
    processing: false,
    orgUnit: {
      selected: [],
      value: null
    },
    selectedDataSets: {
      selected: [],
      value: null
    },
    startDate: {
      selected: today()
    },
    endDate: {
      selected: today()
    },
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
          value: 'none',
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

  async componentDidMount() {
    await this.fetch()
  }

  async fetch() {
    try {
      const d2 = await getInstance()

      const dataSets = await d2.models.dataSet
        .list({ paging: false, fields: 'id,displayName' })
        .then(collection => collection.toArray())
        .then(sets =>
          sets.map(dataSet => ({
            value: dataSet.id,
            label: dataSet.displayName
          }))
        )

      this.setState({
        selectedDataSets: {
          selected: [],
          value: dataSets
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  onSubmit = async () => {
    try {
      const {
        orgUnit,
        startDate,
        endDate,
        exportFormat,
        compression,
        dataElementIdScheme,
        orgUnitIdScheme,
        categoryOptionComboIdScheme,
        selectedDataSets
      } = this.getFormState()

      if (orgUnit.length === 0 || selectedDataSets.length === 0) {
        return
      }

      const contentType = getMimeTypeFromName(exportFormat)

      const params = []
      params.push(`startDate=${moment(startDate).format('YYYY-MM-DD')}`)
      params.push(`endDate=${moment(endDate).format('YYYY-MM-DD')}`)
      params.push(`exportFormat=${exportFormat}`)
      params.push(`compression=${compression}`)
      params.push(`dataElementIdScheme=${dataElementIdScheme}`)
      params.push(`orgUnitIdScheme=${orgUnitIdScheme}`)
      params.push(`categoryOptionComboIdScheme=${categoryOptionComboIdScheme}`)

      orgUnit.forEach(v => {
        params.push(`orgUnit=${v.substr(v.lastIndexOf('/') + 1)}`)
      })

      selectedDataSets.forEach(v => {
        params.push(`dataSet=${v}`)
      })

      eventEmitter.emit('log.open')
      this.setState({ processing: true })

      const xhr = new XMLHttpRequest()
      xhr.withCredentials = true
      xhr.open(
        'GET',
        `${apiConfig.server}/api/dataValueSets?${params.join('&')}`,
        true
      )
      xhr.setRequestHeader('Content-Type', contentType)
      xhr.onreadystatechange = async () => {
        if (xhr.readyState === 4 && Math.floor(xhr.status / 100) === 2) {
          this.setState({ processing: false })
          // TODO await this.fetchLog(0)

          let filename = `data.${exportFormat}`
          if (compression !== 'none') {
            filename += `.${compression}`
          }

          const url = createBlob(xhr.responseText, contentType, compression)
          downloadBlob(url, filename)
        }
      }
      xhr.send()
    } catch (e) {
      console.log('Data Export error', e, '\n')
    }
  }
}
