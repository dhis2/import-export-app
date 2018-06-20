import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { api, eventEmitter } from 'services'
import { createBlob, downloadBlob } from 'helpers'
import { FormBase } from 'components/FormBase'
import { CTX_DEFAULT, TYPE_RADIO, TYPE_SCHEMAS } from 'components/Form'
import { MetadataExportIcon } from 'components/Icon'

export class MetaDataExport extends FormBase {
  static path = '/export/metadata'

  static order = 5
  static title = i18n.t('Metadata Export')
  static menuIcon = <MetadataExportIcon />
  icon = <MetadataExportIcon />

  formWidth = '85%'
  formTitle = i18n.t('Meta Data Export')
  submitLabel = i18n.t('Export')

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_SCHEMAS,
      name: 'schemas',
      label: i18n.t('Schemas')
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
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'sharing',
      label: i18n.t('Sharing')
    }
  ]

  state = {
    processing: false,
    schemas: {
      selected: []
    },
    format: {
      selected: 'json',
      values: [
        {
          value: 'json',
          label: i18n.t('JSON')
        },
        {
          value: 'xml',
          label: i18n.t('XML')
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
          value: 'gz',
          label: i18n.t('Gzip')
        },
        {
          value: 'none',
          label: i18n.t('Uncompressed')
        }
      ]
    },
    sharing: {
      selected: 'true',
      values: [
        {
          value: 'true',
          label: i18n.t('With sharing')
        },
        {
          value: 'false',
          label: i18n.t('Without sharing')
        }
      ]
    }
  }

  onSubmit = async () => {
    try {
      const { schemas, format, compression, sharing } = this.getFormState()

      const params = []
      params.push('assumeTrue=false')
      params.push(`format=${format}`)
      params.push(
        schemas
          .map(name => name)
          .sort()
          .map(name => `${name}=true`)
          .join('&')
      )

      if (sharing !== 'true') {
        params.push('fields=:owner,!user,!publicAccess,!userGroupAccesses')
      }

      eventEmitter.emit('log', {
        id: new Date().getTime(),
        d: new Date(),
        subject: 'MetaData Export',
        text: `Schemas: ${schemas.map(name => name).join(', ')}
Format: ${format}
Compression: ${compression}
Sharing: ${sharing}`
      })
      eventEmitter.emit('log.open')

      let endpoint = `metadata.${format}`
      if (compression !== 'none') {
        endpoint += `.${compression}`
        window.location = api.url(`${endpoint}?${params.join('&')}`)
        return
      }

      this.setState({ processing: true }, async () => {
        const { data } = await api.get(`${endpoint}?${params.join('&')}`)
        let contents = data
        if (format === 'json') {
          contents = JSON.stringify(data)
        }

        downloadBlob(createBlob(contents, format, compression), endpoint)
        this.setState({ processing: false })
      })
    } catch (e) {
      console.log('MetaData Export error', e, '\n')
    }
  }
}
