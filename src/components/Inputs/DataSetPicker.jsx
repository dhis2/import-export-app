import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { ResourcePickerField } from '../index.js'
import { resourceTypes } from '../ResourcePicker/resourceTypes.js'

const NAME = 'selectedDataSets'
const LABEL = i18n.t('Which data sets should be included in export?')
const DATATEST = 'input-data-set-picker'
const LISTNAME = 'dataSetPicker'
const FILTERLABEL = i18n.t('Filter data sets')
const SELECTEDLABEL = i18n.t('Selected data sets')
const ERRORMESSAGE = i18n.t('Something went wrong when loading the data sets!')
const RESOURCETYPE = resourceTypes.DATASET

const SINGLE_DATASET_VALIDATOR = (selectedDataSets) =>
    selectedDataSets.length == 0
        ? i18n.t('At least one data set must be selected')
        : undefined

const SINGLE_EXACT_DATASET_VALIDATOR = (selectedDataSets) =>
    selectedDataSets.length != 1
        ? i18n.t('One data set must be selected')
        : undefined

const DataSetPicker = ({ multiSelect = true }) => {
    const dataSetValidator = multiSelect
        ? SINGLE_DATASET_VALIDATOR
        : SINGLE_EXACT_DATASET_VALIDATOR
    const validator = composeValidators(hasValue, dataSetValidator)

    return (
        <ResourcePickerField
            name={NAME}
            resourceType={RESOURCETYPE}
            errorMessage={ERRORMESSAGE}
            listName={LISTNAME}
            label={LABEL}
            filterLabel={FILTERLABEL}
            selectedLabel={SELECTEDLABEL}
            dataTest={DATATEST}
            validator={validator}
            multiSelect={multiSelect}
        />
    )
}

DataSetPicker.propTypes = {
    multiSelect: PropTypes.bool,
}

export { DataSetPicker }
