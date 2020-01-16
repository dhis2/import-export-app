import React from 'react'
import cx from 'classnames'
import { RaisedButton } from 'material-ui'
import { FormLabel, FormControl } from './material-ui'
import { TaskSummary } from '../TaskSummary'
import s from './styles.module.css'
import File from './File'
import Date from './Date'
import Radio from './Radio'
import Select from './Select'
import Schemas from './Schemas'
import OrgUnitTree from './OrgUnitTree'
import MoreOptions from './MoreOptions'
import DataSetPicker from './DataSetPicker'
import {
    TYPE_FILE,
    TYPE_DATE,
    TYPE_RADIO,
    TYPE_SELECT,
    TYPE_SCHEMAS,
    TYPE_ORG_UNIT,
    TYPE_ORG_UNIT_SINGLE_SELECT,
    TYPE_MORE_OPTIONS,
    TYPE_DATASET_PICKER,
} from './constants'
import { CTX_DEFAULT, CTX_MORE_OPTIONS } from './constants'

export * from './constants'

export class Form extends React.Component {
    fields() {
        const { fields, fieldValues, fieldValuesOverride } = this.props
        const { _context: context, _meta: formMeta } = fieldValues

        return fields.map(field => {
            if (field.context !== CTX_DEFAULT && field.context !== context) {
                return null
            }

            const { type, name, label, className, required, attributes } = field
            const props = {
                ...attributes,
                name,
                label,
                className,
                required,
                formMeta,
            }

            if (type === TYPE_RADIO) {
                props['values'] = fieldValuesOverride[name]
                    ? fieldValuesOverride[name]
                    : fieldValues[name]['values']
                props['selected'] = fieldValues[name]['selected']

                return (
                    <Radio
                        {...props}
                        key={`radio-${name}`}
                        onChange={this.props.onChange}
                    />
                )
            } else if (type === TYPE_SELECT) {
                props['values'] = fieldValuesOverride[name]
                    ? fieldValuesOverride[name]
                    : fieldValues[name]['values']
                props['selected'] = fieldValues[name]['selected']

                return (
                    <Select
                        {...props}
                        key={`select-${name}`}
                        onChange={this.props.onChange}
                    />
                )
            } else if (type === TYPE_FILE) {
                props['selected'] = fieldValues[name]['selected']

                return (
                    <File
                        {...props}
                        key={`file-${name}`}
                        onChange={this.props.onChange}
                    />
                )
            } else if (type === TYPE_DATE) {
                props['value'] = fieldValues[name]['selected']
                if (name === 'endDate') {
                    props['minDate'] = fieldValues['startDate']['selected']
                }

                return (
                    <Date
                        {...props}
                        key={`radio-${name}`}
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
                        {...props}
                        key={`schemas-${name}`}
                        onChange={this.props.onChange}
                    />
                )
            } else if (type === TYPE_ORG_UNIT) {
                const { selected } = fieldValues[name]

                return (
                    <div data-test={props.dataTest}>
                        <FormControl
                            key={`orgUnitTree-${name}`}
                            className={s.formControl}
                        >
                            <FormLabel className={s.formLabel}>
                                {label}
                            </FormLabel>
                            <OrgUnitTree
                                multiple={true}
                                selectable={true}
                                selected={selected}
                                updateSelected={(selected, isSelected, value) =>
                                    this.props.onChange(name, {
                                        selected,
                                        isSelected,
                                        value,
                                    })
                                }
                            />
                        </FormControl>
                    </div>
                )
            } else if (type === TYPE_ORG_UNIT_SINGLE_SELECT) {
                const { selected } = fieldValues[name]

                return (
                    <div data-test={props.dataTest}>
                        <FormControl
                            key={`orgUnitTree-${name}`}
                            className={s.formControl}
                        >
                            <FormLabel className={s.formLabel}>
                                {label}
                            </FormLabel>
                            <OrgUnitTree
                                multiple={false}
                                selectable={true}
                                selected={selected}
                                updateSelected={(selected, isSelected, value) =>
                                    this.props.onChange(name, {
                                        selected,
                                        isSelected,
                                        value,
                                    })
                                }
                            />
                        </FormControl>
                    </div>
                )
            } else if (type === TYPE_DATASET_PICKER) {
                if (fieldValues[name]['value'] === null) {
                    return null
                }

                props['value'] = fieldValues[name]['value']
                props['selected'] = fieldValues[name]['selected']

                return (
                    <div data-test={props.dataTest}>
                        <FormControl key={`dataSetPicker-${name}`}>
                            <DataSetPicker
                                {...props}
                                onChange={this.props.onChange}
                            />
                        </FormControl>
                    </div>
                )
            }

            return null
        })
    }

    description() {
        return (
            this.props.description && (
                <div className={s.desc}>{this.props.description}</div>
            )
        )
    }

    header() {
        return (
            <div className={s.head}>
                <div className={s.icon}>{this.props.icon}</div>
                <div className={s.title}>{this.props.title}</div>
            </div>
        )
    }

    buttons() {
        return (
            <div className={s.buttons}>
                {this.props.onSubmit && (
                    <RaisedButton
                        type="submit"
                        primary={true}
                        label={this.props.submitLabel}
                        onClick={this.props.onSubmit}
                    />
                )}
            </div>
        )
    }

    render() {
        return (
            <div className={s.wrapper}>
                <TaskSummary />

                <form
                    style={this.props.style}
                    className={cx(this.props.className, s.form)}
                    onSubmit={this.props.onSubmit}
                >
                    {this.header()}
                    {this.description()}

                    <div className={s.fields}>{this.fields()}</div>
                    {this.buttons()}
                </form>
            </div>
        )
    }
}
