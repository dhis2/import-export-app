import React from 'react';
import { SingleSelect, SingleSelectOption } from '@dhis2/ui-core';

import s from './Select.module.css';
import { FormField } from '../FormField';

const Select = ({
    name,
    label,
    loading,
    filled,
    dense,
    filterable,
    initialFocus,
    options,
    setValue,
    selected,
    noMatchText,
}) => {
    const optionEls = options.map(o => (
        <SingleSelectOption key={o.value} value={o.value} label={o.label} />
    ));

    const onChange = ({ selected }) => setValue(selected);

    return (
        <FormField label={label}>
            <div className={s.select}>
                <SingleSelect
                    dense={dense}
                    filled={filled}
                    initialFocus={initialFocus}
                    loading={loading}
                    name={name}
                    onChange={onChange}
                    selected={selected}
                    filterable={filterable}
                    noMatchText={
                        noMatchText ? noMatchText : `No match found for filter`
                    }
                >
                    {optionEls}
                </SingleSelect>
            </div>
        </FormField>
    );
};

export { Select };
