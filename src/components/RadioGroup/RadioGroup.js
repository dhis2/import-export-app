import { Help, Radio } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { FormField } from '../index.js'
import styles from './RadioGroup.module.css'

const Label = ({ label, prefix, type }) => {
    if (!prefix) {
        return label
    }

    return (
        <span>
            <span
                className={cx(styles.prefix, {
                    [styles.prefixCritical]: type === 'critical',
                })}
            >
                {prefix}
            </span>
            {label}
        </span>
    )
}

Label.propTypes = {
    label: PropTypes.string.isRequired,
    prefix: PropTypes.string,
    type: PropTypes.oneOf(['critical']),
}

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
                {options.map((o) => (
                    <div key={o.value}>
                        <Radio
                            name={name}
                            value={o.value}
                            label={
                                <Label
                                    label={o.label}
                                    prefix={o.prefix}
                                    type={o.type}
                                />
                            }
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
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            prefix: PropTypes.string,
            type: PropTypes.oneOf(['critical']),
        })
    ).isRequired,
    setValue: PropTypes.func.isRequired,
    children: PropTypes.node,
    helpText: PropTypes.string,
    vertical: PropTypes.bool,
}

export { RadioGroup }
