import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { SelectField } from '../Select'
import { useClassKeys } from '../../hooks/useClassKeys'

const NAME = 'classKey'
const LABEL = i18n.t('Object')
const DATATEST = 'input-class-key'

const ClassKey = ({ form, prevValue, show = true }) => {
    const setClassKey = val => form.change(NAME, val)

    const {
        loading: classKeysLoading,
        error: classKeysError,
        validationText: classKeysValidationText,
        classKeys,
    } = useClassKeys(setClassKey, prevValue)

    return (
        show && (
            <SelectField
                name={NAME}
                label={LABEL}
                options={classKeys}
                loading={classKeysLoading}
                dataTest={DATATEST}
                validationText={classKeysValidationText}
                error={!!classKeysError}
                filterable
                dense
            />
        )
    )
}

ClassKey.propTypes = {
    form: PropTypes.object.isRequired,
    prevValue: PropTypes.object,
    show: PropTypes.bool,
}

export { ClassKey }
