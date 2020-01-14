import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { Checkbox, InputField, MenuItem, Radio } from '@dhis2/ui-core';

import s from './CheckboxList.module.css';

const CheckboxList = ({
    label,
    selected,
    select,
    onSelectAll,
    onClearAll,
    multiSelect,
    withFilter,
    withActions,
    list,
}) => {
    const [filter, setFilter] = useState('');

    return (
        <div>
            {withFilter && (
                <div className={s.filter}>
                    <InputField
                        name="filter"
                        label={label}
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        dense
                    />
                </div>
            )}

            {withActions && (
                <div className={s.actions}>
                    <Checkbox
                        className={s.action}
                        name="select-all"
                        value="select-all"
                        label={i18n.t('Select all')}
                        onChange={onSelectAll}
                        checked
                    />
                    <Checkbox
                        className={s.action}
                        name="clear-all"
                        value="clear-all"
                        label={i18n.t('Clear all')}
                        onChange={onClearAll}
                    />
                </div>
            )}

            <div className={s.body}>
                {list
                    .filter(({ label }) =>
                        label.toLowerCase().includes(filter.toLowerCase())
                    )
                    .map(({ value, label }) => {
                        const component = multiSelect ? (
                            <Checkbox
                                value={value}
                                name={value}
                                label={label}
                                checked={selected.includes(value)}
                                onChange={() => 0}
                            />
                        ) : (
                            <Radio
                                value={value}
                                name={value}
                                label={label}
                                checked={selected.includes(value)}
                                onChange={() => 0}
                            />
                        );

                        return (
                            <MenuItem
                                key={`dateSetPicker-mi-${value}`}
                                value={value}
                                label={component}
                                onClick={() => select(value)}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export { CheckboxList };
