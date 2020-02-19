import React, { useState, useEffect } from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { useDataEngine } from '@dhis2/app-runtime'

import { optionPropType } from '../../../utils/options'
import { Select } from '../../../components/Select'

const programStageQuery = {
    data: {
        resource: 'programs',
        fields: 'id,displayName',
        id: ({ id }) => `${id}`,
        params: {
            fields: 'programStages[id,displayName]',
            paging: 'false',
        },
    },
}

const ALL_VALUE = ''
const ALL_LABEL = i18n.t('[ All program stages ]')

const ProgramStageSelect = ({
    name,
    label,
    program,
    setSelected,
    selected,
    dataTest,
}) => {
    const engine = useDataEngine()
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [stages, setStages] = useState([])

    useEffect(() => {
        if (program) {
            setLoading(true)
            setSelected(undefined)
        } else {
            setLoading(false)
        }
        const fetcher = async () => {
            await engine.query(programStageQuery, {
                variables: {
                    id: program,
                },
                onComplete: data => {
                    const list = data.data.programStages
                    const formattedList = list.map(e => ({
                        value: e.id,
                        label: e.displayName,
                    }))
                    setStages([
                        {
                            value: ALL_VALUE,
                            label: ALL_LABEL,
                        },
                        ...formattedList,
                    ])
                    setSelected({ value: ALL_VALUE, label: ALL_LABEL })
                    setLoading(false)
                },
                onError: error => {
                    setError(error)
                    console.error('ProgramStageSelect error: ', error)
                },
            })
        }
        if (program) {
            fetcher()
        }
    }, [program])

    const validationText =
        error &&
        `${i18n.t('Something went wrong when loading the program stages')} : ${
            error.message
        }`

    return (
        <Select
            loading={loading}
            name={name}
            label={label}
            options={stages}
            selected={selected}
            setValue={setSelected}
            dataTest={dataTest}
            validationText={validationText}
            error={!!error}
            dense
        />
    )
}

ProgramStageSelect.propTypes = {
    dataTest: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
    program: PropTypes.string,
    selected: optionPropType,
}

export { ProgramStageSelect, ALL_VALUE }
