import { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { useDataQuery } from '@dhis2/app-runtime'

const classKeyQuery = {
    keys: {
        resource: 'metadata/csvImportClasses',
    },
}

const useClassKeys = (value, setValue, prevValue) => {
    const [classKeys, setClassKeys] = useState([])

    const { loading, error } = useDataQuery(classKeyQuery, {
        onComplete: classData => {
            setClassKeys(classData.keys.map(k => ({ value: k, label: k })))
            if (prevValue && !value) {
                setValue(prevValue)
            } else if (!value) {
                setValue({
                    value: classData.keys[0],
                    label: classData.keys[0],
                })
            }
        },
        onError: error => {
            console.error('useClassKeys error: ', error)
        },
    })

    const validationText =
        error &&
        `${i18n.t('Something went wrong when loading the class keys')} : ${
            error.message
        }`

    return { loading, error, validationText, classKeys }
}

export { useClassKeys }
