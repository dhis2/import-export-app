import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
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

  onSubmit = () => {
    try {
      const { upload, dryRun } = this.getFormState()

      const formData = new FormData()
      formData.set('upload', upload)
      formData.set('dryRun', dryRun)

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
