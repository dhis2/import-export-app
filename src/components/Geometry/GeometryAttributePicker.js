import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { ResourcePickerField } from '../index.js'
import { resourceTypes } from '../ResourcePicker/resourceTypes.js'
import styles from './GeometryAttributePicker.module.css'

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

const HELPTEXT = i18n.t(
    'Associated geometry import requires an attribute of type "GeoJSON" applied to "Organisation unit". It can be defined in the Maintenance app.'
)

const GeometryAttributePicker = ({
    multiSelect,
    label,
    withFilter,
    ...rest
}) => {
    const { input: checkbox } = useField(USE_ATTRIBUTE_NAME)
    const { value: useAttribute } = checkbox

    return (
        <div className={styles.container}>
            <Field
                type="checkbox"
                component={CheckboxFieldFF}
                name={USE_ATTRIBUTE_NAME}
                label={USE_ATTRIBUTE_LABEL}
                dataTest={`${USE_ATTRIBUTE_DATATEST}-sf`}
            />
            <div
                className={cx(styles.indent, {
                    [styles.hidden]: !useAttribute,
                })}
            >
                <p className={styles.help}>{HELPTEXT}</p>
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
                    validator={useAttribute ? VALIDATOR : Function.prototype}
                    autoSelectFirst
                    {...rest}
                />
            </div>
        </div>
    )
}

GeometryAttributePicker.defaultProps = {
    label: LABEL,
    multiSelect: false,
    withFilter: false,
}

GeometryAttributePicker.propTypes = {
    label: PropTypes.string,
    multiSelect: PropTypes.bool,
    withFilter: PropTypes.bool,
}

export { GeometryAttributePicker }
