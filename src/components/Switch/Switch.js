import React from 'react';
import { Help, Switch as UISwitch } from '@dhis2/ui-core';

import { FormField } from '../FormField';

const Switch = ({ name, label, help, checked, setChecked }) => {
    return (
        <FormField label={label}>
            <>
                <UISwitch
                    name={name}
                    onChange={() => setChecked(!checked)}
                    checked={checked}
                />
                {help && <Help>{help}</Help>}
            </>
        </FormField>
    );
};

export { Switch };
