import React from 'react'
import { Select, MenuItem, FormControl, InputLabel } from 'material-ui'
import i18n from 'd2-i18n'
import {
  Form,
  CTX_DEFAULT,
  CTX_MORE_OPTIONS,
  TYPE_FILE,
  TYPE_SELECT
} from 'components'

const attrs = {
  formControl: {
    fullWidth: true,
    style: {
      marginBottom: 20
    }
  }
}

export class MetaDataImport extends React.Component {
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
      type: TYPE_SELECT,
      name: 'importFormat',
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
      name: 'strategy',
      label: i18n.t('Strategy')
    },

    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_SELECT,
      name: 'atomicMode',
      label: i18n.t('Reference mode')
    }
  ]

  state = {
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

  onChange = () => {}

  render() {
    const style = {
      width: 500
    }

    return (
      <Form
        style={style}
        onSubmit={this.onSubmit}
        title={i18n.t('Metadata Import')}
      >
        <FormControl {...attrs.formControl}>
          <InputLabel>{i18n.t('Format')}</InputLabel>
          <Select value="json" onChange={this.onChange}>
            <MenuItem value="json">{i18n.t('JSON')}</MenuItem>
            <MenuItem value="xml">{i18n.t('XML')}</MenuItem>
            <MenuItem value="csv">{i18n.t('CSV')}</MenuItem>
          </Select>
        </FormControl>

        <FormControl {...attrs.formControl}>
          <InputLabel>{i18n.t('Dry run')}</InputLabel>
          <Select value="false" onChange={this.onChange}>
            <MenuItem value="false">{i18n.t('No')}</MenuItem>
            <MenuItem value="true">{i18n.t('Yes')}</MenuItem>
          </Select>
        </FormControl>

        <FormControl {...attrs.formControl}>
          <InputLabel>{i18n.t('Strategy')}</InputLabel>
          <Select value="NEW_AND_UPDATES" onChange={this.onChange}>
            <MenuItem value="NEW_AND_UPDATES">
              {i18n.t('New and Updates')}
            </MenuItem>
            <MenuItem value="NEW">{i18n.t('New')}</MenuItem>
            <MenuItem value="UPDATES">{i18n.t('Updates only')}</MenuItem>
          </Select>
        </FormControl>

        <FormControl {...attrs.formControl}>
          <InputLabel>{i18n.t('Reference mode')}</InputLabel>
          <Select value="NONE" onChange={this.onChange}>
            <MenuItem value="NONE">
              {i18n.t('Allow invalid references')}
            </MenuItem>
            <MenuItem value="ALL">{i18n.t('Deny invalid references')}</MenuItem>
          </Select>
        </FormControl>
      </Form>
    )
  }
}
