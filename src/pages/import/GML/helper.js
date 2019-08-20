import i18n from '@dhis2/d2-i18n'

import {
    DRY_RUN_DEFAULT_VALUE,
    DRY_RUN_KEY,
} from '../../../components/Inputs/DryRun'
import { getUploadXHR } from '../../../helpers'
import { isProduction } from '../../../helpers/env'

export const defaultValues = {
    [DRY_RUN_KEY]: DRY_RUN_DEFAULT_VALUE,
}

export const onSubmit = (setLoading, setError) => values => {
    try {
        const { upload, dryRun } = values

        const formData = new FormData()
        formData.set('upload', upload)

        setLoading(true)

        const params = `dryRun=${dryRun}&format=json`
        const { REACT_APP_DHIS2_BASE_URL } = process.env
        const url = `${REACT_APP_DHIS2_BASE_URL}/api/metadata/gml?${params}`
        const xhr = getUploadXHR(
            url,
            upload,
            'GML_IMPORT',
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
            'gml'
        )
        xhr.send(upload)
    } catch (e) {
        !isProduction && console.log('GML Import error', e, '\n')
        setError('GML Import error')
        setLoading(false)
    }
}
