import i18n from '@dhis2/d2-i18n'

import {
    DATA_ELEMENT_ID_SCHEME_DEFAULT_VALUE,
    DATA_ELEMENT_ID_SCHEME_KEY,
} from '../../../components/Inputs/DataElementIdScheme'
import {
    DRY_RUN_DEFAULT_VALUE,
    DRY_RUN_KEY,
} from '../../../components/Inputs/DryRun'
import {
    EVENT_ID_SCHEME_DEFAULT_VALUE,
    EVENT_ID_SCHEME_KEY,
} from '../../../components/Inputs/EventIdScheme'
import {
    FORMAT_DEFAULT_VALUE,
    FORMAT_KEY,
    OPTION_CSV,
    OPTION_JSON,
    OPTION_XML,
} from '../../../components/Inputs/Format'
import {
    ID_SCHEME_DEFAULT_VALUE,
    ID_SCHEME_KEY,
} from '../../../components/Inputs/idScheme'
import {
    ORG_UNIT_ID_SCHEME_DEFAULT_VALUE,
    ORG_UNIT_ID_SCHEME_KEY,
} from '../../../components/Inputs/OrgUnitIdScheme'
import { getParamsFromFormState, getUploadXHR } from '../../../helpers'
import { isProduction } from '../../../helpers/env'

export const supportedFormats = [OPTION_JSON, OPTION_XML, OPTION_CSV]

export const defaultValues = {
    [DATA_ELEMENT_ID_SCHEME_KEY]: DATA_ELEMENT_ID_SCHEME_DEFAULT_VALUE,
    [DRY_RUN_KEY]: DRY_RUN_DEFAULT_VALUE,
    [EVENT_ID_SCHEME_KEY]: EVENT_ID_SCHEME_DEFAULT_VALUE,
    [FORMAT_KEY]: FORMAT_DEFAULT_VALUE,
    [ID_SCHEME_KEY]: ID_SCHEME_DEFAULT_VALUE,
    [ORG_UNIT_ID_SCHEME_KEY]: ORG_UNIT_ID_SCHEME_DEFAULT_VALUE,
}

export const onSubmit = (setLoading, setError) => values => {
    try {
        const { upload, format } = values

        const params = getParamsFromFormState(
            values,
            [
                DRY_RUN_KEY,
                EVENT_ID_SCHEME_KEY,
                ORG_UNIT_ID_SCHEME_KEY,
                DATA_ELEMENT_ID_SCHEME_KEY,
                ID_SCHEME_KEY,
            ],
            ['async=true', 'skipFirst=true', `payloadFormat=${format}`]
        )
        setLoading(true)

        const { REACT_APP_DHIS2_BASE_URL } = process.env
        const url = `${REACT_APP_DHIS2_BASE_URL}/api/events.json?${params}`
        const xhr = getUploadXHR(
            url,
            upload,
            'EVENT_IMPORT',
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
        !isProduction && console.log('Event Import error', e, '\n')
        setError('MetaData Import error')
        setLoading(false)
    }
}
