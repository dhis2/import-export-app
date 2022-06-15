import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { useState, useEffect } from 'react'

const listQuery = (resource) => ({
    data: {
        resource: resource,
        fields: 'id,displayName',
        params: {
            paging: 'false',
        },
    },
})

const useObjects = (type, setSelected) => {
    const engine = useDataEngine()
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [objects, setObjects] = useState([])

    useEffect(() => {
        setLoading(true)
        setSelected(undefined)
        engine.query(listQuery(type), {
            onComplete: (data) => {
                const list = data.data[type]
                const formattedList = list.map((e) => ({
                    value: e.id,
                    label: e.displayName,
                }))
                setObjects(formattedList)
                setSelected(formattedList[0].value)
                setLoading(false)
            },
            onError: (error) => {
                setError(error)
                console.error('useObjects error: ', error)
            },
        })
    }, [type])

    const validationText =
        error &&
        `${i18n.t('Something went wrong when loading the objects')} : ${
            error.message
        }`

    return { loading, error, validationText, objects }
}

export { useObjects }
