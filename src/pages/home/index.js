import React from 'react'
import { withRouter } from 'react-router-dom'
import s from './styles.css'

import * as importPages from 'pages/import'
import * as exportPages from 'pages/export'

let list = []
function addToList(key, pages) {
  const p = pages[key]
  list.push({
    path: p.path,
    order: p.order,
    title: p.title,
    description: p.description,
  })
}

Object.keys(importPages).forEach(k => addToList(k, importPages))
Object.keys(exportPages).forEach(k => addToList(k, exportPages))

list = list.sort((a, b) => a.order > b.order)

const Item = ({ path, title, description, onClick }) => (
  <div className={s.item} onClick={() => onClick(path)}>
    <div className={s.title}>{title}</div>
    <div className={s.description}>{description}</div>
  </div>
)

@withRouter
export class Home extends React.Component {
  static path = '/'

  onClick = path => this.props.history.push(path)

  render() {
    return (
      <div className={s.container}>
        {list.map((item, index) => (
          <Item key={`page-item-${index}`} {...item} onClick={this.onClick} />
        ))}
      </div>
    )
  }
}
