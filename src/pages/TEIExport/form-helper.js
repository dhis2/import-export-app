import i18n from '@dhis2/d2-i18n'
import JSZip from 'jszip'

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
const minimizeParams = ({
    selectedOrgUnits,
    selectedUsers,
    selectedPrograms,
    selectedTETypes,
    ouMode,
    format,
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
        ouMode: ouMode.value,
        format: format.value,
        includeDeleted: includeDeleted.toString(),
        includeAllAttributes: includeAllAttributes.toString(),
        dataElementIdScheme: dataElementIdScheme.value,
        eventIdScheme: eventIdScheme.value,
        orgUnitIdScheme: orgUnitIdScheme.value,
        idScheme: idScheme.value,
        assignedUserMode: assignedUserMode.value,
    }

    if (assignedUserMode.value == 'PROVIDED') {
        minParams.assignedUser = selectedUsers.join(';')
    }

    if (teiTypeFilter.value == 'PROGRAM') {
        minParams.program = selectedPrograms[0]
        if (minParams.programStatus) {
            // programStatus = ALL is now the same
            // as not providing a value for this param at all
            minParams.programStatus = programStatus.value
        }
        minParams.followUpStatus = followUpStatus.value

        if (programStartDate) {
            minParams.programStartDate = jsDateToISO8601(programStartDate)
        }

        if (programEndDate) {
            minParams.programEndDate = jsDateToISO8601(programEndDate)
        }
    }

    if (teiTypeFilter.value == 'TE') {
        minParams.trackedEntity = selectedTETypes[0]
    }

    if (lastUpdatedFilter.value == 'DATE') {
        if (lastUpdatedStartDate) {
            minParams.lastUpdatedStartDate = jsDateToISO8601(
                lastUpdatedStartDate
            )
        }

        if (lastUpdatedEndDate) {
            minParams.lastUpdatedEndDate = jsDateToISO8601(lastUpdatedEndDate)
        }
    }

    if (lastUpdatedFilter.value == 'DURATION') {
        minParams.lastUpdatedDuration = lastUpdatedDuration
    }

    return minParams
}

const teiQuery = {
    sets: {
        resource: 'trackedEntityInstances',
        params: x => x,
    },
}

const onExport = engine => async values => {
    const { format, compression } = values

    // fetch data
    try {
        const { sets: teis } = await engine.query(teiQuery, {
            variables: minimizeParams(values),
        })

        const teiStr = format.value === 'json' ? JSON.stringify(teis) : teis
        const filename = `trackedEntityInstances.${format.value}`
        if (compression.value !== '') {
            const zip = new JSZip()
            zip.file(filename, teiStr)
            zip.generateAsync({ type: 'blob' }).then(content => {
                const url = URL.createObjectURL(content)
                downloadBlob(url, `${filename}.${compression.value}`)
            })
        } else {
            const url = createBlob(teiStr, format.value)
            downloadBlob(url, filename)
        }
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
    }
}

const validate = values => {
    const errors = {}

    if (
        values.teiTypeFilter.value == 'PROGRAM' &&
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
        values.lastUpdatedFilter.value == 'DATE' &&
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
        values.lastUpdatedFilter.value == 'DATE' &&
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
