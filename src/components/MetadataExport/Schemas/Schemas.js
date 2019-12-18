import React, { useEffect, useState } from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { Button, ButtonStrip, CircularLoader } from '@dhis2/ui-core';

import {
    filterOutExcludedSchemas,
    groupName,
    formatSchemas,
    getSchemaGroups,
    getGroupLabels,
    getGroupOrder,
} from './helper';
import { SchemaGroup } from './SchemaGroup';
import s from './Schemas.module.css';

const schemaQuery = {
    schemas: {
        resource: 'schemas.json',
    },
};

const Schemas = ({ excludeSchemas, setCheckedSchemas, checkedByDefault }) => {
    const { loading, error, data } = useDataQuery(schemaQuery);
    const [schemaGroups, setSchemaGroups] = useState(undefined);
    const [schemaGroupLabels, setSchemaGroupLabels] = useState(undefined);
    const [schemaGroupOrder, setSchemaGroupOrder] = useState(undefined);

    useEffect(() => {
        if (data) {
            const schemas = data.schemas.schemas;
            const filteredSchemas = filterOutExcludedSchemas(
                excludeSchemas,
                schemas
            );
            const formattedSchemas = formatSchemas(
                filteredSchemas,
                checkedByDefault
            );
            const groups = getSchemaGroups(formattedSchemas);
            setSchemaGroups(groups);
            setSchemaGroupOrder(getGroupOrder(groups));
            setSchemaGroupLabels(getGroupLabels(groups));
            propagateCheckedSchemas(groups);
        }
    }, [data]);

    const propagateCheckedSchemas = updatedSchemaGroups => {
        setCheckedSchemas(
            Object.keys(updatedSchemaGroups).reduce(
                (acc, groupName) => [
                    ...acc,
                    ...updatedSchemaGroups[groupName]
                        .filter(s => s.checked)
                        .map(s => s.name),
                ],
                []
            )
        );
    };

    const selectGenericHandler = val => () => {
        const updatedSchemaGroups = Object.keys(schemaGroups).reduce(
            (acc, groupName) => ({
                ...acc,
                [groupName]: schemaGroups[groupName].reduce(
                    (grAcc, group) => [...grAcc, { ...group, checked: val }],
                    []
                ),
            }),
            {}
        );
        setSchemaGroups(updatedSchemaGroups);
        propagateCheckedSchemas(updatedSchemaGroups);
    };

    const toggleSchema = schemaGroup => ind => {
        let updatedGroup = [...schemaGroups[schemaGroup]];
        updatedGroup[ind] = {
            ...updatedGroup[ind],
            checked: !updatedGroup[ind].checked,
        };
        const updatedSchemaGroups = {
            ...schemaGroups,
            [schemaGroup]: updatedGroup,
        };
        setSchemaGroups(updatedSchemaGroups);
        propagateCheckedSchemas(updatedSchemaGroups);
    };

    return (
        <div className={s.container}>
            {loading && <CircularLoader />}
            {schemaGroups && (
                <>
                    <ButtonStrip>
                        <Button onClick={selectGenericHandler(true)}>
                            {i18n.t('Select All')}
                        </Button>
                        <Button onClick={selectGenericHandler(false)}>
                            {i18n.t('Select None')}
                        </Button>
                    </ButtonStrip>

                    <div className={s.formControl}>
                        {schemaGroupOrder.map(groupKey => {
                            const label = schemaGroupLabels[groupKey];

                            return (
                                <SchemaGroup
                                    key={label}
                                    label={label}
                                    schemas={schemaGroups[groupKey]}
                                    toggleSchema={toggleSchema(groupKey)}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export { Schemas };
