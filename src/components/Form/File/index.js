import React from 'react'
import { SvgIcon } from 'material-ui'
import { FormControl, FormLabel } from 'components/material-ui'
import s from './styles.css'
import i18n from '@dhis2/d2-i18n'

function FileUploadIcon() {
  return (
    <SvgIcon>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </SvgIcon>
  )
}

export default class FileField extends React.Component {
  onClick = () => {
    this.fileRef && this.fileRef.click()
  }

  onChange = evt => {
    console.log('onChange')
    console.log('evt', evt)
  }

  render() {
    const { label } = this.props

    return (
      <FormControl classes={{ root: s.formControl }} onClick={this.onClick}>
        <input
          type="file"
          onChange={this.onChange}
          ref={c => (this.fileRef = c)}
          className={s.hiddenFileInput}
        />
        <FileUploadIcon className={s.button} />
        <FormLabel classes={{ root: s.formLabel }}>
          {label || i18n.t('Choose a file to upload')}
        </FormLabel>
      </FormControl>
    )
  }
}
