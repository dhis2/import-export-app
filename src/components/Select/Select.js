import React from 'react'
import PropTypes from 'prop-types'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui-core'

import { optionPropType, optionsPropType } from '../../utils/options'
import s from './Select.module.css'
import { FormField } from '../FormField'

const Select = ({
    name,
    dataTest,
    label,
    options,
    setValue,
    selected,
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
    const optionEls = options.map(o => (
        <SingleSelectOption key={o.value} value={o.value} label={o.label} />
    ))

    const onChange = ({ selected }) => setValue(selected)

    return (
        <FormField label={label} dataTest={dataTest}>
            <div className={s.select}>
                <SingleSelectField
                    dense={dense}
                    filled={filled}
                    initialFocus={initialFocus}
                    loading={loading}
                    warning={warning}
                    error={error}
                    name={name}
                    onChange={onChange}
                    selected={selected}
                    filterable={filterable}
                    noMatchText={
                        noMatchText ? noMatchText : `No match found for filter`
                    }
                    helpText={helpText}
                    validationText={validationText}
                >
                    {optionEls}
                </SingleSelectField>
            </div>
        </FormField>
    )
}

Select.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: optionsPropType.isRequired,
    setValue: PropTypes.func.isRequired,
    dense: PropTypes.bool,
    error: PropTypes.bool,
    filled: PropTypes.bool,
    filterable: PropTypes.bool,
    helpText: PropTypes.string,
    initialFocus: PropTypes.bool,
    loading: PropTypes.bool,
    noMatchText: PropTypes.string,
    selected: optionPropType,
    validationText: PropTypes.string,
    warning: PropTypes.bool,
}

export { Select }
