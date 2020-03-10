import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field } from '@dhis2/ui-forms'

import { OrgUnitTree } from '.'

const SINGLE_ORG_VALIDATOR = selectedOrgUnits =>
    selectedOrgUnits.length == 0
        ? i18n.t('At least one organisation unit must be selected')
        : undefined

const SINGLE_EXACT_ORG_VALIDATOR = selectedOrgUnits =>
    selectedOrgUnits.length != 1
        ? i18n.t('One organisation unit must be selected')
        : undefined

const Wrapper = ({ input: { value, onChange }, meta, ...rest }) => (
    <OrgUnitTree
        meta={meta}
        selected={value}
        setSelected={onChange}
        {...rest}
    />
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

const OrgUnitTreeField = ({ name, ...rest }) => {
    return <Field component={Wrapper} name={name} {...rest} />
}

OrgUnitTreeField.propTypes = {
    name: PropTypes.string.isRequired,
}

export { OrgUnitTreeField, SINGLE_ORG_VALIDATOR, SINGLE_EXACT_ORG_VALIDATOR }
