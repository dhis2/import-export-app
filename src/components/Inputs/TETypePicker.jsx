import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { ResourcePickerField } from '../index.js'
import { resourceTypes } from '../ResourcePicker/resourceTypes.js'

const NAME = 'selectedTETypes'
const DATATEST = 'input-te-type-picker'
const LABEL = i18n.t('Tracked entity types')
const LISTNAME = 'selectedTETypes'
const FILTERLABEL = i18n.t('Filter tracked entity types by name')
const SELECTEDLABEL = i18n.t('Selected tracked entity types')
const ERRORMESSAGE = i18n.t(
    'Something went wrong when loading the tracked entity types!'
)
const RESOURCETYPE = resourceTypes.TETYPE

const SINGLE_TETYPE_VALIDATOR = (selectedTypes) =>
    selectedTypes.length == 0
        ? i18n.t('At least one tracked entity type must be selected')
        : undefined

const SINGLE_EXACT_TETYPE_VALIDATOR = (selectedTypes) =>
    !selectedTypes
        ? i18n.t('One tracked entity type must be selected')
        : undefined

const TETypePicker = ({ multiSelect, show, ...rest }) => {
    const teTypeValidator = multiSelect
        ? SINGLE_TETYPE_VALIDATOR
        : SINGLE_EXACT_TETYPE_VALIDATOR
    const validator = composeValidators(hasValue, teTypeValidator)

    return (
        show && (
            <ResourcePickerField
                name={NAME}
                resourceType={RESOURCETYPE}
                errorMessage={ERRORMESSAGE}
                listName={LISTNAME}
                label={LABEL}
                filterLabel={FILTERLABEL}
                selectedLabel={SELECTEDLABEL}
                dataTest={DATATEST}
                multiSelect={multiSelect}
                validator={validator}
                withActions={false}
                autoSelectFirst={true}
                {...rest}
            />
        )
    )
}

TETypePicker.defaultProps = {
    multiSelect: false,
}

TETypePicker.propTypes = {
    multiSelect: PropTypes.bool,
    show: PropTypes.bool,
}

export { TETypePicker }
