import { locationAssign, compressionToName } from '../../utils/helper'
import { getMimeType } from '../../utils/mime'
import i18n from '@dhis2/d2-i18n'

import { FORM_ERROR } from '../../utils/final-form'
import {
    createBlob,
    downloadBlob,
    jsDateToISO8601,
    pathToId,
} from '../../utils/helper'
import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField'

// calculate minimum set of parameters based on given filters
const valuesToParams = ({
    selectedOrgUnits,
    selectedUsers,
    selectedPrograms,
    selectedTETypes,
    ouMode,
    format,
    compression,
    includeDeleted,
    includeAllAttributes,
    dataElementIdScheme,
    eventIdScheme,
    orgUnitIdScheme,
    idScheme,
    assignedUserMode,
    teiTypeFilter,
    programStatus,
    followUpStatus,
    programStartDate,
    programEndDate,
    lastUpdatedFilter,
    lastUpdatedStartDate,
    lastUpdatedEndDate,
    lastUpdatedDuration,
}) => {
    const minParams = {
        ou: selectedOrgUnits.map(o => pathToId(o)).join(';'),
        ouMode: ouMode,
        format: format,
        includeDeleted: includeDeleted.toString(),
        includeAllAttributes: includeAllAttributes.toString(),
        dataElementIdScheme: dataElementIdScheme,
        eventIdScheme: eventIdScheme,
        orgUnitIdScheme: orgUnitIdScheme,
        idScheme: idScheme,
        assignedUserMode: assignedUserMode,
        download: 'true',
    }

    if (compression) {
        minParams.compression = compressionToName(compression)
    }

    if (assignedUserMode == 'PROVIDED') {
        minParams.assignedUser = selectedUsers.join(';')
    }

    if (teiTypeFilter == 'PROGRAM') {
        minParams.program = selectedPrograms
        if (programStatus) {
            // programStatus = ALL is now the same
            // as not providing a value for this param at all
            minParams.programStatus = programStatus
        }

        minParams.followUpStatus = followUpStatus

        if (programStartDate) {
            minParams.programStartDate = jsDateToISO8601(programStartDate)
        }

        if (programEndDate) {
            minParams.programEndDate = jsDateToISO8601(programEndDate)
        }
    }

    if (teiTypeFilter == 'TE') {
        minParams.trackedEntity = selectedTETypes
    }

    if (lastUpdatedFilter == 'DATE') {
        if (lastUpdatedStartDate) {
            minParams.lastUpdatedStartDate = jsDateToISO8601(
                lastUpdatedStartDate
            )
        }

        if (lastUpdatedEndDate) {
            minParams.lastUpdatedEndDate = jsDateToISO8601(lastUpdatedEndDate)
        }
    }

    if (lastUpdatedFilter == 'DURATION') {
        minParams.lastUpdatedDuration = lastUpdatedDuration
    }

    return Object.keys(minParams)
        .map(param => `${param}=${minParams[param]}`)
        .join('&')
}

const onExport = (baseUrl, setExportEnabled) => async values => {
    setExportEnabled(false)

    const { format, compression } = values

    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = `trackedEntityInstances`
    const endpointExtension = compression ? `${format}.${compression}` : format
    const downloadUrlParams = valuesToParams(values)
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`

    // if compression is set we can redirect to the appropriate URL
    // and set the compression parameter
    if (compression) {
        setTimeout(() => setExportEnabled(true), 5000)
        locationAssign(url)
        return
    }

    // fetch data and create blob
    try {
        const teis = await fetch(url, {
            Accept: getMimeType(format),
            credentials: 'include',
        })
        const teiStr = await teis.text()
        const filename = `trackedEntityInstances.${format}`
        const downloadUrl = createBlob(teiStr, format)
        downloadBlob(downloadUrl, filename)
    } catch (error) {
        const errors = [
            {
                id: `http-${new Date().getTime()}`,
                critical: true,
                message: `${i18n.t(
                    'HTTP error when fetching tracked entity instances'
                )}. ${error.message}`,
            },
        ]
        console.error('TEIExport onExport error: ', error)

        return { [FORM_ERROR]: errors }
    } finally {
        setExportEnabled(true)
    }
}

const validate = values => {
    const errors = {}

    if (
        values.teiTypeFilter == 'PROGRAM' &&
        values.programStartDate &&
        values.programEndDate
    ) {
        errors.programStartDate = DATE_BEFORE_VALIDATOR(
            values.programStartDate,
            values.programEndDate
        )
        errors.programEndDate = DATE_AFTER_VALIDATOR(
            values.programEndDate,
            values.programStartDate
        )
    }

    if (
        values.lastUpdatedFilter == 'DATE' &&
        values.lastUpdatedStartDate &&
        values.lastUpdatedEndDate
    ) {
        errors.lastUpdatedStartDate = DATE_BEFORE_VALIDATOR(
            values.lastUpdatedStartDate,
            values.lastUpdatedEndDate
        )
        errors.lastUpdatedEndDate = DATE_AFTER_VALIDATOR(
            values.lastUpdatedEndDate,
            values.lastUpdatedStartDate
        )
    }

    if (
        values.lastUpdatedFilter == 'DATE' &&
        !values.lastUpdatedStartDate &&
        !values.lastUpdatedEndDate
    ) {
        errors.lastUpdatedEndDate = i18n.t(
            "At least one of the 'last updated' date fields must be specified"
        )
    }

    return errors
}

export { onExport, validate }
