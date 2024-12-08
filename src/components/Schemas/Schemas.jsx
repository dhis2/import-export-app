import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button, ButtonStrip, CircularLoader, Help } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import {
    filterOutExcludedSchemas,
    formatSchemas,
    getSchemaGroups,
    getGroupLabels,
    getGroupOrder,
} from './helper.js'
import { SchemaGroup } from './SchemaGroup.jsx'
import styles from './Schemas.module.css'

const schemaQuery = {
    schemas: {
        resource: 'schemas',
        params: {
            fields: ['metadata', 'collectionName', 'displayName', 'klass'],
        },
    },
}

const Schemas = ({
    excludeSchemas,
    setCheckedSchemas,
    meta,
    checkedByDefault,
    dataTest,
}) => {
    const [schemaGroups, setSchemaGroups] = useState(undefined)
    const [schemaGroupLabels, setSchemaGroupLabels] = useState(undefined)
    const [schemaGroupOrder, setSchemaGroupOrder] = useState([])
    const { error, fetching, data } = useDataQuery(schemaQuery, {
        onError: console.error,
    })

    useEffect(() => {
        if (!fetching && data) {
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
    }, [fetching, data])

    const propagateCheckedSchemas = (updatedSchemaGroups) => {
        setCheckedSchemas(
            Object.keys(updatedSchemaGroups).reduce(
                (acc, groupName) => [
                    ...acc,
                    ...updatedSchemaGroups[groupName]
                        .filter((s) => s.checked)
                        .map((s) => s.name),
                ],
                []
            )
        )
    }

    const onSelectGeneric = (val) => () => {
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

    const toggleSchema = (schemaGroup) => (ind) => {
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

    const showSchemas = !fetching && !error

    return (
        <div className={styles.container} data-test={dataTest}>
            {fetching && <CircularLoader dataTest={`${dataTest}-loading`} />}
            {error && (
                <div data-test={`${dataTest}-error`}>
                    <p>
                        {i18n.t(
                            'Something went wrong when loading the schemas!'
                        )}
                    </p>
                    <p>{error.message}</p>
                </div>
            )}
            {showSchemas && (
                <>
                    <ButtonStrip>
                        <Button
                            secondary
                            small
                            onClick={onSelectGeneric(true)}
                            dataTest={`${dataTest}-select-all`}
                        >
                            {i18n.t('Select All')}
                        </Button>
                        <Button
                            secondary
                            small
                            onClick={onSelectGeneric(false)}
                            dataTest={`${dataTest}-select-none`}
                        >
                            {i18n.t('Select None')}
                        </Button>
                    </ButtonStrip>

                    <div className={styles.formControl}>
                        {schemaGroupOrder.map((groupKey) => {
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
                    {(meta.touched || !meta.pristine) && meta.error && (
                        <Help error>{meta.error}</Help>
                    )}
                </>
            )}
        </div>
    )
}

Schemas.propTypes = {
    dataTest: PropTypes.string.isRequired,
    excludeSchemas: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    setCheckedSchemas: PropTypes.func.isRequired,
    checkedByDefault: PropTypes.bool,
}

export { Schemas }
