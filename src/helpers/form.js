import { TYPE_RADIO, TYPE_SELECT, TYPE_DATE } from 'components/Form'

export function getField(name, fields) {
  return fields.filter(f => f.name === name)[0]
}

export function getFieldType(name, fields) {
  return getField(name, fields).type
}

export function getFieldState(name, value, fields, state) {
  const f = getField(name, fields)

  if (f.type === TYPE_RADIO || f.type === TYPE_SELECT) {
    state[name]['selected'] = value
  } else if (f.type === TYPE_DATE) {
    state[name] = value
  }

  return state
}
