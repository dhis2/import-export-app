import { useDataQuery } from '@dhis2/app-runtime'
import {
    ReactFinalForm,
    SingleSelectFieldFF,
    Transfer,
    CircularLoader,
    Help,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { FormField } from '../index'
import { dataSetQuery, programQuery, TETypeQuery, userQuery } from './queries'
import styles from './ResourcePicker.module.css'
import { resourceTypes } from './resourceTypes'

const { Field } = ReactFinalForm

const resourceToQuery = (resourceType) => {
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
    autoSelectFirst,
    dataTest,
    listName,
    filterLabel,
    selectedLabel,
    errorMessage,
}) => {
    const [list, setList] = useState([])
    const [error, setError] = useState(undefined)
    const {
        error: resourceError,
        resourceName,
        query,
    } = resourceToQuery(resourceType)

    if (resourceError) {
        console.error(`ResourcePicker: ${resourceError}`)
        return null
    }

    const { fetching } = useDataQuery(query, {
        onComplete: (data) => {
            const elements = data[resourceName][resourceName]
            const list = elements.map(({ id, displayName }) => ({
                value: id,
                label: displayName,
            }))
            setList(list)

            if (autoSelectFirst && list.length) {
                setSelected({
                    selected: multiSelect ? [list[0].value] : list[0].value,
                })
            }
        },
        onError: (error) => {
            setError(error)
            console.error(`ResourcePicker(${resourceName}) error: `, error)
        },
    })

    const showList = !fetching && !error

    return (
        <FormField label={label} dataTest={dataTest}>
            {fetching && <CircularLoader dataTest={`${dataTest}-loading`} />}
            {error && (
                <Help error data-test={`${dataTest}-error`}>
                    <p>{errorMessage}</p>
                    <p>{error.message}</p>
                </Help>
            )}
            {showList &&
                (multiSelect ? (
                    <Transfer
                        name={listName}
                        label={filterLabel}
                        selected={selected}
                        onChange={setSelected}
                        options={list}
                        filterable={withFilter}
                        filterPlaceholder={filterLabel}
                        rightHeader={
                            <p className={styles.selectedLabel}>
                                {selectedLabel}
                            </p>
                        }
                        dataTest={`${dataTest}-list`}
                        loading={fetching}
                    />
                ) : (
                    <Field
                        component={SingleSelectFieldFF}
                        name={listName}
                        options={list}
                        filterable={withFilter}
                        dataTest={`${dataTest}-select`}
                        loading={fetching}
                    />
                ))}
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
    selected: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    selectedLabel: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
    autoSelectFirst: PropTypes.bool,
    multiSelect: PropTypes.bool,
    withFilter: PropTypes.bool,
}

ResourcePicker.defaultProps = {
    multiSelect: true,
    withFilter: true,
}

export { ResourcePicker }
