import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators, SingleSelectFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useObjects } from '../../hooks/index.js'
import { StyledField } from '../index.js'

const SINGLE_EXACT_OBJECT_VALIDATOR = (object) =>
    !object ? i18n.t('One object must be selected') : undefined

const NAME = 'object'
const LABEL = i18n.t('Object')
const VALIDATOR = composeValidators(hasValue, SINGLE_EXACT_OBJECT_VALIDATOR)
const DATATEST = 'input-object-select'

const Objects = ({ objectType, form }) => {
    const setObjectListSelected = (val) => form.change(NAME, val)

    const {
        loading: objectsLoading,
        error: objectsError,
        validationText: objectsValidationText,
        objects,
    } = useObjects(objectType, setObjectListSelected)

    return (
        <div style={{ maxWidth: '480px' }}>
            <StyledField
                component={SingleSelectFieldFF}
                loading={objectsLoading}
                name={NAME}
                label={LABEL}
                options={objects}
                validate={VALIDATOR}
                dataTest={DATATEST}
                validationText={objectsValidationText}
                error={!!objectsError}
                filterable
            />
        </div>
    )
}

Objects.propTypes = {
    form: PropTypes.object.isRequired,
    objectType: PropTypes.string.isRequired,
}

export { Objects }
