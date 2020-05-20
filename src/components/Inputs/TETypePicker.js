import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui-forms'
import { TETypePickerField } from '../'
import {
    SINGLE_TETYPE_VALIDATOR,
    SINGLE_EXACT_TETYPE_VALIDATOR,
} from '../TETypePicker/TETypePickerField'

const NAME = 'selectedTETypes'
const DATATEST = 'input-te-type-picker'
const LABEL = i18n.t('Tracked entity types')

const TETypePicker = ({ multiSelect, show, ...rest }) => {
    const teTypeValidator = multiSelect
        ? SINGLE_TETYPE_VALIDATOR
        : SINGLE_EXACT_TETYPE_VALIDATOR
    const validator = composeValidators(hasValue, teTypeValidator)

    return (
        show && (
            <TETypePickerField
                name={NAME}
                multiSelect={multiSelect}
                validator={validator}
                withActions={false}
                label={LABEL}
                dataTest={DATATEST}
                {...rest}
            />
        )
    )
}

TETypePicker.defaultProps = {
    multiSelect: false,
}

TETypePicker.propTypes = {
    multiSelect: PropTypes.bool,
    show: PropTypes.bool,
}

export { TETypePicker }
