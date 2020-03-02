import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { CircularLoader } from '@dhis2/ui-core'

import { SelectableList } from '../SelectableList'
import { FormField } from '../FormField'

const programQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: 'id,displayName',
            paging: 'false',
        },
    },
}

const ProgramPicker = ({
    selected,
    setSelected,
    dataTest,
    multiSelect = true,
    withFilter = true,
    withActions = true,
    autoSelectFirst = false,
}) => {
    const [list, setList] = useState([])
    const [error, setError] = useState(undefined)
    const { loading } = useDataQuery(programQuery, {
        onComplete: data => {
            const programs = data.programs.programs
            const list = programs.map(({ id, displayName }) => ({
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
            console.error('ProgramPicker error: ', error)
        },
    })

    let content
    if (loading) {
        content = <CircularLoader dataTest={`${dataTest}-loading`} />
    } else if (error) {
        content = (
            <div data-test={`${dataTest}-error`}>
                <p>
                    {i18n.t('Something went wrong when loading the programs!')}
                </p>
                <p>{error.message}</p>
            </div>
        )
    } else {
        content = (
            <SelectableList
                name="programPicker"
                label={i18n.t('Filter programs by name')}
                selected={selected}
                setSelected={setSelected}
                multiSelect={multiSelect}
                list={list}
                withFilter={withFilter}
                withActions={withActions}
                dataTest={`${dataTest}-list`}
            />
        )
    }

    return (
        <FormField label={i18n.t('Programs')} dataTest={dataTest}>
            <div>{content}</div>
        </FormField>
    )
}

ProgramPicker.propTypes = {
    dataTest: PropTypes.string.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelected: PropTypes.func.isRequired,
    autoSelectFirst: PropTypes.bool,
    multiSelect: PropTypes.bool,
    withActions: PropTypes.bool,
    withFilter: PropTypes.bool,
}

export { ProgramPicker }
