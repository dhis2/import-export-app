import React, { useState, useEffect } from 'react';
import { useDataEngine } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';

import { Select } from '../../Select';

const programStageQuery = {
    data: {
        resource: 'programs',
        fields: 'id,displayName',
        id: ({ id }) => `${id}`,
        params: {
            fields: 'programStages[id,displayName]',
            paging: 'false',
        },
    },
};

const ALL_VALUE = ':all';

const ProgramStageSelect = ({
    name,
    label,
    program,
    setSelected,
    selected,
}) => {
    const engine = useDataEngine();
    const [loading, setLoading] = useState(true);
    const [stages, setStages] = useState([]);

    useEffect(() => {
        if (program) {
            setLoading(true);
            setSelected(undefined);
        } else {
            setLoading(false);
        }
        const fetcher = async () => {
            await engine.query(programStageQuery, {
                variables: {
                    id: program,
                },
                onComplete: data => {
                    const list = data.data.programStages;
                    const formattedList = list.map(e => ({
                        value: e.id,
                        label: e.displayName,
                    }));
                    setStages([
                        {
                            value: ALL_VALUE,
                            label: i18n.t('[ All program stages ]'),
                        },
                        ...formattedList,
                    ]);
                    setSelected(ALL_VALUE);
                    setLoading(false);
                },
                onError: e => {
                    console.log('ProgramStageSelect error: ', e);
                },
            });
        };
        if (program) {
            fetcher();
        }
    }, [program]);

    return (
        <Select
            loading={loading}
            name={name}
            label={label}
            options={stages}
            selected={selected}
            setValue={setSelected}
            dense
        />
    );
};

export { ProgramStageSelect, ALL_VALUE };
