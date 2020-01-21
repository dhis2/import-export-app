import React, { Fragment } from 'react';
import { Help, Radio } from '@dhis2/ui-core';

import { FormField } from '../FormField';
import s from './RadioGroup.module.css';

const RadioGroup = ({ name, label, options, checked, setValue }) => {
    return (
        <FormField label={label}>
            <div className={s.inputs}>
                {options.map(({ value, label, help }) => (
                    <div key={value}>
                        <Radio
                            className={s.radio}
                            name={value}
                            value={value}
                            label={label}
                            checked={value == checked}
                            onChange={() => setValue(value)}
                        />
                        {help && <Help>{help}</Help>}
                    </div>
                ))}
            </div>
        </FormField>
    );
};

export { RadioGroup };
