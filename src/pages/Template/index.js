import React from 'react'
import PropTypes from 'prop-types'
import HeaderBar from '@dhis2/d2-ui-header-bar'
import { SidePanel } from 'components'
import s from './styles.css'

export default class Template extends React.Component {
  static contextTypes = {
    d2: PropTypes.object
  }

  render() {
    return (
      <div className={s.container}>
        <HeaderBar d2={this.context.d2} />
        <SidePanel />
        <div className={s.content}>{this.props.children}</div>
      </div>
    )
  }
}
