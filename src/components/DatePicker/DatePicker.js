import React from 'react';

import { FormField } from '../FormField';

const DatePicker = ({ name, label, date, onChange, required = true }) => {
    const onChangeHelper = event => {
        onChange(new Date(event.target.value));
    };

    const value =
        date.getFullYear().toString() +
        '-' +
        (date.getMonth() + 1).toString().padStart(2, 0) +
        '-' +
        date
            .getDate()
            .toString()
            .padStart(2, 0);

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
