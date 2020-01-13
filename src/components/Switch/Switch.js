import React from 'react';
import { Switch as UISwitch } from '@dhis2/ui-core';

import { FormField } from '../FormField';

const Switch = ({ name, label, checked, setChecked }) => {
    return (
        <FormField label={label}>
            <UISwitch
                name={name}
                onChange={() => setChecked(!checked)}
                checked={checked}
            />
        </FormField>
    );
};

export { Switch };
