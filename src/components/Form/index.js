import React from 'react'
import s from './styles.css'

export const TYPE_FILE = 'fieldType/FILE'
export const TYPE_DATE = 'fieldType/DATE'
export const TYPE_SELECT = 'fieldType/SELECT'
export const TYPE_ORG_UNIT = 'fieldType/ORG_UNIT'
export const TYPE_SELECT_DATA_SETS = 'fieldType/SELECT_DATA_SETS'

export const CTX_DEFAULT = 'ctx/DEFAULT'
export const CTX_MORE_OPTIONS = 'ctx/MORE_OPTIONS'

export class Form extends React.Component {
  render() {
    const { title, style } = this.props
    return (
      <form style={style} className={s.form} onSubmit={this.props.onSubmit}>
        <div className={s.title}>{title}</div>
        <div className={s.content}>{this.props.children}</div>
      </form>
    )
  }
}
