import React from 'react'
import cx from 'classnames'
import { RaisedButton } from 'material-ui'
import { FormLabel, FormControl } from 'components/material-ui'
import s from './styles.css'

import File from './File'
import Date from './Date'
import Radio from './Radio'
import Select from './Select'
import Schemas from './Schemas'
import OrgUnits from './OrgUnits'
import MoreOptions from './MoreOptions'
import DataSetPicker from './DataSetPicker'

export const TYPE_FILE = 'fieldType/FILE'
export const TYPE_DATE = 'fieldType/DATE'
export const TYPE_RADIO = 'fieldType/RADIO'
export const TYPE_SELECT = 'fieldType/SELECT'
export const TYPE_SCHEMAS = 'fieldType/SCHEMAS'
export const TYPE_ORG_UNIT = 'fieldType/ORG_UNIT'
export const TYPE_ORG_UNIT_SINGLE_SELECT = 'fieldType/ORG_UNIT_SINGLE_SELECT'
export const TYPE_MORE_OPTIONS = 'fieldType/MORE_OPTIONS'
export const TYPE_DATASET_PICKER = 'fieldType/DATASET_PICKER'

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
        const { selected } = fieldValues[name]
        return (
          <File
            key={`file-${name}`}
            name={name}
            label={label}
            selected={selected}
            className={className}
            onChange={this.props.onChange}
          />
        )
      } else if (type === TYPE_DATE) {
        const value = fieldValues[name]['selected']
        const props = {}
        if (name === 'endDate') {
          props['minDate'] = fieldValues['startDate']['selected']
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
          return null
        }

        return (
          <FormControl key={`orgUnitTree-${name}`} className={s.formControl}>
            <FormLabel className={s.formLabel}>{label}</FormLabel>
            <OrgUnits
              root={value}
              selected={selected}
              onChange={(evt, orgUnit) => {
                this.props.onChange(name, orgUnit)
              }}
            />
          </FormControl>
        )
      } else if (type === TYPE_ORG_UNIT_SINGLE_SELECT) {
        const { selected, value } = fieldValues[name]
        if (value === null) {
          return null
        }

        return (
          <FormControl key={`orgUnitTree-${name}`} className={s.formControl}>
            <FormLabel className={s.formLabel}>{label}</FormLabel>
            <OrgUnits
              root={value}
              selected={selected}
              hideCheckboxes={true}
              onChange={(evt, orgUnit) => {
                this.props.onChange(name, orgUnit)
              }}
            />
          </FormControl>
        )
      } else if (type === TYPE_DATASET_PICKER) {
        const { selected, value } = fieldValues[name]
        if (value === null) {
          return null
        }

        return (
          <FormControl key={`dataSetPicker-${name}`}>
            <DataSetPicker
              name={name}
              value={value}
              selected={selected}
              onChange={this.props.onChange}
            />
          </FormControl>
        )
      }

      return null
    })
  }

  render() {
    const { title, description, className, style } = this.props
    const { onSubmit, submitLabel } = this.props

    return (
      <div className={s.wrapper}>
        <form
          style={style}
          className={cx(className, s.form)}
          onSubmit={this.props.onSubmit}
        >
          <div className={s.title}>{title}</div>
          {description && <div className={s.desc}>{description}</div>}

          <div className={s.fields}>{this.fields()}</div>

          <div className={s.buttons}>
            {onSubmit && (
              <RaisedButton
                label={submitLabel}
                primary={true}
                onClick={onSubmit}
              />
            )}
          </div>
        </form>
      </div>
    )
  }
}
