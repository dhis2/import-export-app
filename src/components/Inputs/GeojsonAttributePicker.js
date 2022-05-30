import i18n from '@dhis2/d2-i18n'
import {
    ReactFinalForm,
    CheckboxFieldFF,
    hasValue,
    composeValidators,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { ResourcePickerField } from '../index'
import { resourceTypes } from '../ResourcePicker/resourceTypes'

const { useField, Field } = ReactFinalForm

const USE_ATTRIBUTE_NAME = 'useAttribute'
const USE_ATTRIBUTE_LABEL = i18n.t('Store as associated geometry')
const USE_ATTRIBUTE_DATATEST = 'input-use-attribute'

const NAME = 'geojsonAttribute'
const LABEL = i18n.t('Store geometry as value of attribute')
const DATATEST = 'input-geojson-attribute-picker'
const LISTNAME = 'geojsonAttribute'
const FILTERLABEL = ''
const SELECTEDLABEL = i18n.t('Selected programs')
const ERRORMESSAGE = i18n.t('Something went wrong when loading the attributes!')
const RESOURCETYPE = resourceTypes.GEOJSON_ATTRIBUTE

const SINGLE_PROGRAM_VALIDATOR = selectedPrograms =>
    selectedPrograms.length == 0
        ? i18n.t('At least one program must be selected')
        : undefined

const SINGLE_EXACT_PROGRAM_VALIDATOR = selectedPrograms =>
    !selectedPrograms ? i18n.t('One program must be selected') : undefined

const GeojsonAttributePicker = ({
    multiSelect,
    label,
    withFilter,
    ...rest
}) => {
    const { input: checkbox } = useField(USE_ATTRIBUTE_NAME)
    const { value: useAttribute } = checkbox

    const programValidator = multiSelect
        ? SINGLE_PROGRAM_VALIDATOR
        : SINGLE_EXACT_PROGRAM_VALIDATOR
    const validator = composeValidators(hasValue, programValidator)

    return (
        <>
            <Field
                type="checkbox"
                component={CheckboxFieldFF}
                name={USE_ATTRIBUTE_NAME}
                label={USE_ATTRIBUTE_LABEL}
                dataTest={`${USE_ATTRIBUTE_DATATEST}-sf`}
            />
            {useAttribute && (
                <div style={{ maxWidth: '360px', paddingTop: '16px' }}>
                    <ResourcePickerField
                        name={NAME}
                        resourceType={RESOURCETYPE}
                        errorMessage={ERRORMESSAGE}
                        listName={LISTNAME}
                        label={label}
                        withFilter={withFilter}
                        filterLabel={FILTERLABEL}
                        selectedLabel={SELECTEDLABEL}
                        dataTest={DATATEST}
                        multiSelect={multiSelect}
                        validator={validator}
                        autoSelectFirst
                        {...rest}
                    />
                </div>
            )}
        </>
    )
}

GeojsonAttributePicker.defaultProps = {
    label: LABEL,
    multiSelect: false,
    withFilter: false,
}

GeojsonAttributePicker.propTypes = {
    label: PropTypes.string,
    multiSelect: PropTypes.bool,
    withFilter: PropTypes.bool,
}

export { GeojsonAttributePicker }
