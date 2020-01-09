import JSZip from 'jszip'
import i18n from '@dhis2/d2-i18n'
import moment from 'moment'

import {
    CHILDREN_DEFAULT_VALUE,
    CHILDREN_KEY,
} from '../../../components/Inputs/Children'
import {
    COMPRESSION_DEFAULT_VALUE,
    COMPRESSION_KEY,
} from '../../../components/Inputs/Compression'
import {
    DATA_ELEMENT_ID_SCHEME_DEFAULT_VALUE,
    DATA_ELEMENT_ID_SCHEME_KEY,
} from '../../../components/Inputs/DataElementIdScheme'
import {
    DATA_SETS_KEY,
    DATA_SETS_DEFAULT_VALUE,
} from '../../../components/Inputs/DataSets'
import {
    END_DATE_KEY,
    END_DATE_DEFAULT_VALUE,
} from '../../../components/Inputs/EndDate'
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
    INCLUDE_DELETED_DEFAULT_VALUE,
    INCLUDE_DELETED_KEY,
} from '../../../components/Inputs/IncludeDeleted'
import {
    ORG_UNIT_DEFAULT_VALUE,
    ORG_UNIT_KEY,
} from '../../../components/Inputs/OrgUnit'
import {
    ORG_UNIT_ID_SCHEME_DEFAULT_VALUE,
    ORG_UNIT_ID_SCHEME_KEY,
} from '../../../components/Inputs/OrgUnitIdScheme'
import {
    START_DATE_KEY,
    START_DATE_DEFAULT_VALUE,
} from '../../../components/Inputs/StartDate'
import { createBlob, downloadBlob } from '../../../helpers/download'
import { getParamsFromFormState } from '../../../helpers/form'
import { isProduction } from '../../../helpers/env'
import { getApi } from '../../../helpers/api'

export const supportedFormats = [OPTION_JSON, OPTION_XML, OPTION_CSV]

export const initialValues = {
    [ORG_UNIT_KEY]: ORG_UNIT_DEFAULT_VALUE,
    [CHILDREN_KEY]: CHILDREN_DEFAULT_VALUE,
    [DATA_SETS_KEY]: DATA_SETS_DEFAULT_VALUE,
    [FORMAT_KEY]: FORMAT_DEFAULT_VALUE,
    [COMPRESSION_KEY]: COMPRESSION_DEFAULT_VALUE,
    [DATA_ELEMENT_ID_SCHEME_KEY]: DATA_ELEMENT_ID_SCHEME_DEFAULT_VALUE,
    [ORG_UNIT_ID_SCHEME_KEY]: ORG_UNIT_ID_SCHEME_DEFAULT_VALUE,
    [ID_SCHEME_KEY]: ID_SCHEME_DEFAULT_VALUE,
    [START_DATE_KEY]: START_DATE_DEFAULT_VALUE,
    [END_DATE_KEY]: END_DATE_DEFAULT_VALUE,
    [INCLUDE_DELETED_KEY]: INCLUDE_DELETED_DEFAULT_VALUE,
}

export const onSubmit = (setLoading, setError) => async values => {
    try {
        const {
            orgUnit,
            startDate,
            endDate,
            format,
            compression,
            selectedDataSets,
        } = values

        if (orgUnit.length === 0 || selectedDataSets.length === 0) {
            return
        }

        const append = []
        append.push(`startDate=${moment(startDate).format('YYYY-MM-DD')}`)
        append.push(`endDate=${moment(endDate).format('YYYY-MM-DD')}`)

        orgUnit.forEach(v => {
            append.push(`orgUnit=${v.substr(v.lastIndexOf('/') + 1)}`)
        })

        selectedDataSets.forEach(v => {
            append.push(`dataSet=${v}`)
        })

        const params = getParamsFromFormState(
            values,
            [
                'dataElementIdScheme',
                'orgUnitIdScheme',
                'includeDeleted',
                'children',
                'idScheme',
            ],
            append
        )

        setLoading(true)

        const { baseUrl } = await getApi()
        const endpoint = 'dataValueSets'
        const url = `${baseUrl}${endpoint}.${format}?${params}`

        const xhr = new XMLHttpRequest()
        xhr.withCredentials = true
        xhr.open('GET', url, true)
        xhr.onreadystatechange = async () => {
            if (xhr.readyState === 4 && Math.floor(xhr.status / 100) === 2) {
                setLoading(false)

                const filename = `data.${format}`
                if (compression) {
                    const zip = new JSZip()
                    zip.file(filename, xhr.responseText)
                    zip.generateAsync({ type: 'blob' }).then(content => {
                        const url = URL.createObjectURL(content)
                        downloadBlob(url, `${filename}.${compression}`)
                    })
                } else {
                    const url = createBlob(xhr.responseText, format)
                    downloadBlob(url, filename)
                }
            }
        }
        xhr.send()
    } catch (e) {
        !isProduction && console.error(e)

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
