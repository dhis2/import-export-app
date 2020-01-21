import React, { Fragment } from 'react';
import { Help, Radio } from '@dhis2/ui-core';

import { FormField } from '../FormField';
import s from './RadioGroup.module.css';

const RadioGroup = ({ name, label, options, checked, setValue }) => {
    const onChange = ({ value, name }) =>
        setValue({ value: value, label: name });

    return (
        <FormField label={label}>
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

export { RadioGroup };
