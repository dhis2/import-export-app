import React from 'react';
import { SelectField } from '@dhis2/ui-core';

import s from './Select.module.css';

const Select = ({
    name,
    label,
    loading,
    filled,
    dense,
    initialFocus,
    options,
    setValue,
    selected,
}) => {
    const optionEls = options.map(o => (
        <option key={o.value} value={o.value}>
            {o.label}
        </option>
    ));

    return (
        <div className={s.select}>
            <SelectField
                dense={dense}
                filled={filled}
                initialFocus={initialFocus}
                loading={loading}
                name={name}
                onChange={_ref => setValue(_ref.target.value)}
                label={label}
                value={selected}
            >
                {optionEls}
            </SelectField>
        </div>
    );
};

export { Select };
