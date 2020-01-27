import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button, ButtonStrip, CircularLoader } from '@dhis2/ui-core'

import {
    filterOutExcludedSchemas,
    formatSchemas,
    getSchemaGroups,
    getGroupLabels,
    getGroupOrder,
} from './helper'
import { SchemaGroup } from './SchemaGroup'
import s from './Schemas.module.css'

const schemaQuery = {
    schemas: {
        resource: 'schemas',
        params: {
            paging: 'false',
        },
    },
}

const Schemas = ({
    excludeSchemas,
    setCheckedSchemas,
    checkedByDefault,
    dataTest,
}) => {
    const { loading, data } = useDataQuery(schemaQuery)
    const [schemaGroups, setSchemaGroups] = useState(undefined)
    const [schemaGroupLabels, setSchemaGroupLabels] = useState(undefined)
    const [schemaGroupOrder, setSchemaGroupOrder] = useState(undefined)

    useEffect(() => {
        if (data) {
            const schemas = data.schemas.schemas
            const filteredSchemas = filterOutExcludedSchemas(
                excludeSchemas,
                schemas
            )
            const formattedSchemas = formatSchemas(
                filteredSchemas,
                checkedByDefault
            )
            const groups = getSchemaGroups(formattedSchemas)
            setSchemaGroups(groups)
            setSchemaGroupOrder(getGroupOrder(groups))
            setSchemaGroupLabels(getGroupLabels(groups))
            propagateCheckedSchemas(groups)
        }
    }, [data])

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
        )
    }

    const onSelectGeneric = val => () => {
        const updatedSchemaGroups = Object.keys(schemaGroups).reduce(
            (acc, groupName) => ({
                ...acc,
                [groupName]: schemaGroups[groupName].reduce(
                    (grAcc, group) => [...grAcc, { ...group, checked: val }],
                    []
                ),
            }),
            {}
        )
        setSchemaGroups(updatedSchemaGroups)
        propagateCheckedSchemas(updatedSchemaGroups)
    }

    const toggleSchema = schemaGroup => ind => {
        const updatedGroup = [...schemaGroups[schemaGroup]]
        updatedGroup[ind] = {
            ...updatedGroup[ind],
            checked: !updatedGroup[ind].checked,
        }
        const updatedSchemaGroups = {
            ...schemaGroups,
            [schemaGroup]: updatedGroup,
        }
        setSchemaGroups(updatedSchemaGroups)
        propagateCheckedSchemas(updatedSchemaGroups)
    }

    return (
        <div className={s.container} data-test={dataTest}>
            {loading && <CircularLoader />}
            {schemaGroups && (
                <>
                    <ButtonStrip>
                        <Button onClick={onSelectGeneric(true)}>
                            {i18n.t('Select All')}
                        </Button>
                        <Button onClick={onSelectGeneric(false)}>
                            {i18n.t('Select None')}
                        </Button>
                    </ButtonStrip>

                    <div className={s.formControl}>
                        {schemaGroupOrder.map(groupKey => {
                            const label = schemaGroupLabels[groupKey]

                            return (
                                <SchemaGroup
                                    key={label}
                                    label={label}
                                    schemas={schemaGroups[groupKey]}
                                    toggleSchema={toggleSchema(groupKey)}
                                />
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

Schemas.propTypes = {
    dataTest: PropTypes.string.isRequired,
    excludeSchemas: PropTypes.object.isRequired,
    setCheckedSchemas: PropTypes.func.isRequired,
    checkedByDefault: PropTypes.bool,
}

export { Schemas }
