import React from 'react'
import s from './styles.css'

export class Home extends React.Component {
  static path = '/'
  render() {
    return <div className={s.container}>home</div>
  }
}
