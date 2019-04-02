import React from 'react'
import { api } from 'services'
import i18n from '@dhis2/d2-i18n'
import { Loading } from 'components'
import { Checkbox, RaisedButton } from 'material-ui'
import { FormGroup, FormControl, FormLabel } from '../material-ui'
import { EXCLUDE_SCHEMAS } from 'helpers'
import { setSchemas } from 'reducers/'
import { connect } from 'react-redux'
import s from './styles.css'
import {
    getSortedSchemaGroups,
    getSortedSchemas,
    getSchemas,
} from 'reducers/schemas/selectors'
import { colors } from 'material-ui/styles'
import { EditorFormatAlignJustify } from 'material-ui/svg-icons'

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
                        checked={checked[s.collectionName]}
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
@connect(
    state => ({
        schemaGroups: getSortedSchemaGroups(state),
        schemas: getSchemas(state),
        loaded: state.schemas.loaded,
    }),
    { setSchemas }
)
export default class Schemas extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
            checked:
                props.schemas.length > 0 ? this.setChecked(null, true) : {},
        }
    }

    async componentDidMount() {
        if (this.props.schemas.length < 1) {
            this.fetch()
        }
    }

    /**
     * Helper to handle setting checked-State. Note does not actually call setState,
     * returns an object of the checked state.
     * @param {f} collectionName if falsy, set all schemas to value - else, only update collectionName.
     * @param {*} value value to set (true or false)
     * @param {*} schemas schemas to use if collectionName is falsy
     */
    setChecked(collectionName, value, schemas = this.props.schemas) {
        if (collectionName) {
            return { ...this.state.checked, [collectionName]: value }
        } else {
            return schemas.reduce(
                (accum, { collectionName: colName }) => ({
                    ...accum,
                    [colName]: value,
                }),
                {}
            )
        }
    }

    onClick = (collectionName, isChecked) => {
        let updated = this.setChecked(collectionName, isChecked)

        this.setState({ checked: updated }, () =>
            this.props.onChange(this.props.name, updated)
        )
    }

    getSchemas(schemas) {
        return schemas
            .filter(i => i.metadata && !EXCLUDE_SCHEMAS.has(i.collectionName))
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
            const schemas = this.getSchemas(data.schemas)
            this.props.setSchemas(schemas)
            this.setState(
                {
                    loaded: true,
                    schemas,
                    checked: this.setChecked(null, true, schemas),
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
        const { schemas } = this.props
        this.setState(
            {
                checked: this.setChecked(null, false),
            },
            () => this.props.onChange(this.props.name, this.state.checked)
        )
    }

    onSelectAll = () => {
        this.setState(
            {
                checked: this.setChecked(null, true),
            },
            () => this.props.onChange(this.props.name, this.state.checked)
        )
    }

    viewSchemas() {
        const groups = this.props.schemaGroups
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
        if (!this.props.loaded) {
            return <Loading />
        }
        if (this.props.schemas.length === 0) {
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
