import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field } from '@dhis2/ui-forms'

import { Schemas } from '.'

const SINGLE_SCHEMA_VALIDATOR = checkedSchemas =>
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

const SchemasField = ({ name, ...rest }) => {
    return <Field component={Wrapper} name={name} {...rest} />
}

SchemasField.propTypes = {
    name: PropTypes.string.isRequired,
}

export { SchemasField, SINGLE_SCHEMA_VALIDATOR }
