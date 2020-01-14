import React, { useEffect, useState } from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { CircularLoader } from '@dhis2/ui-core';

import { CheckboxList } from '../CheckboxList';
import { FormField } from '../FormField';
import s from './DataSetPicker.module.css';

const dataSetQuery = {
    dataSets: {
        resource: 'dataSets',
        params: {
            fields: 'id,displayName',
            paging: 'false',
        },
    },
};

const DataSetPicker = ({
    selected,
    setSelected,
    multiSelect = true,
    withFilter = true,
    withActions = true,
}) => {
    const [list, setList] = useState([]);
    const { loading, error, data } = useDataQuery(dataSetQuery);

    useEffect(() => {
        if (data) {
            const dataSets = data.dataSets.dataSets;
            const list = dataSets.map(({ id, displayName }) => ({
                value: id,
                label: displayName,
            }));
            setList(list);
        }
    }, [data]);

    const onSelect = id => {
        if (multiSelect) {
            const newValue = !selected.includes(id);
            if (newValue == false) {
                setSelected(selected => selected.filter(p => p != id));
            } else {
                setSelected(selected => [...selected, id]);
            }
        } else {
            setSelected([id]);
        }
    };

    const onSelectAll = () => {
        const all = list.map(({ value }) => value);
        setSelected(all);
    };

    const onClearAll = () => {
        setSelected([]);
    };

    return (
        <FormField label={i18n.t('Data sets')}>
            <div className={s.container}>
                {loading && <CircularLoader />}
                {data && (
                    <CheckboxList
                        label={i18n.t('Filter data sets by name')}
                        selected={selected}
                        select={onSelect}
                        onSelectAll={onSelectAll}
                        onClearAll={onClearAll}
                        multiSelect={multiSelect}
                        list={list}
                        withFilter={withFilter}
                        withActions={withActions}
                    />
                )}
            </div>
        </FormField>
    );
};

export { DataSetPicker };
