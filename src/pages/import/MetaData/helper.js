import { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'

import {
    ASYNC_DEFAULT_VALUE,
    ASYNC_KEY,
} from '../../../components/Inputs/Async'
import {
    ATOMIC_MODE_DEFAULT_VALUE,
    ATOMIC_MODE_KEY,
} from '../../../components/Inputs/AtomicMode'
import {
    FLUSH_MODE_DEFAULT_VALUE,
    FLUSH_MODE_KEY,
} from '../../../components/Inputs/FlushMode'
import {
    FORMAT_DEFAULT_VALUE,
    FORMAT_KEY,
    OPTION_CSV,
    OPTION_JSON,
    OPTION_XML,
} from '../../../components/Inputs/Format'
import {
    IDENTIFIER_DEFAULT_VALUE,
    IDENTIFIER_KEY,
} from '../../../components/Inputs/Identifier'
import {
    IMPORT_MODE_DEFAULT_VALUE,
    IMPORT_MODE_KEY,
} from '../../../components/Inputs/ImportMode'
import {
    IMPORT_REPORT_MODE_DEFAULT_VALUE,
    IMPORT_REPORT_MODE_KEY,
} from '../../../components/Inputs/ImportReportMode'
import {
    IMPORT_STRATEGY_DEFAULT_VALUE,
    IMPORT_STRATEGY_KEY,
} from '../../../components/Inputs/ImportStrategy'
import {
    INCLUSION_STRATEGY_DEFAULT_VALUE,
    INCLUSION_STRATEGY_KEY,
} from '../../../components/Inputs/InclusionStrategy'
import {
    MERGE_MODE_DEFAULT_VALUE,
    MERGE_MODE_KEY,
} from '../../../components/Inputs/MergeMode'
import {
    PREHEAT_MODE_DEFAULT_VALUE,
    PREHEAT_MODE_KEY,
} from '../../../components/Inputs/PreheatMode'
import {
    SKIP_SHARING_DEFAULT_VALUE,
    SKIP_SHARING_KEY,
} from '../../../components/Inputs/SkipSharing'
import {
    SKIP_VALIDATION_DEFAULT_VALUE,
    SKIP_VALIDATION_KEY,
} from '../../../components/Inputs/SkipValidation'
import { api, eventEmitter } from '../../../services'
import { fetchLog } from '../helpers'
import { getParamsFromFormState } from '../../../helpers/form'
import { getUploadXHR } from '../../../helpers/xhr'
import { isProduction } from '../../../helpers/env'

export const supportedFormats = [OPTION_JSON, OPTION_XML, OPTION_CSV]

export const defaultValues = {
    [FORMAT_KEY]: FORMAT_DEFAULT_VALUE,
    [IMPORT_MODE_KEY]: IMPORT_MODE_DEFAULT_VALUE,
    [IDENTIFIER_KEY]: IDENTIFIER_DEFAULT_VALUE,
    [IMPORT_REPORT_MODE_KEY]: IMPORT_REPORT_MODE_DEFAULT_VALUE,
    [PREHEAT_MODE_KEY]: PREHEAT_MODE_DEFAULT_VALUE,
    [IMPORT_STRATEGY_KEY]: IMPORT_STRATEGY_DEFAULT_VALUE,
    [ATOMIC_MODE_KEY]: ATOMIC_MODE_DEFAULT_VALUE,
    [MERGE_MODE_KEY]: MERGE_MODE_DEFAULT_VALUE,
    [FLUSH_MODE_KEY]: FLUSH_MODE_DEFAULT_VALUE,
    [SKIP_SHARING_KEY]: SKIP_SHARING_DEFAULT_VALUE,
    [SKIP_VALIDATION_KEY]: SKIP_VALIDATION_DEFAULT_VALUE,
    [ASYNC_KEY]: ASYNC_DEFAULT_VALUE,
    [INCLUSION_STRATEGY_KEY]: INCLUSION_STRATEGY_DEFAULT_VALUE,
}

export const onSubmit = (setLoading, setError) => values => {
    try {
        let append = []
        const formData = new FormData()
        const { upload, format, classKey, firstRowIsHeader } = values

        if (!upload) {
            return setError({
                target: {
                    response: JSON.stringify({
                        message: 'Upload field is required',
                    }),
                },
            })
        }

        formData.set('upload', upload)

        if (format === 'csv') {
            append = [
                ...append,
                `classKey=${classKey}`,
                `firstRowIsHeader=${firstRowIsHeader}`,
            ]
        }

        append.push(`format=${format}`)

        const params = getParamsFromFormState(
            values,
            [
                'importMode',
                'dryRun',
                'identifier',
                'importReportMode',
                'preheatMode',
                'importStrategy',
                'atomicMode',
                'mergeMode',
                'flushMode',
                'skipSharing',
                'skipValidation',
                'async',
                'inclusionStrategy',
            ],
            append
        )

        setLoading(true)

        const { REACT_APP_DHIS2_BASE_URL } = process.env
        const url = `${REACT_APP_DHIS2_BASE_URL}/api/metadata.json?${params}`
        const xhr = getUploadXHR(
            url,
            upload,
            'METADATA_IMPORT',
            () => setLoading(false),
            e => {
                let message = i18n.t('An unknown error occurred')

                try {
                    const response = JSON.parse(e.target.response)
                    message = response.message
                } catch (e2) {}

                setError(message)
                setLoading(false)
            },
            format
        )
        xhr.send(upload)
    } catch (e) {
        setError('MetaData Import error')
        setLoading(false)
    }
}

export const useLoadClassKeyOptions = () => {
    const [options, setOptions] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        fetchLog('', 'METADATA_IMPORT').then(() => {
            eventEmitter.emit('summary.clear')
            fetchClassKeyOptions(setOptions, setError)
        })
    }, [])

    return { error, options }
}

export const fetchClassKeyOptions = async (setOptions, setError) => {
    try {
        const { data } = await api.get('metadata/csvImportClasses')
        const options = data.map(v => ({
            value: v,
            label: v.split('_').join(' '),
        }))

        setOptions(options)
    } catch (e) {
        !isProduction && console.log('fetch csvImportClasses failed')
        !isProduction && console.log(e)
    }

    setError(i18n.t("Couldn't load classKey options"))
}
