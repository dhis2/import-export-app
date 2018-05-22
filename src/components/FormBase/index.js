import React from 'react'
import { getFieldState, getFieldValue } from 'helpers'
import { Form, Loading } from 'components'

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

  getFormState() {
    const values = {}
    this.fields.map(f => f.name).forEach(name => {
      if (name) {
        values[name] = getFieldValue(this.state[name])
      }
    })
    return values
  }

  render() {
    if (this.state.processing) {
      return <Loading />
    }

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
