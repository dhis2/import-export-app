import React from 'react'
import PropTypes from 'prop-types'
import { hasValue, composeValidators } from '@dhis2/ui-forms'
import i18n from '@dhis2/d2-i18n'

import { SelectField } from '../'
import { useObjects } from '../../hooks/'

const SINGLE_EXACT_OBJECT_VALIDATOR = object =>
    !object ? i18n.t('One object must be selected') : undefined

const NAME = 'object'
const LABEL = i18n.t('Object')
const VALIDATOR = composeValidators(hasValue, SINGLE_EXACT_OBJECT_VALIDATOR)
const DATATEST = 'input-object-select'

const Objects = ({ objectType, form }) => {
    const setObjectListSelected = val => form.change(NAME, val)

    const {
        loading: objectsLoading,
        error: objectsError,
        validationText: objectsValidationText,
        objects,
    } = useObjects(objectType, setObjectListSelected)

    return (
        <SelectField
            loading={objectsLoading}
            name={NAME}
            label={LABEL}
            options={objects}
            validate={VALIDATOR}
            dataTest={DATATEST}
            validationText={objectsValidationText}
            error={!!objectsError}
            filterable
            dense
        />
    )
}

Objects.propTypes = {
    form: PropTypes.object.isRequired,
    objectType: PropTypes.object.isRequired,
}

export { Objects }
