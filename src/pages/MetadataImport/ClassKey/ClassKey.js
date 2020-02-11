import React, { useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { useDataQuery } from '@dhis2/app-runtime'

import { Select } from '../../../components/Select'

const classKeyQuery = {
    keys: {
        resource: 'metadata/csvImportClasses',
    },
}

const ClassKey = ({ prevValue, value, setValue, dataTest }) => {
    const [error, setError] = useState(undefined)
    const [classKeyOptions, setClassKeyOptions] = useState([])

    const { loading } = useDataQuery(classKeyQuery, {
        onComplete: classData => {
            setClassKeyOptions(
                classData.keys.map(k => ({ value: k, label: k }))
            )
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
            setError(error)
            console.error('ClassKey error: ', error)
        },
    })

    const validationText =
        error &&
        `${i18n.t('Something went wrong when loading the class keys')} : ${
            error.message
        }`

    return (
        <Select
            name="classKey"
            label={i18n.t('Class key')}
            options={classKeyOptions}
            selected={loading ? undefined : value}
            setValue={setValue}
            loading={loading}
            dataTest={dataTest}
            validationText={validationText}
            error={!!error}
            dense
        />
    )
}

ClassKey.propTypes = {
    dataTest: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    prevValue: PropTypes.object,
    value: PropTypes.object,
}

export { ClassKey }
