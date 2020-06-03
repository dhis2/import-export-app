import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader, Help } from '@dhis2/ui-core'

import { dataSetQuery, programQuery, TETypeQuery, userQuery } from './queries'
import { resourceTypes } from './resourceTypes'
import { FormField, SelectableList } from '../index'

const resourceToQuery = resourceType => {
    if (resourceType == resourceTypes.DATASET) {
        return { resourceName: 'dataSets', query: dataSetQuery }
    } else if (resourceType == resourceTypes.PROGRAM) {
        return { resourceName: 'programs', query: programQuery }
    } else if (resourceType == resourceTypes.TETYPE) {
        return { resourceName: 'trackedEntityTypes', query: TETypeQuery }
    } else if (resourceType == resourceTypes.USER) {
        return { resourceName: 'users', query: userQuery }
    }

    return { error: `Unkown resource type: ${resourceType}` }
}

const ResourcePicker = ({
    label,
    resourceType,
    selected,
    setSelected,
    meta,
    multiSelect,
    withFilter,
    withActions,
    autoSelectFirst,
    dataTest,
    listName,
    filterLabel,
    errorMessage,
}) => {
    const [list, setList] = useState([])
    const [error, setError] = useState(undefined)
    const { error: resourceError, resourceName, query } = resourceToQuery(
        resourceType
    )

    if (resourceError) {
        console.error(`ResourcePicker: ${resourceError}`)
        return null
    }

    const { loading } = useDataQuery(query, {
        onComplete: data => {
            const elements = data[resourceName][resourceName]
            const list = elements.map(({ id, displayName }) => ({
                value: id,
                label: displayName,
            }))
            setList(list)

            if (autoSelectFirst) {
                setSelected([list[0].value])
            }
        },
        onError: error => {
            setError(error)
            console.error(`ResourcePicker(${resourceName}) error: `, error)
        },
    })

    const showList = !loading && !error

    return (
        <FormField label={label} dataTest={dataTest}>
            {loading && <CircularLoader dataTest={`${dataTest}-loading`} />}
            {error && (
                <div data-test={`${dataTest}-error`}>
                    <p>{errorMessage}</p>
                    <p>{error.message}</p>
                </div>
            )}
            {showList && (
                <SelectableList
                    name={listName}
                    label={filterLabel}
                    selected={selected}
                    setSelected={setSelected}
                    multiSelect={multiSelect}
                    list={list}
                    withFilter={withFilter}
                    withActions={withActions}
                    dataTest={`${dataTest}-list`}
                />
            )}
            {(meta.touched || !meta.pristine) && meta.error && (
                <Help error>{meta.error}</Help>
            )}
        </FormField>
    )
}

ResourcePicker.propTypes = {
    dataTest: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    filterLabel: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    listName: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    resourceType: PropTypes.number.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelected: PropTypes.func.isRequired,
    autoSelectFirst: PropTypes.bool,
    multiSelect: PropTypes.bool,
    withActions: PropTypes.bool,
    withFilter: PropTypes.bool,
}

ResourcePicker.defaultProps = {
    multiSelect: true,
    withFilter: true,
    withActions: true,
}

export { ResourcePicker }
