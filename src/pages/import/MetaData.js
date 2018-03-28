import React from 'react'
import { Select, MenuItem, FormControl, InputLabel } from 'material-ui'
import i18n from 'd2-i18n'
import { Form } from 'components'

const attrs = {
  formControl: {
    fullWidth: true,
    style: {
      marginBottom: 20,
    },
  },
}

export class MetaDataImport extends React.Component {
  static path = '/import/metadata'

  static order = 1
  static title = i18n.t('Metadata Import')
  static description = i18n.t(
    'Import metadata like data elements and organisation units using the standard DHIS 2 exchange format called DXF 2.',
  )

  onSubmit = () => {
    console.log('onSubmit')
  }

  onChange = () => {}

  render() {
    const style = {
      width: 500,
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
