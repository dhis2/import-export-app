import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { useState, useEffect } from 'react'

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

const ALL_VALUE = 'ALL'
const ALL_LABEL = i18n.t('All program stages')

const useProgramStages = (program, setSelected) => {
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

        if (program) {
            engine.query(programStageQuery, {
                variables: {
                    id: program,
                },
                onComplete: (data) => {
                    const list = data.data.programStages
                    const formattedList = list.map((e) => ({
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
                    setSelected(ALL_VALUE)
                    setLoading(false)
                },
                onError: (error) => {
                    setError(error)
                    console.error('useProgramStages error: ', error)
                },
            })
        }
    }, [program])

    const validationText =
        error &&
        `${i18n.t('Something went wrong when loading the program stages')} : ${
            error.message
        }`

    return { loading, error, validationText, programStages: stages }
}

export { useProgramStages, ALL_VALUE }
