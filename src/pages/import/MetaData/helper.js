import {
    OPTION_CSV,
    OPTION_JSON,
    OPTION_XML,
} from '../../../components/Inputs/Format'
import { getParamsFromFormState } from '../../../helpers/form'
import { getUploadXHR } from '../../../helpers/xhr'

export const supportedFormats = [OPTION_JSON, OPTION_XML, OPTION_CSV]

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

        if (format === '.csv') {
            append = [
                ...append,
                `classKey=${classKey}`,
                `firstRowIsHeader=${firstRowIsHeader}`,
            ]
        }

        append.push('format=json')

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
            setError,
            format
        )
        xhr.send(upload)
    } catch (e) {
        setError({
            target: {
                response: JSON.stringify({
                    message: 'MetaData Import error',
                }),
            },
        })
        setLoading(false)
    }
}
