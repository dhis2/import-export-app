import React from 'react';

import { jsDateToISO8601 } from '../../utils/helper';
import { FormField } from '../FormField';

const DatePicker = ({ name, label, date, onChange, required = true }) => {
    const onChangeHelper = event => {
        onChange(new Date(event.target.value));
    };

    const value = jsDateToISO8601(date);

    return (
        <FormField label={label}>
            <input
                type="date"
                name={name}
                value={value}
                onChange={onChangeHelper}
                required={required}
            />
        </FormField>
    );
};

export { DatePicker };
