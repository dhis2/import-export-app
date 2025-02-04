import { SingleSelectField, SingleSelectOption, Help } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { optionPropType, optionsPropType } from '../../utils/options.js'
import { FormField } from '../index.js'
import styles from './Select.module.css'

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
    meta,
    warning,
    validationText,
    helpText,
    filled,
    dense,
    filterable,
    initialFocus,
}) => {
    const optionEls = options.map((o) => (
        <SingleSelectOption key={o.value} value={o.value} label={o.label} />
    ))

    const onChange = ({ selected }) => setValue(selected)

    return (
        <FormField label={label} dataTest={dataTest}>
            <div className={styles.select} data-test={`${dataTest}-container`}>
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
                    dataTest={`${dataTest}-ssf`}
                >
                    {optionEls}
                </SingleSelectField>
                {(meta.touched || !meta.pristine) && meta.error && (
                    <Help error>{meta.error}</Help>
                )}
            </div>
        </FormField>
    )
}

Select.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
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
