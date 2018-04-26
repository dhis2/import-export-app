import React from 'react'
import { getFieldState } from 'helpers'
import { Form } from 'components'

import s from './styles.css'

export class FormBase extends React.Component {
  onChange = (name, value) =>
    this.setState(
      {
        ...getFieldState(name, value, this.fields, this.state)
      },
      () => {
        this.onFormUpdate && this.onFormUpdate(name, value)
      }
    )

  changeContext = _context => this.setState({ _context })

  render() {
    return (
      <Form
        className={s.form}
        style={{
          width: this.formWidth
        }}
        fields={this.fields}
        fieldValues={this.state}
        title={this.formTitle}
        onChange={this.onChange}
        changeContext={this.changeContext}
        submitLabel={this.submitLabel}
        onSubmit={this.onSubmit}
      />
    )
  }
}
