import React from 'react'
import {
    getFieldState,
    getFieldValue,
    hasRequiredFieldsWithoutValue,
} from 'helpers'
import { Form, Progress, Error } from 'components'
import s from './styles.css'

export class FormBase extends React.Component {
    onChange = (name, value) => {
        const valid = this.props.validateOnChange
            ? this.validate()
            : this.state._meta.valid
        this.setState(
            {
                ...getFieldState(name, value, this.fields, this.state),
                ...this.setMetaState({ valid }),
            },
            () => {
                this.onFormUpdate && this.onFormUpdate(name, value)
            }
        )
    }

    changeContext = _context => this.setState({ _context })

    getFormState() {
        const values = {}
        this.fields
            .map(f => f.name)
            .forEach(name => {
                if (name) {
                    values[name] = getFieldValue(this.state[name])
                }
            })
        return values
    }

    setMetaState(metaState, cb = undefined) {
        return this.setState(
            state => ({
                _meta: {
                    ...state._meta,
                    ...metaState,
                },
            }),
            cb
        )
    }

    setProcessing = () => this.setMetaState({ processing: true })
    clearProcessing = () => this.setMetaState({ processing: false })

    onClearError = () => this.setMetaState({ error: false })

    assertOnError = evt => {
        try {
            const { message: error } = JSON.parse(evt.target.response)
            this.setMetaState({ error, processing: false })
        } catch (err) {}
    }

    validate = () => {
        // Simple default validation for now:
        // just check if there exists required fields without a value
        return !hasRequiredFieldsWithoutValue(this.fields, this.state)
    }
    onBeforeSubmit = () => {
        this.setMetaState({ submitted: true })
        const valid = this.validate()
        return valid && this.onSubmit()
    }

    render() {
        if (this.state._meta.error) {
            return (
                <Error
                    message={this.state._meta.error}
                    onClear={this.onClearError}
                />
            )
        }

        if (this.state._meta.processing) {
            return <Progress />
        }

        return (
            <Form
                className={s.form}
                style={{
                    width: this.formWidth,
                }}
                icon={this.icon}
                fields={this.fields}
                fieldValues={this.state}
                title={this.formTitle}
                description={this.formDescription || ''}
                onChange={this.onChange}
                changeContext={this.changeContext}
                submitLabel={this.submitLabel}
                onSubmit={this.onBeforeSubmit}
            />
        )
    }
}
