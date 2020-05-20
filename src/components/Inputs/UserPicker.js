import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui-forms'
import { UserPickerField } from '../'
import {
    SINGLE_USER_VALIDATOR,
    SINGLE_EXACT_USER_VALIDATOR,
} from '../UserPicker/UserPickerField'

const NAME = 'selectedUsers'
const DATATEST = 'input-user-picker'
const LABEL = i18n.t('Users')

const UserPicker = ({ multiSelect, show, ...rest }) => {
    const userValidator = multiSelect
        ? SINGLE_USER_VALIDATOR
        : SINGLE_EXACT_USER_VALIDATOR
    const validator = composeValidators(hasValue, userValidator)

    return (
        show && (
            <UserPickerField
                name={NAME}
                multiSelect={multiSelect}
                autoSelectFirst={false}
                validator={validator}
                withActions={true}
                label={LABEL}
                dataTest={DATATEST}
                {...rest}
            />
        )
    )
}

UserPicker.defaultProps = {
    multiSelect: true,
}

UserPicker.propTypes = {
    multiSelect: PropTypes.bool,
    show: PropTypes.bool,
}

export { UserPicker }
