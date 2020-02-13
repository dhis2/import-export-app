import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { CircularLoader } from '@dhis2/ui-core'

import { SelectableList } from '../SelectableList'
import { FormField } from '../FormField'
import s from './DataSetPicker.module.css'

const dataSetQuery = {
    dataSets: {
        resource: 'dataSets',
        params: {
            fields: 'id,displayName',
            paging: 'false',
        },
    },
}

const DataSetPicker = ({
    selected,
    setSelected,
    multiSelect = true,
    withFilter = true,
    withActions = true,
    dataTest,
}) => {
    const [list, setList] = useState([])
    const [error, setError] = useState(undefined)
    const { loading } = useDataQuery(dataSetQuery, {
        onComplete: data => {
            const dataSets = data.dataSets.dataSets
            const list = dataSets.map(({ id, displayName }) => ({
                value: id,
                label: displayName,
            }))
            setList(list)
        },
        onError: error => {
            setError(error)
            console.error('DataSetPicker error: ', error)
        },
    })

    const onSelect = id => {
        if (multiSelect) {
            const newValue = !selected.includes(id)
            if (newValue == false) {
                setSelected(selected.filter(p => p != id))
            } else {
                setSelected([...selected, id])
            }
        } else {
            setSelected([id])
        }
    }

    const onSelectAll = () => {
        const all = list.map(({ value }) => value)
        setSelected(all)
    }

    const onClearAll = () => {
        setSelected([])
    }

    let content
    if (loading) {
        content = <CircularLoader dataTest={`${dataTest}-loading`} />
    } else if (error) {
        content = (
            <div data-test={`${dataTest}-error`}>
                <p>
                    {i18n.t('Something went wrong when loading the data sets!')}
                </p>
                <p>{error.message}</p>
            </div>
        )
    } else {
        content = (
            <SelectableList
                name="dataSetPicker"
                label={i18n.t('Filter data sets by name')}
                selected={selected}
                select={onSelect}
                onSelectAll={onSelectAll}
                onClearAll={onClearAll}
                multiSelect={multiSelect}
                list={list}
                withFilter={withFilter}
                withActions={withActions}
                dataTest={`${dataTest}-list`}
            />
        )
    }

    return (
        <FormField label={i18n.t('Data sets')} dataTest={dataTest}>
            <div className={s.container}>{content}</div>
        </FormField>
    )
}

DataSetPicker.propTypes = {
    dataTest: PropTypes.string.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelected: PropTypes.func.isRequired,
    multiSelect: PropTypes.bool,
    withActions: PropTypes.bool,
    withFilter: PropTypes.bool,
}

export { DataSetPicker }
