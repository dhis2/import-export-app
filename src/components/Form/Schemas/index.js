import React from 'react'
import { api } from 'services'
import i18n from '@dhis2/d2-i18n'
import { Loading } from 'components'
import { Checkbox, RaisedButton } from 'material-ui'
import { FormGroup, FormControl, FormLabel } from '../material-ui'

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

function groupLabelLowerCase(name, schemas) {
    const validate = n => name === n.toLowerCase()
    for (let i = 0; i < schemas.length; i += 1) {
        if (validate(schemas[i]['name'])) {
            return [true, schemas[i]['displayName']]
        }
    }

    return [false, null]
}

function groupLabelCamelCase(name, schemas) {
    const validate = n => n.includes(name) && n.indexOf(name) === 0
    for (let i = 0; i < schemas.length; i += 1) {
        const schemaName = schemas[i]['name'].toLowerCase()
        if (validate(schemaName)) {
            return [true, breakOnCamelCase(schemas[i]['name'], name)]
        }
    }

    return [false, null]
}

function groupLabel(name, schemas) {
    const nameLC = name.toLowerCase()
    if (nameLC === 'oauth2' || nameLC === 'other') {
        return name
    }

    const [isLower, displayName] = groupLabelLowerCase(nameLC, schemas)
    if (isLower) {
        return displayName
    }

    const [isCamelCase, ccName] = groupLabelCamelCase(nameLC, schemas)
    if (isCamelCase) {
        return ccName
    }

    return name[0].toUpperCase() + name.substr(1)
}

const styles = {
    iconStyle: {
        marginRight: 0,
    },
}

function Group({ label, schemas, checked, onClick }) {
    return (
        <div className={s.group}>
            <FormLabel className={s.formLabel}>{label}</FormLabel>
            <FormGroup className={s.schema}>
                {schemas.map(s => (
                    <Checkbox
                        {...styles}
                        key={`chk-${s.collectionName}`}
                        value={s.name}
                        label={s.displayName}
                        checked={checked.includes(s.collectionName)}
                        onCheck={(evt, status) =>
                            onClick(s.collectionName, status)
                        }
                    />
                ))}
            </FormGroup>
        </div>
    )
}

function Controls({ onSelectAll, onSelectNone }) {
    return (
        <div className={s.controls}>
            <RaisedButton label={i18n.t('Select All')} onClick={onSelectAll} />
            <RaisedButton
                label={i18n.t('Select None')}
                onClick={onSelectNone}
            />
        </div>
    )
}

export default class Schemas extends React.Component {
    state = {
        loaded: false,
        checked: [],
        schemas: [],
    }

    async componentDidMount() {
        this.fetch()
    }

    onClick = (collectionName, status) => {
        const { checked } = this.state

        let updated
        if (status) {
            updated = checked.slice(0)
            updated.push(collectionName)
        } else {
            updated = checked.filter(k => k !== collectionName)
        }

        this.setState({ checked: updated }, () =>
            this.props.onChange(this.props.name, updated)
        )
    }

    getSchemas(schemas) {
        return schemas
            .filter(i => i.metadata)
            .map(i => ({
                name: i.name,
                klass: i.klass,
                displayName: i.displayName,
                collectionName: i.collectionName,
                group: groupName(i.klass),
            }))
            .sort((a, b) => a.displayName.localeCompare(b.displayName))
    }

    async fetch() {
        try {
            const { data } = await api.get('schemas.json')
            this.setState(
                {
                    loaded: true,
                    schemas: this.getSchemas(data.schemas),
                    checked: data.schemas.map(item => item.collectionName),
                },
                () => {
                    this.props.onChange(this.props.name, this.state.checked)
                }
            )
        } catch (e) {
            console.log('fetch Schemas failed')
            console.log(e)
        }
    }

    onSelectNone = () => {
        this.setState({ checked: [] }, () =>
            this.props.onChange(this.props.name, [])
        )
    }

    onSelectAll = () => {
        const { schemas } = this.state
        this.setState(
            {
                checked: schemas.map(item => item.collectionName),
            },
            () => this.props.onChange(this.props.name, this.state.checked)
        )
    }

    viewSchemas() {
        const groups = schemaGroups(this.state.schemas)
        const list = Object.keys(groups).sort((a, b) => a.localeCompare(b))

        return (
            <FormControl className={s.formControl}>
                {list.map(k => (
                    <Group
                        key={`group-${k}`}
                        label={groupLabel(k, groups[k])}
                        schemas={groups[k]}
                        checked={this.state.checked}
                        onClick={this.onClick}
                    />
                ))}
            </FormControl>
        )
    }

    render() {
        if (!this.state.loaded) {
            return <Loading />
        }

        if (this.state.schemas.length === 0) {
            return null
        }

        return (
            <div className={s.container}>
                <Controls
                    onSelectAll={this.onSelectAll}
                    onSelectNone={this.onSelectNone}
                />
                {this.viewSchemas()}
            </div>
        )
    }
}
