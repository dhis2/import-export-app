import React from 'react';
import { InputField } from '@dhis2/ui-core';

import { jsDateToISO8601 } from '../../utils/helper';
import { FormField } from '../FormField';

const DatePicker = ({ name, label, date, onChange, required = true }) => {
    const onChangeHelper = ({ value }, event) => {
        onChange(new Date(value));
    };

    const value = jsDateToISO8601(date);

    return (
        <FormField label={label}>
            <InputField
                type="date"
                name={name}
                value={value}
                onChange={onChangeHelper}
                required={required}
                inputWidth="200px"
            />
        </FormField>
    );
};

export { DatePicker };
