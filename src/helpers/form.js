import {
  TYPE_FILE,
  TYPE_DATE,
  TYPE_RADIO,
  TYPE_SELECT,
  TYPE_SCHEMAS,
  TYPE_ORG_UNIT,
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

    if (!list.includes(path)) {
      list.push(path)
      api.post('../../dhis-web-commons/oust/addorgunit.action', { id })
    } else {
      list = list.filter(p => p !== path)
      api.post('../../dhis-web-commons/oust/removeorgunit.action', { id })
    }

    state[name]['selected'] = list
  }

  return state
}

export function getFieldValue(field) {
  return field.selected
}
