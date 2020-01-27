import React, { useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Checkbox, InputField, MenuItem, Radio } from '@dhis2/ui-core'

import { optionsPropType } from '../../utils/options'
import s from './SelectableList.module.css'

const SelectableList = ({
    label,
    name,
    selected,
    select,
    list,
    onSelectAll,
    onClearAll,
    multiSelect,
    withFilter,
    withActions,
}) => {
    const [filter, setFilter] = useState('')

    const onSelect = ({ value }) => select(value)

    return (
        <div>
            {withFilter && (
                <div className={s.filter}>
                    <InputField
                        name="filter"
                        label={label}
                        value={filter}
                        onChange={({ value }) => setFilter(value)}
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
                        )

                        return (
                            <MenuItem
                                key={`${name}-mi-${value}`}
                                value={value}
                                label={component}
                                onClick={onSelect}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

SelectableList.propTypes = {
    label: PropTypes.string.isRequired,
    list: optionsPropType.isRequired,
    name: PropTypes.string.isRequired,
    select: PropTypes.func.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    multiSelect: PropTypes.bool,
    withActions: PropTypes.bool,
    withFilter: PropTypes.bool,
    onClearAll: PropTypes.func,
    onSelectAll: PropTypes.func,
}

export { SelectableList }
