import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field } from '@dhis2/ui-forms'

import { DataSetPicker } from '.'

const SINGLE_DATASET_VALIDATOR = selectedDataSets =>
    selectedDataSets.length == 0
        ? i18n.t('At least one data set must be selected')
        : undefined

const DataSetPickerField = ({ name, ...rest }) => {
    return <Field component={DataSetPicker} name={name} {...rest} />
}

DataSetPickerField.propTypes = {
    name: PropTypes.string.isRequired,
}

export { DataSetPickerField, SINGLE_DATASET_VALIDATOR }
