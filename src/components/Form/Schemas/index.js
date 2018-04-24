import React from 'react'
import { api } from 'services'
import s from './styles.css'

function groupName(klass) {
  let group = klass.split('.')
  group.pop()

  if (!klass.includes('.dhis')) {
    group.pop()
  }

  return group[group.length - 1]
}

function schemaGroups(schemas) {
  const groups = {}

  schemas.forEach(s => {
    if (!groups[s.group]) {
      groups[s.group] = []
    }

    groups[s.group].push(s)
  })

  return groups
}

function groupLabel(name, schemas) {
  const nameLC = name.toLowerCase()
  for (let i = 0; i < schemas.length; i += 1) {
    if (nameLC === schemas[i]['name'].toLowerCase()) {
      return schemas[i]['displayName']
    }
  }

  for (let i = 0; i < schemas.length; i += 1) {
    const schemaName = schemas[i]['name'].toLowerCase()
    if (schemaName.includes(nameLC) && schemaName.indexOf(nameLC) === 0) {
      let temp = schemas[i]['name']
        .substr(0, name.length)
        .replace(/([A-Z]+)/g, ' $1')
      return temp[0].toUpperCase() + temp.substr(1)
    }
  }

  return name[0].toUpperCase() + name.substr(1)
}

export default class Schemas extends React.Component {
  state = {
    schemas: []
  }

  async componentDidMount() {
    this.fetch()
  }

  async fetch() {
    try {
      const {
        data: { schemas }
      } = await api.get('schemas.json')
      this.setState({
        schemas: schemas
          .map(item => ({
            name: item.name,
            klass: item.klass,
            displayName: item.displayName,
            group: groupName(item.klass)
          }))
          .sort((a, b) => a.displayName.localeCompare(b.displayName))
      })
    } catch (e) {
      console.log('fetch Schemas failed')
      console.log(e)
    }
  }

  render() {
    const { schemas } = this.state
    if (schemas.length === 0) {
      return null
    }

    const groups = schemaGroups(schemas)

    return <div className={s.container}>schemas</div>
  }
}
