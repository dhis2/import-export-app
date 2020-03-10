import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field } from '@dhis2/ui-forms'

import { Schemas } from '.'

const SINGLE_SCHEMA_VALIDATOR = checkedSchemas =>
    checkedSchemas.length == 0
        ? i18n.t('At least one schema must be selected')
        : undefined

const SchemasField = ({ name, ...rest }) => {
    return <Field component={Schemas} name={name} {...rest} />
}

SchemasField.propTypes = {
    name: PropTypes.string.isRequired,
}

export { SchemasField, SINGLE_SCHEMA_VALIDATOR }
