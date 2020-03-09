import React from 'react'
import PropTypes from 'prop-types'
import { Help, Radio } from '@dhis2/ui-core'
import { Field } from '@dhis2/ui-forms'

import { optionPropType, optionsPropType } from '../../utils/options'
import { FormField } from '../FormField'
import styles from './RadioGroup.module.css'

const CustomFieldComponent = ({
    radioName: name,
    label,
    options,
    dataTest,
    input: { onChange, value },
}) => (
    <FormField label={label} dataTest={dataTest} name={name}>
        <div className={styles.inputs}>
            {options.map(o => (
                <div key={o.value}>
                    <Radio
                        className={styles.radio}
                        name={name}
                        value={o.value}
                        label={o.label}
                        checked={o.value == value.value}
                        onChange={() =>
                            onChange({ value: o.value, label: o.label })
                        }
                        dataTest={`${dataTest}-${o.value}`}
                    />
                    {o.help && <Help>{o.help}</Help>}
                </div>
            ))}
        </div>
    </FormField>
)

CustomFieldComponent.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: optionsPropType.isRequired,
    radioName: PropTypes.string.isRequired,
    input: PropTypes.shape({
        value: optionPropType.isRequired,
        onChange: PropTypes.func.isRequired,
    }),
}

const RadioGroup = ({ name, label, options, dataTest }) => {
    return (
        <Field
            name={name}
            component={CustomFieldComponent}
            radioName={name}
            label={label}
            options={options}
            dataTest={dataTest}
        />
    )
}

RadioGroup.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: optionsPropType.isRequired,
}

export { RadioGroup }
