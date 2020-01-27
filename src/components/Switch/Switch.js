import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Help, Switch as UISwitch } from '@dhis2/ui-core'

import { FormField } from '../FormField'

const Switch = ({ name, label, help, checked, setChecked, dataTest }) => {
    return (
        <FormField label={label} dataTest={dataTest}>
            <>
                <UISwitch
                    name={name}
                    onChange={() => setChecked(!checked)}
                    checked={checked}
                    label={checked ? i18n.t('Yes') : i18n.t('No')}
                />
                {help && <Help>{help}</Help>}
            </>
        </FormField>
    )
}

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setChecked: PropTypes.func.isRequired,
    help: PropTypes.string,
}

export { Switch }
