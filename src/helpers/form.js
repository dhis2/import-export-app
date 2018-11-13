import {
    TYPE_FILE,
    TYPE_DATE,
    TYPE_RADIO,
    TYPE_SELECT,
    TYPE_SCHEMAS,
    TYPE_ORG_UNIT,
    TYPE_ORG_UNIT_SINGLE_SELECT,
    TYPE_DATASET_PICKER,
} from 'components/Form'

export function getField(name, fields) {
    return fields.filter(f => f.name === name)[0]
}

export function getFieldState(name, value, fields, state) {
    const f = getField(name, fields)

    if (
        [
            TYPE_FILE,
            TYPE_DATE,
            TYPE_RADIO,
            TYPE_SELECT,
            TYPE_SCHEMAS,
            TYPE_DATASET_PICKER,
        ].includes(f.type)
    ) {
        state[name]['selected'] = value
    } else if (f.type === TYPE_ORG_UNIT) {
        const { selected, value: path } = value

        const formData = new FormData()
        formData.set('id', path.substr(path.lastIndexOf('/') + 1))

        state[name]['selected'] = selected.slice(0)
    } else if (f.type === TYPE_ORG_UNIT_SINGLE_SELECT) {
        const { selected } = value
        state[name]['selected'] = selected.slice(0)
    }

    return state
}

export function getFieldValue(field) {
    return field.selected
}

export function getParamsFromFormState(state, list, append = []) {
    const params = list.forEach(k => `${k}=${state[k]}`)
    append.forEach(v => params.push(v))

    return params.join('&')
}
