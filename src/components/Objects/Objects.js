import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { Select } from '../Select'
import { useObjects } from '../../hooks/useObjects'

const SINGLE_EXACT_OBJECT_VALIDATOR = object =>
    !object ? i18n.t('One object must be selected') : undefined

const Objects = ({ objectType, form, dataTest }) => {
    const setObjectListSelected = val => form.change('object', val)

    const {
        loading: objectsLoading,
        error: objectsError,
        validationText: objectsValidationText,
        objects,
    } = useObjects(objectType, setObjectListSelected)

    return (
        <Select
            loading={objectsLoading}
            name="object"
            label={i18n.t('Object')}
            options={objects}
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
    objectType: PropTypes.object.isRequired,
}

export { Objects, SINGLE_EXACT_OBJECT_VALIDATOR }
