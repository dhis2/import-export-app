import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Help, Radio } from '@dhis2/ui'

import { optionsPropType } from '../../utils/options'
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
    children,
    dataTest,
}) => {
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
                            checked={o.value == checked}
                            onChange={() => setValue(o.value)}
                            dataTest={`${dataTest}-${o.value}`}
                        />
                        {o.help && <Help>{o.help}</Help>}
                    </div>
                ))}
            </div>
            {helpText && <Help>{helpText}</Help>}
            {children && <div className={styles.children}>{children}</div>}
        </FormField>
    )
}

RadioGroup.propTypes = {
    checked: PropTypes.string.isRequired,
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: optionsPropType.isRequired,
    setValue: PropTypes.func.isRequired,
    children: PropTypes.node,
    helpText: PropTypes.string,
    vertical: PropTypes.bool,
}

export { RadioGroup }
