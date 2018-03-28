import React from 'react'
import s from './styles.css'

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
