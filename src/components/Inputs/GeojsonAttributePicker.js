import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { ResourcePickerField } from '../index'
import { resourceTypes } from '../ResourcePicker/resourceTypes'

const { useField, Field } = ReactFinalForm

const USE_ATTRIBUTE_NAME = 'useAttribute'
const USE_ATTRIBUTE_LABEL = i18n.t('Import as associated geometry')
const USE_ATTRIBUTE_DATATEST = 'input-use-attribute'

const NAME = 'geojsonAttribute'
const LABEL = i18n.t('Store geometry as value of attribute')
const DATATEST = 'input-geojson-attribute-picker'
const LISTNAME = 'geojsonAttribute'
const FILTERLABEL = ''
const SELECTEDLABEL = i18n.t('Selected programs')
const ERRORMESSAGE = i18n.t('Something went wrong when loading the attributes!')
const RESOURCETYPE = resourceTypes.GEOJSON_ATTRIBUTE

const VALIDATOR = (selectedAttributes = []) =>
    selectedAttributes.length === 0
        ? i18n.t('One attribute must be selected')
        : undefined

const GeojsonAttributePicker = ({
    multiSelect,
    label,
    withFilter,
    ...rest
}) => {
    const { input: checkbox } = useField(USE_ATTRIBUTE_NAME)
    const { value: useAttribute } = checkbox

    return (
        <div style={{ maxWidth: '420px', paddingBottom: '24px' }}>
            <Field
                type="checkbox"
                component={CheckboxFieldFF}
                name={USE_ATTRIBUTE_NAME}
                label={USE_ATTRIBUTE_LABEL}
                dataTest={`${USE_ATTRIBUTE_DATATEST}-sf`}
            />
            {useAttribute && (
                <div style={{ paddingLeft: '29px' }}>
                    <p
                        style={{
                            color: 'rgb(74, 87, 104)',
                            fontSize: '12px',
                            lineHeight: '16px',
                            margin: '4px 0 16px',
                        }}
                    >
                        {i18n.t(
                            'Associated geometry import requires an attribute of type "GeoJSON" applied to "Organisation unit". It can be defined in the Maintenance app.'
                        )}
                    </p>
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
                        validator={VALIDATOR}
                        autoSelectFirst
                        {...rest}
                    />
                </div>
            )}
        </div>
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
