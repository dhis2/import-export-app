import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { SelectField } from '../Select'
import { useObjects } from '../../hooks/useObjects'

const SINGLE_EXACT_OBJECT_VALIDATOR = object =>
    !object ? i18n.t('One object must be selected') : undefined

const Objects = ({ name, label, objectType, form, validator, dataTest }) => {
    const setObjectListSelected = val => form.change(name, val)

    const {
        loading: objectsLoading,
        error: objectsError,
        validationText: objectsValidationText,
        objects,
    } = useObjects(objectType, setObjectListSelected)

    return (
        <SelectField
            loading={objectsLoading}
            name={name}
            label={label}
            options={objects}
            validate={validator}
            dataTest={dataTest}
            validationText={objectsValidationText}
            error={!!objectsError}
            filterable
            dense
        />
    )
}

Objects.propTypes = {
    dataTest: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    objectType: PropTypes.object.isRequired,
    validator: PropTypes.func,
}

export { Objects, SINGLE_EXACT_OBJECT_VALIDATOR }
