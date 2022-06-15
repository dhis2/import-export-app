import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { useClassKeys } from '../../hooks/index.js'
import { StyledField } from '../index.js'

const NAME = 'classKey'
const LABEL = i18n.t('Class key')
const DATATEST = 'input-class-key'

const ClassKey = ({ form, prevValue, show = true }) => {
    const setClassKey = (val) => form.change(NAME, val)

    const {
        loading: classKeysLoading,
        error: classKeysError,
        validationText: classKeysValidationText,
        classKeys,
    } = useClassKeys(setClassKey, prevValue)

    return (
        show && (
            <StyledField
                component={SingleSelectFieldFF}
                name={NAME}
                label={LABEL}
                options={classKeys}
                loading={classKeysLoading}
                dataTest={DATATEST}
                validationText={classKeysValidationText}
                error={!!classKeysError}
                filterable
            />
        )
    )
}

ClassKey.propTypes = {
    form: PropTypes.object.isRequired,
    prevValue: PropTypes.string,
    show: PropTypes.bool,
}

export { ClassKey }
