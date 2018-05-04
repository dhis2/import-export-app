import React from 'react'
import cx from 'classnames'
import { Button, FormLabel, FormControl } from 'material-ui'
import { OrgUnitTree } from '@dhis2/d2-ui-org-unit-tree'
import s from './styles.css'

import File from './File'
import Date from './Date'
import Radio from './Radio'
import Select from './Select'
import Schemas from './Schemas'
import MoreOptions from './MoreOptions'

export const TYPE_FILE = 'fieldType/FILE'
export const TYPE_DATE = 'fieldType/DATE'
export const TYPE_RADIO = 'fieldType/RADIO'
export const TYPE_SELECT = 'fieldType/SELECT'
export const TYPE_SCHEMAS = 'fieldType/SCHEMAS'
export const TYPE_ORG_UNIT = 'fieldType/ORG_UNIT'
export const TYPE_MORE_OPTIONS = 'fieldType/MORE_OPTIONS'
export const TYPE_SELECT_DATA_SETS = 'fieldType/SELECT_DATA_SETS'

export const CTX_DEFAULT = 'ctx/DEFAULT'
export const CTX_MORE_OPTIONS = 'ctx/MORE_OPTIONS'

export class Form extends React.Component {
  fields() {
    const { fields, fieldValues } = this.props
    const { _context: context } = fieldValues

    return fields.map(field => {
      if (field.context !== CTX_DEFAULT && field.context !== context) {
        return null
      }

      const { type, name, label, className } = field
      if (type === TYPE_RADIO) {
        const { selected, values } = fieldValues[name]
        return (
          <Radio
            key={`radio-${name}`}
            name={name}
            label={label}
            values={values}
            selected={selected}
            className={className}
            onChange={this.props.onChange}
          />
        )
      } else if (type === TYPE_SELECT) {
        const { selected, values } = fieldValues[name]
        return (
          <Select
            key={`select-${name}`}
            name={name}
            label={label}
            values={values}
            selected={selected}
            onChange={this.props.onChange}
          />
        )
      } else if (type === TYPE_FILE) {
        return (
          <File
            key={`radio-${name}`}
            name={name}
            label={label}
            className={className}
            onChange={this.props.onChange}
          />
        )
      } else if (type === TYPE_DATE) {
        const value = fieldValues[name]
        const props = {}
        if (name === 'endDate') {
          props['minDate'] = fieldValues['startDate']
        }

        return (
          <Date
            {...props}
            key={`radio-${name}`}
            name={name}
            label={label}
            value={value}
            className={className}
            onChange={this.props.onChange}
          />
        )
      } else if (type === TYPE_MORE_OPTIONS) {
        return (
          <MoreOptions
            key="moreOptions"
            enabled={context === CTX_MORE_OPTIONS}
            onClick={this.props.changeContext}
          />
        )
      } else if (type === TYPE_SCHEMAS) {
        return (
          <Schemas
            key={`schemas-${name}`}
            name={name}
            label={label}
            onChange={this.props.onChange}
          />
        )
      } else if (type === TYPE_ORG_UNIT) {
        const { selected, value } = fieldValues[name]
        if (value === null) {
          return
        }

        return (
          <FormControl
            key={`orgUnitTree-${name}`}
            classes={{ root: s.formControl }}
          >
            <FormLabel classes={{ root: s.formLabel }}>{label}</FormLabel>
            <OrgUnitTree root={value} onSelectClick={this.props.onChange} />
          </FormControl>
        )
      }

      return null
    })
  }

  render() {
    const { title, className, style } = this.props
    const { onSubmit, submitLabel } = this.props

    return (
      <form
        style={style}
        className={cx(className, s.form)}
        onSubmit={this.props.onSubmit}
      >
        <div className={s.title}>{title}</div>

        <div className={s.fields}>{this.fields()}</div>

        <div className={s.buttons}>
          {onSubmit && (
            <Button color="primary" variant="raised" onClick={onSubmit}>
              {submitLabel}
            </Button>
          )}
        </div>
      </form>
    )
  }
}
