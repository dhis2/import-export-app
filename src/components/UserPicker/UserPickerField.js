import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field } from '@dhis2/ui-forms'

import { UserPicker } from '../'

const SINGLE_USER_VALIDATOR = selectedUsers =>
    selectedUsers.length == 0
        ? i18n.t('At least one user must be selected')
        : undefined

const SINGLE_EXACT_USER_VALIDATOR = selectedUsers =>
    selectedUsers.length != 1 ? i18n.t('One user must be selected') : undefined

const Wrapper = ({ input: { value, onChange }, meta, ...rest }) => (
    <UserPicker meta={meta} selected={value} setSelected={onChange} {...rest} />
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

const UserPickerField = ({ name, validator, ...rest }) => {
    return (
        <Field component={Wrapper} name={name} validate={validator} {...rest} />
    )
}

UserPickerField.propTypes = {
    name: PropTypes.string.isRequired,
    validator: PropTypes.func,
}

export { UserPickerField, SINGLE_USER_VALIDATOR, SINGLE_EXACT_USER_VALIDATOR }
