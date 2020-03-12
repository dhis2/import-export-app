import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field } from '@dhis2/ui-forms'

import { DataSetPicker } from '.'

const SINGLE_DATASET_VALIDATOR = selectedDataSets =>
    selectedDataSets.length == 0
        ? i18n.t('At least one data set must be selected')
        : undefined

const SINGLE_EXACT_DATASET_VALIDATOR = selectedDataSets =>
    selectedDataSets.length != 1
        ? i18n.t('One data set must be selected')
        : undefined

const Wrapper = ({ input: { value, onChange }, meta, ...rest }) => (
    <DataSetPicker
        meta={meta}
        selected={value}
        setSelected={onChange}
        {...rest}
    />
)

Wrapper.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func,
    }).isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
    }).isRequired,
}

const DataSetPickerField = ({ name, validator, ...rest }) => {
    return (
        <Field component={Wrapper} name={name} validate={validator} {...rest} />
    )
}

DataSetPickerField.propTypes = {
    name: PropTypes.string.isRequired,
    validator: PropTypes.func,
}

export {
    DataSetPickerField,
    SINGLE_DATASET_VALIDATOR,
    SINGLE_EXACT_DATASET_VALIDATOR,
}
