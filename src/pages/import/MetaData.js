import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import {
  FormBase,
  CTX_DEFAULT,
  TYPE_FILE,
  TYPE_RADIO,
  TYPE_SELECT,
  CTX_MORE_OPTIONS,
  TYPE_MORE_OPTIONS
} from 'components/index'

export class MetaDataImport extends FormBase {
  static path = '/import/metadata'

  static order = 1
  static title = i18n.t('Metadata Import')
  static description = i18n.t(
    'Import metadata like data elements and organisation units using the standard DHIS 2 exchange format called DXF 2.'
  )

  formWidth = 600
  formTitle = i18n.t('Metadata Import')
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
      name: 'importFormat',
      label: i18n.t('Format')
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
      context: CTX_DEFAULT,
      type: TYPE_MORE_OPTIONS
    },

    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'atomicMode',
      label: i18n.t('Reference mode')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_SELECT,
      name: 'classKey',
      label: i18n.t('Object type')
    }
  ]

  state = {
    _context: CTX_DEFAULT,
    processing: false,

    upload: {
      selected: null
    },

    importFormat: {
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

    classKey: {
      selected: 'ORGANISATION_UNIT_GROUP_MEMBERSHIP',
      values: [
        {
          label: i18n.t('Organisation unit group membership'),
          value: 'ORGANISATION_UNIT_GROUP_MEMBERSHIP'
        },
        {
          label: i18n.t('Data element group membership'),
          value: 'DATA_ELEMENT_GROUP_MEMBERSHIP'
        },
        {
          label: i18n.t('Indicator group membership'),
          value: 'INDICATOR_GROUP_MEMBERSHIP'
        },
        {
          label: i18n.t('Data element'),
          value: 'DATA_ELEMENT'
        },
        {
          label: i18n.t('Data element group'),
          value: 'DATA_ELEMENT_GROUP'
        },
        {
          label: i18n.t('Category option'),
          value: 'CATEGORY_OPTION'
        },
        {
          label: i18n.t('Category option group'),
          value: 'CATEGORY_OPTION_GROUP'
        },
        {
          label: i18n.t('Organisation unit'),
          value: 'ORGANISATION_UNIT'
        },
        {
          label: i18n.t('Organisation unit group'),
          value: 'ORGANISATION_UNIT_GROUP'
        },
        {
          label: i18n.t('Validation rule'),
          value: 'VALIDATION_RULE'
        },
        {
          label: i18n.t('Option set'),
          value: 'OPTION_SET'
        },
        {
          label: i18n.t('Translation'),
          value: 'TRANSLATION'
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
    try {
      const {
        upload,
        importFormat,
        classKey,
        dryRun,
        strategy,
        atomicMode
      } = this.getFormState()

      const formData = new FormData()
      formData.set('upload', upload)
      formData.set('importFormat', importFormat)
      formData.set('classKey', classKey)
      formData.set('dryRun', dryRun)
      formData.set('strategy', strategy)
      formData.set('atomicMode', atomicMode)

      this.setState({ processing: true })
      window
        .fetch(
          `${apiConfig.server}/dhis-web-importexport/importMetaData.action`,
          {
            body: formData,
            cache: 'no-cache',
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            redirect: 'follow'
          }
        )
        .then(async () => {
          this.setState({ processing: false })
        })
    } catch (e) {
      console.log('MetaData Import error', e, '\n')
    }
  }
}
