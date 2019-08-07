import urljoin from 'url-join'
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
    FORMAT_DEFAULT_VALUE,
    FORMAT_KEY,
    OPTION_ADX,
    OPTION_CSV,
    OPTION_JSON,
    OPTION_PDF,
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
import {
    PREHEAT_CACHE_DEFAULT_VALUE,
    PREHEAT_CACHE_KEY,
} from '../../../components/Inputs/PreheatCache'
import {
    SKIP_EXISTING_CHECK_DEFAULT_VALUE,
    SKIP_EXISTING_CHECK_KEY,
} from '../../../components/Inputs/SkipExistingCheck'
import {
    STRATEGY_DEFAULT_VALUE,
    STRATEGY_KEY,
} from '../../../components/Inputs/Strategy'
import { getParamsFromFormState } from '../../../helpers/form'
import { getUploadXHR } from '../../../helpers/xhr'

export const supportedFormats = [
    OPTION_JSON,
    OPTION_XML,
    OPTION_ADX,
    OPTION_PDF,
    OPTION_CSV,
]

export const defaultValues = {
    [FORMAT_KEY]: FORMAT_DEFAULT_VALUE,
    [DRY_RUN_KEY]: DRY_RUN_DEFAULT_VALUE,
    [STRATEGY_KEY]: STRATEGY_DEFAULT_VALUE,
    [PREHEAT_CACHE_KEY]: PREHEAT_CACHE_DEFAULT_VALUE,
    [DATA_ELEMENT_ID_SCHEME_KEY]: DATA_ELEMENT_ID_SCHEME_DEFAULT_VALUE,
    [ORG_UNIT_ID_SCHEME_KEY]: ORG_UNIT_ID_SCHEME_DEFAULT_VALUE,
    [ID_SCHEME_KEY]: ID_SCHEME_DEFAULT_VALUE,
    [SKIP_EXISTING_CHECK_KEY]: SKIP_EXISTING_CHECK_DEFAULT_VALUE,
}

export const onSubmit = (setLoading, setError) => (values, ...rest) => {
    try {
        const { upload, format, firstRowIsHeader } = values
        const append = [`format=${format}`, 'async=true']

        if (format === 'csv') {
            append.push(`firstRowIsHeader=${firstRowIsHeader}`)
        }

        const params = getParamsFromFormState(
            values,
            [
                'dataElementIdScheme',
                'dryRun',
                'idScheme',
                'orgUnitIdScheme',
                'preheatCache',
                'skipExistingCheck',
                'strategy',
            ],
            append
        )

        setLoading(true)

        const { REACT_APP_DHIS2_BASE_URL } = process.env
        const url = urljoin(
            REACT_APP_DHIS2_BASE_URL,
            'api/dataValueSets.json?',
            params
        )
        const xhr = getUploadXHR(
            url,
            upload,
            'DATAVALUE_IMPORT',
            () => setLoading(false),
            setError,
            format
        )

        xhr.send(upload)
    } catch (e) {
        console.error(e)

        setError({
            target: {
                response: {
                    message: i18n.t(
                        'An unknown error occurred. Please try again later'
                    ),
                },
            },
        })
    }
}
