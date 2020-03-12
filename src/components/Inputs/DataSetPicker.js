import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui-forms'
import {
    DataSetPickerField,
    SINGLE_DATASET_VALIDATOR,
    SINGLE_EXACT_DATASET_VALIDATOR,
} from '../../components/DataSetPicker'

const NAME = 'selectedDataSets'
const LABEL = i18n.t('Data sets')
const DATATEST = 'input-data-set-picker'

const DataSetPicker = ({ multiSelect = true }) => {
    const dataSetValidator = multiSelect
        ? SINGLE_DATASET_VALIDATOR
        : SINGLE_EXACT_DATASET_VALIDATOR
    const validator = composeValidators(hasValue, dataSetValidator)

    return (
        <DataSetPickerField
            name={NAME}
            validator={validator}
            multiSelect={multiSelect}
            label={LABEL}
            dataTest={DATATEST}
        />
    )
}

DataSetPicker.propTypes = {
    multiSelect: PropTypes.bool,
}

export { DataSetPicker }
