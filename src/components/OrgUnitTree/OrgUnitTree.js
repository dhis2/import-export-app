import React, { useEffect, useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { useDataEngine, useDataQuery } from '@dhis2/app-runtime';
import { CircularLoader } from '@dhis2/ui-core';

import { FormField } from '../FormField';
import { Tree } from './Tree';
import s from './OrgUnitTree.module.css';

const rootQuery = {
    roots: {
        resource: 'organisationUnits',
        params: {
            filter: 'level:eq:1',
            fields: 'id,path,displayName,children::isNotEmpty',
            paging: 'false',
        },
    },
};

const orgQuery = {
    units: {
        resource: 'organisationUnits',
        id: ({ id }) => `${id}`,
        params: {
            fields: 'children[id,displayName,path,children::isNotEmpty]',
            paging: 'false',
        },
    },
};

const OrgUnitTree = ({ selected, setSelected, multiSelect = true }) => {
    const [children, setChildren] = useState([]);
    const { loading, error, data, engine } = useDataQuery(rootQuery);

    useEffect(() => {
        if (data) {
            const roots = data.roots.organisationUnits;
            const list = formatList(roots);
            setChildren(list);
        }
    }, [data]);

    const formatList = list => {
        return list.map(({ id, path, displayName, children }) => ({
            open: false,
            id: id,
            value: path,
            label: displayName,
            children: [],
            hasChildren: children,
        }));
    };

    const toggleOpenStatus = path => {
        const hierarchy = path.split('/').filter(p => p.length != 0);
        const newChildren = [...children];
        let target = newChildren;
        hierarchy.forEach(parent => {
            target = target.find(el => el.id == parent);
            if (target.value == path) {
                target.open = !target.open;
            } else {
                target = target.children;
            }
        });
        setChildren(newChildren);
    };

    const setChildrenFor = (path, ch) => {
        const list = formatList(ch);
        list.sort((a, b) => a.label.localeCompare(b.label));
        const hierarchy = path.split('/').filter(p => p.length != 0);
        const newChildren = [...children];
        let target = newChildren;
        hierarchy.forEach(parent => {
            target = target.find(el => el.id == parent);
            if (target.value == path) {
                target.children = list;
                target.open = true;
            } else {
                target = target.children;
            }
        });
        setChildren(newChildren);
    };

    const onOpen = (path, ch) => {
        if (ch.length == 0) {
            const pathSplit = path.split('/');
            const orgId = pathSplit[pathSplit.length - 1];
            engine.query(orgQuery, {
                variables: {
                    id: orgId,
                },
                onComplete: data => {
                    setChildrenFor(path, data.units.children);
                },
                onError: e => {
                    console.log('OrgUnitTree onOpen error: ', e);
                },
            });
        } else {
            toggleOpenStatus(path);
        }
    };

    const onClose = path => {
        toggleOpenStatus(path);
    };

    const onSelect = path => {
        if (multiSelect) {
            const newValue = !selected.includes(path);
            if (newValue == false) {
                setSelected(selected => selected.filter(p => p != path));
            } else {
                setSelected(selected => [...selected, path]);
            }
        } else {
            setSelected([path]);
        }
    };

    return (
        <FormField label={i18n.t('Organisation unit')}>
            <div className={s.container}>
                {loading && <CircularLoader />}
                {data && (
                    <Tree
                        selected={selected}
                        select={onSelect}
                        multiSelect={multiSelect}
                        onOpen={onOpen}
                        onClose={onClose}
                        list={children}
                    />
                )}
            </div>
        </FormField>
    );
};

export { OrgUnitTree };
