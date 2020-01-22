import React from 'react';
import PropTypes from 'prop-types';
import { SingleSelect, SingleSelectOption } from '@dhis2/ui-core';

import { optionPropType, optionsPropType } from '../../utils/options';
import s from './Select.module.css';
import { FormField } from '../FormField';

const Select = ({
    name,
    dataTest,
    label,
    options,
    setValue,
    selected,
    noMatchText,
    loading,
    filled,
    dense,
    filterable,
    initialFocus,
}) => {
    const optionEls = options.map(o => (
        <SingleSelectOption key={o.value} value={o.value} label={o.label} />
    ));

    const onChange = ({ selected }) => setValue(selected);

    return (
        <FormField label={label} dataTest={dataTest}>
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

Select.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: optionsPropType.isRequired,
    setValue: PropTypes.func.isRequired,
    dense: PropTypes.bool,
    filled: PropTypes.bool,
    filterable: PropTypes.bool,
    initialFocus: PropTypes.bool,
    loading: PropTypes.bool,
    noMatchText: PropTypes.string,
    selected: optionPropType,
};

export { Select };
