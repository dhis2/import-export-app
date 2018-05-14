import {
  TYPE_RADIO,
  TYPE_SELECT,
  TYPE_DATE,
  TYPE_ORG_UNIT,
  TYPE_SCHEMAS,
  TYPE_DATASET_PICKER
} from 'components/Form'

export function getField(name, fields) {
  return fields.filter(f => f.name === name)[0]
}

export function getFieldState(name, value, fields, state) {
  const f = getField(name, fields)

  if (
    [
      TYPE_RADIO,
      TYPE_SELECT,
      TYPE_DATE,
      TYPE_SCHEMAS,
      TYPE_DATASET_PICKER
    ].includes(f.type)
  ) {
    state[name]['selected'] = value
  } else if (f.type === TYPE_ORG_UNIT) {
    let list = state[name]['selected']
    if (!list.includes(value)) {
      list.push(value)
    } else {
      list = list.filter(path => path !== value)
    }

    state[name]['selected'] = list
  }

  return state
}

export function getFieldValue(field) {
  return field.selected
}
