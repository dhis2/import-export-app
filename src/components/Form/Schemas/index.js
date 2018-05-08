import React from 'react'
import { api } from 'services'
import { Checkbox } from 'material-ui'
import { Loading } from 'components'
import { FormGroup, FormControl, FormLabel } from 'components/material-ui'

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

  // check groups with 1 item and merge inside Other
  const groupsWith1Item = []
  const OTHER_GROUP_NAME = 'other'
  let otherGroup = []

  Object.entries(groups).forEach(([k, v]) => {
    if (v.length === 1) {
      groupsWith1Item.push(k)
      v[0]['group'] = OTHER_GROUP_NAME
      otherGroup = otherGroup.concat(v)
    }
  })
  groups[OTHER_GROUP_NAME] = otherGroup

  groupsWith1Item.forEach(k => {
    delete groups[k]
  })

  // sort group items by length desc
  // Object.entries(groups).forEach(([k, v]) => {
  //   groups[k] = groups[k].sort(
  //     (a, b) => a.displayName.length - b.displayName.length
  //   )
  // })

  return groups
}

function breakOnCamelCase(schemaName, name) {
  let temp = schemaName.substr(0, name.length).replace(/([A-Z]+)/g, ' $1')
  return temp[0].toUpperCase() + temp.substr(1)
}

function groupLabel(name, schemas) {
  const nameLC = name.toLowerCase()
  if (nameLC === 'oauth2' || nameLC === 'other') {
    return name
  }

  for (let i = 0; i < schemas.length; i += 1) {
    if (nameLC === schemas[i]['name'].toLowerCase()) {
      return schemas[i]['displayName']
    }
  }

  for (let i = 0; i < schemas.length; i += 1) {
    const schemaName = schemas[i]['name'].toLowerCase()
    if (schemaName.includes(nameLC) && schemaName.indexOf(nameLC) === 0) {
      return breakOnCamelCase(schemas[i]['name'], name)
    }
  }

  return name[0].toUpperCase() + name.substr(1)
}

const styles = {
  iconStyle: {
    marginRight: 0
  }
}

function Group({ label, schemas, checked, onClick }) {
  return (
    <div className={s.group}>
      <FormLabel className={s.formLabel}>{label}</FormLabel>
      <FormGroup className={s.schema}>
        {schemas.map(s => (
          <Checkbox
            {...styles}
            key={`chk-${s.name}`}
            value={s.name}
            label={s.displayName}
            checked={checked[s.klass]}
            onChange={() => onClick(s.klass, !checked[s.klass])}
          />
        ))}
      </FormGroup>
    </div>
  )
}

export default class Schemas extends React.Component {
  state = {
    loaded: false,
    checked: {},
    schemas: []
  }

  async componentDidMount() {
    this.fetch()
  }

  onClick = (klass, status) => {
    const { checked } = this.state
    checked[klass] = status
    this.setState(
      {
        checked: {
          ...checked
        }
      },
      () => this.props.onChange(this.props.name, checked)
    )
  }

  async fetch() {
    try {
      const {
        data: { schemas }
      } = await api.get('schemas.json')

      const checked = {}
      schemas.map(s => (checked[s.klass] = true))

      this.setState({
        checked,
        loaded: true,
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
    const { loaded, checked, schemas } = this.state
    if (!loaded) {
      return <Loading />
    }

    if (schemas.length === 0) {
      return null
    }

    const groups = schemaGroups(schemas)
    const list = Object.keys(groups).sort((a, b) => a.localeCompare(b))

    return (
      <FormControl className={s.formControl}>
        {list.map(k => (
          <Group
            key={`group-${k}`}
            label={groupLabel(k, groups[k])}
            schemas={groups[k]}
            checked={checked}
            onClick={this.onClick}
          />
        ))}
      </FormControl>
    )
  }
}
