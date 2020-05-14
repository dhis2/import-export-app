import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { CircularLoader, Help } from '@dhis2/ui-core'

import { FormField, SelectableList } from '../'

const teTypeQuery = {
    teTypes: {
        resource: 'trackedEntityTypes',
        params: {
            fields: 'id,displayName',
            paging: 'false',
        },
    },
}

const TETypePicker = ({
    label,
    selected,
    setSelected,
    meta,
    dataTest,
    multiSelect,
    withFilter,
    withActions,
    autoSelectFirst,
}) => {
    const [list, setList] = useState([])
    const { error, loading } = useDataQuery(teTypeQuery, {
        onComplete: data => {
            const teTypes = data.teTypes.trackedEntityTypes
            const list = teTypes.map(({ id, displayName }) => ({
                value: id,
                label: displayName,
            }))
            setList(list)

            if (autoSelectFirst) {
                setSelected([list[0].value])
            }
        },
        onError: error => {
            console.error('TETypePicker error: ', error)
        },
    })

    const showList = !loading && !error

    return (
        <FormField label={label} dataTest={dataTest}>
            {loading && <CircularLoader dataTest={`${dataTest}-loading`} />}
            {error && (
                <div data-test={`${dataTest}-error`}>
                    <p>
                        {i18n.t(
                            'Something went wrong when loading the tracked entity types!'
                        )}
                    </p>
                    <p>{error.message}</p>
                </div>
            )}
            {showList && (
                <SelectableList
                    name="teTypePicker"
                    label={i18n.t('Filter tracked entity types by name')}
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

TETypePicker.defaultProps = {
    multiSelect: false,
    withFilter: true,
    withActions: false,
    autoSelectFirst: true,
}

TETypePicker.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelected: PropTypes.func.isRequired,
    autoSelectFirst: PropTypes.bool,
    multiSelect: PropTypes.bool,
    withActions: PropTypes.bool,
    withFilter: PropTypes.bool,
}

export { TETypePicker }
