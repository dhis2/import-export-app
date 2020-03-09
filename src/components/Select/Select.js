import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field, SingleSelect } from '@dhis2/ui-forms'

import { optionPropType, optionsPropType } from '../../utils/options'
import styles from './Select.module.css'
import { FormField } from '../FormField'

const Select = ({
    name,
    dataTest,
    label,
    options,
    initialValue,
    noMatchText,
    loading,
    error,
    warning,
    validationText,
    helpText,
    filled,
    dense,
    filterable,
    initialFocus,
}) => {
    return (
        <FormField label={label} dataTest={dataTest}>
            <div className={styles.select} data-test={`${dataTest}-container`}>
                <Field
                    component={SingleSelect}
                    name={name}
                    options={options}
                    dense={dense}
                    filled={filled}
                    initialFocus={initialFocus}
                    loading={loading}
                    warning={warning}
                    error={error}
                    initialValue={initialValue}
                    filterable={filterable}
                    noMatchText={
                        noMatchText
                            ? noMatchText
                            : i18n.t('No match found for filter')
                    }
                    helpText={helpText}
                    validationText={validationText}
                    dataTest={`${dataTest}-ssf`}
                />
            </div>
        </FormField>
    )
}

Select.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: optionsPropType.isRequired,
    dense: PropTypes.bool,
    error: PropTypes.bool,
    filled: PropTypes.bool,
    filterable: PropTypes.bool,
    helpText: PropTypes.string,
    initialFocus: PropTypes.bool,
    initialValue: optionPropType,
    loading: PropTypes.bool,
    noMatchText: PropTypes.string,
    validationText: PropTypes.string,
    warning: PropTypes.bool,
}

export { Select }
