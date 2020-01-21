import React from 'react';
import i18n from '@dhis2/d2-i18n';
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
                    label={checked ? i18n.t('Yes') : i18n.t('No')}
                />
                {help && <Help>{help}</Help>}
            </>
        </FormField>
    );
};

export { Switch };
