import React, { useState, useEffect } from 'react';
import { useDataEngine } from '@dhis2/app-runtime';

import { Select } from '../../../components/Select';

const listQuery = resource => ({
    data: {
        resource: resource,
        fields: 'id,displayName',
        params: {
            paging: 'false',
        },
    },
});

const ObjectSelect = ({ name, label, type, setSelected, selected }) => {
    const engine = useDataEngine();
    const [loading, setLoading] = useState(true);
    const [objectList, setObjectList] = useState([]);

    useEffect(() => {
        setLoading(true);
        setSelected(undefined);
        const fetcher = async () => {
            await engine.query(listQuery(type), {
                onComplete: data => {
                    const list = data.data[type];
                    const formattedList = list.map(e => ({
                        value: e.id,
                        label: e.displayName,
                    }));
                    setObjectList(formattedList);
                    setSelected(formattedList[0].value);
                    setLoading(false);
                },
                onError: e => {
                    console.log('ObjectSelect error: ', e);
                },
            });
        };
        fetcher();
    }, [type]);

    return (
        <Select
            loading={loading}
            name={name}
            label={label}
            options={objectList}
            selected={selected}
            setValue={setSelected}
            dense
        />
    );
};

export { ObjectSelect };
