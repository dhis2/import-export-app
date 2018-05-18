import {
  TYPE_FILE,
  TYPE_DATE,
  TYPE_RADIO,
  TYPE_SELECT,
  TYPE_SCHEMAS,
  TYPE_ORG_UNIT,
  TYPE_ORG_UNIT_SINGLE_SELECT,
  TYPE_DATASET_PICKER
} from 'components/Form'
import { api } from 'services'

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
      TYPE_DATASET_PICKER
    ].includes(f.type)
  ) {
    state[name]['selected'] = value
  } else if (f.type === TYPE_ORG_UNIT) {
    let list = state[name]['selected']
    const { id, path } = value

    const formData = new FormData()
    formData.set('id', id)

    if (!list.includes(path)) {
      list.push(path)
      api.post('../../dhis-web-commons/oust/addorgunit.action', formData)
    } else {
      list = list.filter(p => p !== path)
      api.post('../../dhis-web-commons/oust/removeorgunit.action', formData)
    }

    state[name]['selected'] = list
  } else if (f.type === TYPE_ORG_UNIT_SINGLE_SELECT) {
    let list = state[name]['selected']
    console.log('id', value.id, 'path', value.path)
    state[name]['selected'] = list.includes(value.path) ? [] : [value.path]
  }

  return state
}

export function getFieldValue(field) {
  return field.selected
}
