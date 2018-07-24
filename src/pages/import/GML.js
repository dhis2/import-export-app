import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import { CTX_DEFAULT, TYPE_FILE, TYPE_RADIO } from 'components/Form'
import { GMLIcon } from 'components/Icon'

export class GMLImport extends FormBase {
  static path = '/import/gml'

  static order = 4
  static title = i18n.t('GML Import')
  static menuIcon = <GMLIcon />
  icon = <GMLIcon />

  formWidth = 600
  formTitle = i18n.t('GML Import')
  formDescription = i18n.t(
    'Only import of GML data for existing organisation units is supported.'
  )
  submitLabel = i18n.t('Import')

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_FILE,
      name: 'upload',
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
    processing: false,

    upload: {
      selected: null
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
    }
  }

  onSubmit = async () => {
    try {
      const { upload, dryRun } = this.getFormState()

      const formData = new FormData()
      formData.set('upload', upload)
      formData.set('dryRun', dryRun)

      eventEmitter.emit('log', {
        id: new Date().getTime(),
        d: new Date(),
        subject: 'GML Import',
        text: `Dry run: ${dryRun}`
      })
      eventEmitter.emit('log.open')

      this.setState({ processing: true })

      window
        .fetch(`${apiConfig.server}/dhis-web-importexport/importGml.action`, {
          body: formData,
          cache: 'no-cache',
          credentials: 'include',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow'
        })
        .then(async () => {
          this.setState({ processing: false })
        })
    } catch (e) {
      console.log('GML Import error', e, '\n')
    }
  }
}
