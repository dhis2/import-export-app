import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { Schemas } from '../index.js'
const { Field } = ReactFinalForm

const SINGLE_SCHEMA_VALIDATOR = (checkedSchemas) =>
    checkedSchemas.length == 0
        ? i18n.t('At least one schema must be selected')
        : undefined

const Wrapper = ({ input: { onChange }, meta, ...rest }) => (
    <Schemas meta={meta} setCheckedSchemas={onChange} {...rest} />
)

Wrapper.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func,
    }).isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
    }).isRequired,
}

const SchemasField = ({ name, validator, ...rest }) => {
    return (
        <Field component={Wrapper} name={name} validate={validator} {...rest} />
    )
}

SchemasField.propTypes = {
    name: PropTypes.string.isRequired,
    validator: PropTypes.func,
}

export { SchemasField, SINGLE_SCHEMA_VALIDATOR }
