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

  schemas.map(s => {
    if (!groups[s.group]) {
      groups[s.group] = []
    }

    groups[s.group].push(s)
  })

  return groups
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
    const groups = schemaGroups(schemas)

    return <div className={s.container}>schemas</div>
  }
}
