import React from 'react'
import { SidePanel } from 'components/index'
import s from './styles.css'

export default class Template extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <SidePanel />
        <div className={s.content}>{this.props.children}</div>
      </div>
    )
  }
}
