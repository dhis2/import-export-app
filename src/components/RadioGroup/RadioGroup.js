import React from 'react';
import { Radio } from '@dhis2/ui-core';

import { FormField } from '../FormField';
import s from './RadioGroup.module.css';

const RadioGroup = ({ name, label, options, checked, setValue }) => {
    return (
        <FormField label={label}>
            <div className={s.inputs}>
                {options.map(({ value, label }) => (
                    <Radio
                        className={s.radio}
                        key={value}
                        name={value}
                        value={value}
                        label={label}
                        checked={value == checked}
                        onChange={() => setValue(value)}
                    />
                ))}
            </div>
        </FormField>
    );
};

export { RadioGroup };
