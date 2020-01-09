import moment from 'moment/moment'

import {
    COMPRESSION_DEFAULT_VALUE,
    COMPRESSION_KEY,
} from '../../../components/Inputs/Compression'
import {
    END_DATE_DEFAULT_VALUE,
    END_DATE_KEY,
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
    INCLUSION_DEFAULT_VALUE,
    INCLUSION_KEY,
} from '../../../components/Inputs/Inclusion'
import {
    ORG_UNIT_DEFAULT_VALUE,
    ORG_UNIT_KEY,
} from '../../../components/Inputs/OrgUnit'
import {
    PROGRAMS_DEFAULT_VALUE,
    PROGRAMS_KEY,
} from '../../../components/Inputs/Programs'
import {
    PROGRAM_STAGES_DEFAULT_VALUE,
    PROGRAM_STAGES_KEY,
} from '../../../components/Inputs/ProgramStages'
import {
    START_DATE_DEFAULT_VALUE,
    START_DATE_KEY,
} from '../../../components/Inputs/StartDate'
import { download } from '../../../helpers/url'
import { getApi } from '../../../helpers/api'
import { getParamsFromFormState } from '../../../helpers/form'

export const supportedFormats = [OPTION_JSON, OPTION_XML, OPTION_CSV]

export const initialValues = {
    [ORG_UNIT_KEY]: ORG_UNIT_DEFAULT_VALUE,
    [PROGRAMS_KEY]: PROGRAMS_DEFAULT_VALUE,
    [PROGRAM_STAGES_KEY]: PROGRAM_STAGES_DEFAULT_VALUE,
    [ID_SCHEME_KEY]: ID_SCHEME_DEFAULT_VALUE,
    [START_DATE_KEY]: START_DATE_DEFAULT_VALUE,
    [END_DATE_KEY]: END_DATE_DEFAULT_VALUE,
    [FORMAT_KEY]: FORMAT_DEFAULT_VALUE,
    [COMPRESSION_KEY]: COMPRESSION_DEFAULT_VALUE,
    [INCLUDE_DELETED_KEY]: INCLUDE_DELETED_DEFAULT_VALUE,
    [INCLUSION_KEY]: INCLUSION_DEFAULT_VALUE,
}

export const onSubmit = async values => {
    const {
        orgUnit,
        startDate,
        endDate,
        programStages,
        inclusion,
        format,
        compression,
    } = values

    let attachment = `events.${format}`

    if (compression) {
        attachment += `.${compression}`
    }

    const append = []

    if (programStages) {
        append.push(`programStage=${programStages}`)
    }

    if (orgUnit.length > 0) {
        const path = orgUnit[0]
        const orgUnitId = path.substr(path.lastIndexOf('/') + 1)
        append.push(`orgUnit=${orgUnitId}`)
    }

    append.push('links=false')
    append.push('skipPaging=true')
    append.push(`attachment=${attachment}`)
    append.push('startDate=' + moment(startDate).format('YYYY-MM-DD'))
    append.push('endDate=' + moment(endDate).format('YYYY-MM-DD'))
    append.push(`ouMode=${inclusion.toUpperCase()}`)
    append.push(`format=${format}`)

    let path = `events.${format}`
    if (compression) {
        path += `.${compression}`
    }

    const params = getParamsFromFormState(
        values,
        ['programs', 'includeDeleted', 'idScheme'],
        append
    )

    const api = await getApi()
    const url = `${api.baseUrl}${path}?${params}`

    download(url)
}
