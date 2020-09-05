import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Help, Radio } from '@dhis2/ui'

import { optionPropType, optionsPropType } from '../../utils/options'
import { FormField } from '../index'
import styles from './RadioGroup.module.css'

const RadioGroup = ({
    name,
    label,
    options,
    checked,
    setValue,
    vertical,
    helpText,
    dataTest,
}) => {
    const onChange = label => ({ value }) =>
        setValue({ value: value, label: label })

    return (
        <FormField label={label} dataTest={dataTest} name={name}>
            <div
                className={cx({
                    [styles.vertical]: vertical,
                    [styles.horizontal]: !vertical,
                })}
            >
                {options.map(o => (
                    <div key={o.value}>
                        <Radio
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
            {helpText && <Help>{helpText}</Help>}
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
    helpText: PropTypes.string,
    vertical: PropTypes.bool,
}

export { RadioGroup }
