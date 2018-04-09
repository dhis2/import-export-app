import React from 'react'
import s from './styles.css'

import Radio from './Radio'

export const TYPE_FILE = 'fieldType/FILE'
export const TYPE_DATE = 'fieldType/DATE'
export const TYPE_RADIO = 'fieldType/RADIO'
export const TYPE_SELECT = 'fieldType/SELECT'
export const TYPE_ORG_UNIT = 'fieldType/ORG_UNIT'
export const TYPE_SELECT_DATA_SETS = 'fieldType/SELECT_DATA_SETS'

export const CTX_DEFAULT = 'ctx/DEFAULT'
export const CTX_MORE_OPTIONS = 'ctx/MORE_OPTIONS'

export class Form extends React.Component {
  fields() {
    const { fields, fieldValues } = this.props
    const { _context: context } = fieldValues

    return fields.map(field => {
      if (field.context !== context) {
        return null
      }

      const { type, name, label } = field
      if (type === TYPE_RADIO) {
        const { selected, values } = fieldValues[name]
        return (
          <Radio
            key={`radio-${name}`}
            name={name}
            label={label}
            values={values}
            selected={selected}
            onChange={this.props.onChange}
          />
        )
      }

      return null
    })
  }

  render() {
    const { title, style } = this.props
    return (
      <form style={style} className={s.form} onSubmit={this.props.onSubmit}>
        <div className={s.title}>{title}</div>
        <div className={s.fields}>{this.fields()}</div>
      </form>
    )
  }
}
