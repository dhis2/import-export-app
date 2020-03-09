import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Field, Switch as SwitchUI } from '@dhis2/ui-forms'

import { FormField } from '../FormField'

const Switch = ({ name, label, help, value, dataTest }) => {
    return (
        <FormField label={label} dataTest={dataTest}>
            <Field
                component={SwitchUI}
                name={name}
                label={value ? i18n.t('Yes') : i18n.t('No')}
                helpText={help}
                dataTest={`${dataTest}-sf`}
            />
        </FormField>
    )
}

Switch.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    help: PropTypes.string,
    value: PropTypes.bool,
}

export { Switch }
