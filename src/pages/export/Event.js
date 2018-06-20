import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { today } from 'helpers'
import { FormBase } from 'components/FormBase'
import {
  CTX_DEFAULT,
  TYPE_RADIO,
  TYPE_DATE,
  TYPE_SELECT,
  TYPE_ORG_UNIT_SINGLE_SELECT
} from 'components/Form'
import { api, eventEmitter } from 'services'
import { getInstance } from 'd2/lib/d2'
import moment from 'moment/moment'
import { EventIcon } from 'components/Icon'

export class EventExport extends FormBase {
  static path = '/export/event'

  static order = 8
  static title = i18n.t('Event Export')
  static menuIcon = <EventIcon />
  icon = <EventIcon />

  formWidth = 900
  formTitle = i18n.t('Event Export')
  submitLabel = i18n.t('Export')

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_ORG_UNIT_SINGLE_SELECT,
      name: 'orgUnit',
      label: i18n.t('Organisation unit')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'programs',
      label: i18n.t('Programs')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'programStages',
      label: i18n.t('Program Stages')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'idScheme',
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
    processing: false,
    orgUnit: {
      selected: [],
      value: null
    },
    programs: {
      selected: '',
      values: []
    },
    programStages: {
      selected: -1,
      values: [
        {
          value: -1,
          label: i18n.t('[ All program stages]')
        }
      ]
    },
    idScheme: {
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
    startDate: {
      selected: today()
    },
    endDate: {
      selected: today()
    },

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
      selected: '.json',
      values: [
        {
          value: '.json',
          label: i18n.t('JSON')
        },
        {
          value: '.xml',
          label: i18n.t('XML')
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
          value: 'none',
          label: 'Uncompressed'
        }
      ]
    }
  }

  async componentDidMount() {
    await this.fetchPrograms()
  }

  async fetchPrograms() {
    try {
      const objectType = 'programs'
      const { data } = await api.get(
        `${objectType}?fields=id,displayName&paging=false`
      )
      const values = data[objectType].map(({ id, displayName }) => ({
        value: id,
        label: displayName
      }))

      const selected = values[0]['value']
      this.setState(
        {
          programs: { values, selected }
        },
        () => {
          this.fetchProgramStages(selected)
        }
      )

      const d2 = await getInstance()
      const orgUnitTree = await d2.models.organisationUnits
        .list({
          level: 1,
          paging: false,
          fields: 'id,path,displayName,children::isNotEmpty'
        })
        .then(root => root.toArray()[0])

      this.setState({
        orgUnit: {
          selected: [],
          value: orgUnitTree
        }
      })
    } catch (e) {
      console.log('fetch Programs failed')
      console.log(e)
    }
  }

  async fetchProgramStages(id) {
    try {
      const {
        data: { programStages }
      } = await api.get(
        `programs/${id}.json?fields=id,displayName,programStages[id,displayName]`
      )
      const values = programStages.map(({ id, displayName }) => ({
        value: id,
        label: displayName
      }))

      values.unshift({
        value: -1,
        label: i18n.t('[ All program stages]')
      })
      const selected = values[0]['value']
      this.setState({
        programStages: { values, selected }
      })
    } catch (e) {
      console.log('fetch ProgramStages failed', id)
      console.log(e)
    }
  }

  onFormUpdate = (name, value) => {
    if (name === 'programs') {
      this.fetchProgramStages(value)
    }
  }

  onSubmit = () => {
    const {
      orgUnit,
      startDate,
      endDate,
      programs,
      programStages,
      idScheme,
      inclusion,
      format,
      compression
    } = this.getFormState()

    let attachment = `events${format}`
    if (compression !== 'none') {
      attachment += compression
    }

    const params = []
    params.push(`attachment=${attachment}`)
    params.push(`program=${programs}`)

    if (programStages !== -1) {
      params.push(`programStage=${programStages}`)
    }

    if (orgUnit.length > 0) {
      const path = orgUnit[0]
      const orgUnitId = path.substr(path.lastIndexOf('/') + 1)
      params.push(`orgUnit=${orgUnitId}`)
    }

    params.push('startDate=' + moment(startDate).format('YYYY-MM-DD'))
    params.push('endDate=' + moment(endDate).format('YYYY-MM-DD'))

    params.push(`ouMode=${inclusion.toUpperCase()}`)
    params.push('links=false')
    params.push('skipPaging=true')
    params.push('includeDeleted=false')
    params.push(`idScheme=${idScheme}`)
    params.push(`format=${format.substr(1)}`)

    eventEmitter.emit('log', {
      id: new Date().getTime(),
      d: new Date(),
      subject: 'Event Export',
      text: `Start Date: ${moment(startDate).format('YYYY-MM-DD')}
End Date: ${moment(endDate).format('YYYY-MM-DD')}
Org Unit: ${orgUnit.join(', ')}
Inclusion: ${inclusion.toUpperCase()}
Links: false
Skip paging: false
Include deleted: false
Id Scheme: ${idScheme}
Format: ${format.substr(1)}`
    })
    eventEmitter.emit('log.open')

    window.location = api.url('events') + '?' + params.join('&')
  }
}
