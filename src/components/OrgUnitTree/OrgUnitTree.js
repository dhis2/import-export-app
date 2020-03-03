import React, { useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader } from '@dhis2/ui-core'

import { pathToId } from '../../utils/helper'
import { FormField } from '../FormField'
import { Tree } from './Tree/'
import styles from './OrgUnitTree.module.css'

const rootQuery = {
    roots: {
        resource: 'organisationUnits',
        params: {
            filter: 'level:eq:1',
            fields: 'id,path,displayName,children::isNotEmpty',
            paging: 'false',
        },
    },
}

const orgQuery = {
    units: {
        resource: 'organisationUnits',
        id: ({ id }) => `${id}`,
        params: {
            fields: 'children[id,displayName,path,children::isNotEmpty]',
            paging: 'false',
        },
    },
}

const OrgUnitTree = ({
    selected,
    setSelected,
    dataTest,
    multiSelect = true,
}) => {
    const [children, setChildren] = useState([])
    const [error, setError] = useState(undefined)
    const { loading, engine } = useDataQuery(rootQuery, {
        onComplete: data => {
            const roots = data.roots.organisationUnits
            const list = formatList(roots)
            setChildren(list)
        },
        onError: error => {
            setError(error)
            console.error('OrgUnitTree error: ', error)
        },
    })

    const formatList = list => {
        return list.map(({ id, path, displayName, children }) => ({
            open: false,
            id: id,
            value: path,
            label: displayName,
            children: [],
            hasChildren: children,
        }))
    }

    const toggleOpenStatus = path => {
        const hierarchy = path.split('/').filter(p => p.length != 0)
        const newChildren = [...children]
        let target = newChildren
        hierarchy.forEach(parent => {
            target = target.find(el => el.id == parent)
            if (target.value == path) {
                target.open = !target.open
            } else {
                target = target.children
            }
        })
        setChildren(newChildren)
    }

    const setChildrenFor = (path, ch) => {
        const list = formatList(ch)
        list.sort((a, b) => a.label.localeCompare(b.label))
        const hierarchy = path.split('/').filter(p => p.length != 0)
        const newChildren = [...children]
        let target = newChildren
        hierarchy.forEach(parent => {
            target = target.find(el => el.id == parent)
            if (target.value == path) {
                target.children = list
                target.open = true
            } else {
                target = target.children
            }
        })
        setChildren(newChildren)
    }

    const onOpen = (path, ch) => {
        if (ch.length == 0) {
            const orgId = pathToId(path)
            engine.query(orgQuery, {
                variables: {
                    id: orgId,
                },
                onComplete: data => {
                    setChildrenFor(path, data.units.children)
                },
                onError: error => {
                    setError(error)
                    console.error('OrgUnitTree onOpen error: ', error)
                },
            })
        } else {
            toggleOpenStatus(path)
        }
    }

    const onClose = path => {
        toggleOpenStatus(path)
    }

    const onSelect = path => {
        if (multiSelect) {
            const newValue = !selected.includes(path)
            if (newValue == false) {
                setSelected(selected.filter(p => p != path))
            } else {
                setSelected([...selected, path])
            }
        } else {
            setSelected([path])
        }
    }

    const showTree = !loading && !error

    return (
        <FormField label={i18n.t('Organisation unit')} dataTest={dataTest}>
            <div className={styles.container}>
                {loading && <CircularLoader dataTest={`${dataTest}-loading`} />}
                {error && (
                    <div data-test={`${dataTest}-error`}>
                        <p>
                            {i18n.t(
                                'Something went wrong when loading the organisation units!'
                            )}
                        </p>
                        <p>{error.message}</p>
                    </div>
                )}
                {showTree && (
                    <Tree
                        selected={selected}
                        select={onSelect}
                        multiSelect={multiSelect}
                        onOpen={onOpen}
                        onClose={onClose}
                        list={children}
                        dataTest={`${dataTest}-tree`}
                    />
                )}
            </div>
        </FormField>
    )
}

OrgUnitTree.propTypes = {
    dataTest: PropTypes.string.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelected: PropTypes.func.isRequired,
    multiSelect: PropTypes.bool,
}

export { OrgUnitTree }
