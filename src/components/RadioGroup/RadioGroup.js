import React from 'react';
import PropTypes from 'prop-types';
import { Help, Radio } from '@dhis2/ui-core';

import { optionPropType, optionsPropType } from '../../utils/options';
import { FormField } from '../FormField';
import s from './RadioGroup.module.css';

const RadioGroup = ({ name, label, options, checked, setValue, dataTest }) => {
    const onChange = ({ value, name }) =>
        setValue({ value: value, label: name });

    return (
        <FormField label={label} dataTest={dataTest} name={name}>
            <div className={s.inputs}>
                {options.map(o => (
                    <div key={o.value}>
                        <Radio
                            className={s.radio}
                            name={o.label}
                            value={o.value}
                            label={o.label}
                            checked={o.value == checked.value}
                            onChange={onChange}
                        />
                        {o.help && <Help>{o.help}</Help>}
                    </div>
                ))}
            </div>
        </FormField>
    );
};

RadioGroup.propTypes = {
    checked: optionPropType.isRequired,
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: optionsPropType.isRequired,
    setValue: PropTypes.func.isRequired,
};

export { RadioGroup };
