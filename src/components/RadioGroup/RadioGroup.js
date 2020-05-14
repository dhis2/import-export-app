import React from 'react'
import PropTypes from 'prop-types'
import { Help, Radio } from '@dhis2/ui-core'

import { optionPropType, optionsPropType } from '../../utils/options'
import { FormField } from '../'
import styles from './RadioGroup.module.css'

const RadioGroup = ({
    name,
    label,
    options,
    checked,
    setValue,
    vertical,
    dataTest,
}) => {
    const onChange = label => ({ value }) =>
        setValue({ value: value, label: label })

    return (
        <FormField label={label} dataTest={dataTest} name={name}>
            <div className={vertical ? undefined : styles.inputs}>
                {options.map(o => (
                    <div key={o.value}>
                        <Radio
                            className={styles.radio}
                            name={name}
                            value={o.value}
                            label={o.label}
                            checked={o.value == checked.value}
                            onChange={onChange(o.label)}
                            dataTest={`${dataTest}-${o.value}`}
                        />
                        {o.help && <Help>{o.help}</Help>}
                    </div>
                ))}
            </div>
        </FormField>
    )
}

RadioGroup.propTypes = {
    checked: optionPropType.isRequired,
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: optionsPropType.isRequired,
    setValue: PropTypes.func.isRequired,
    vertical: PropTypes.bool,
}

export { RadioGroup }
