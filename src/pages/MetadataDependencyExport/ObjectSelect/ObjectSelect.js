import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDataEngine } from '@dhis2/app-runtime'

import { optionPropType } from '../../../utils/options'
import { Select } from '../../../components/Select'

const listQuery = resource => ({
    data: {
        resource: resource,
        fields: 'id,displayName',
        params: {
            paging: 'false',
        },
    },
})

const ObjectSelect = ({
    name,
    label,
    type,
    setSelected,
    selected,
    dataTest,
    filterable,
}) => {
    const engine = useDataEngine()
    const [loading, setLoading] = useState(true)
    const [objectList, setObjectList] = useState([])

    useEffect(() => {
        setLoading(true)
        setSelected(undefined)
        const fetcher = async () => {
            await engine.query(listQuery(type.value), {
                onComplete: data => {
                    const list = data.data[type.value]
                    const formattedList = list.map(e => ({
                        value: e.id,
                        label: e.displayName,
                    }))
                    setObjectList(formattedList)
                    setSelected(formattedList[0])
                    setLoading(false)
                },
                onError: e => {
                    console.error('ObjectSelect error: ', e)
                },
            })
        }
        fetcher()
    }, [type])

    return (
        <Select
            loading={loading}
            name={name}
            label={label}
            options={objectList}
            selected={selected}
            setValue={setSelected}
            filterable={filterable}
            dense
            dataTest={dataTest}
        />
    )
}

ObjectSelect.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
    type: optionPropType.isRequired,
    filterable: PropTypes.bool,
    selected: optionPropType,
}

export { ObjectSelect }
