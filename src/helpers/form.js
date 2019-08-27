import {
    TYPE_FILE,
    TYPE_DATE,
    TYPE_RADIO,
    TYPE_SELECT,
    TYPE_SCHEMAS,
    TYPE_ORG_UNIT,
    TYPE_ORG_UNIT_SINGLE_SELECT,
    TYPE_DATASET_PICKER,
} from '../components/Form'
import { isValueNil } from '../helpers'

const identity = value => value

export function getField(name, fields) {
    return fields.filter(f => f.name === name)[0]
}

// eslint-disable-next-line max-params
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
    const params = list.map(parameterName =>
        state[parameterName]
            ? `${parameterName}=${encodeURIComponent(state[parameterName])}`
            : null
    )

    append.forEach(parameter => params.push(parameter))

    return params.filter(identity).join('&')
}

export function getRequiredFields(fields) {
    return fields.filter(f => !!f.required)
}

export function hasRequiredFieldsWithoutValue(fields, fieldValues) {
    const requiredFields = getRequiredFields(fields)

    return requiredFields.length === 0
        ? false
        : requiredFields.findIndex(
              f => f.name && isValueNil(getFieldValue(fieldValues[f.name]))
          ) > -1
}
