import React from 'react'
import { getFieldState } from 'helpers'

export class FormBase extends React.Component {
  onChange = (name, value) =>
    this.setState({
      ...getFieldState(name, value, this.fields, this.state)
    })

  changeContext = _context => this.setState({ _context })
}
