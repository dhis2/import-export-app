import i18n from '@dhis2/d2-i18n'
import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField.js'
import { OU_MODE_MANUAL_VALUE } from '../../components/Inputs/index.js'
import { locationAssign, pathToId } from '../../utils/helper.js'

// calculate minimum set of parameters based on given filters
const valuesToParams = (
    {
        selectedOrgUnits,
        selectedUsers,
        selectedPrograms,
        selectedTETypes,
        ouMode,
        inclusion,
        format,
        includeDeleted,
        dataElementIdScheme,
        eventIdScheme,
        orgUnitIdScheme,
        idScheme,
        assignedUserModeFilter,
        assignedUserMode,
        teiTypeFilter,
        programStatus,
        followup,
        enrollmentEnrolledAfter,
        enrollmentEnrolledBefore,
        lastUpdatedFilter,
        updatedAfter,
        updatedBefore,
        updatedWithin,
    },
    filename
) => {
    const minParams = {
        ouMode: ouMode,
        format: format,
        includeDeleted: includeDeleted.toString(),
        dataElementIdScheme: dataElementIdScheme,
        eventIdScheme: eventIdScheme,
        orgUnitIdScheme: orgUnitIdScheme,
        idScheme: idScheme,
        attachment: filename,
        skipPaging: true
    }

    // include selected org.units only when manual selection is selected
    // ouMode is then stored in the `inclusion` field
    if (ouMode === OU_MODE_MANUAL_VALUE) {
        minParams.orgUnit = selectedOrgUnits.map((o) => pathToId(o)).join(';')
        minParams.ouMode = inclusion
    }

    if (assignedUserModeFilter) {
        minParams.assignedUserMode = assignedUserMode

        if (assignedUserMode == 'PROVIDED') {
            minParams.assignedUser = selectedUsers.join(';')
        }
    }

    if (teiTypeFilter == 'PROGRAM') {
        minParams.program = selectedPrograms
        if (programStatus) {
            // programStatus = ALL is now the same
            // as not providing a value for this param at all
            minParams.programStatus = programStatus
        }

        console.log('>>>>>', followup, minParams.followup)

        if(followup !== 'ALL') {
            minParams.followup = followup
        }

        if (enrollmentEnrolledAfter) {
            minParams.enrollmentEnrolledAfter = enrollmentEnrolledAfter
        }

        if (enrollmentEnrolledBefore) {
            minParams.enrollmentEnrolledBefore = enrollmentEnrolledBefore
        }
    }

    if (teiTypeFilter == 'TE') {
        minParams.trackedEntityType = selectedTETypes
    }

    if (lastUpdatedFilter == 'DATE') {
        if (updatedAfter) {
            minParams.updatedAfter = updatedAfter
        }

        if (updatedBefore) {
            minParams.updatedBefore = updatedBefore
        }
    }

    if (lastUpdatedFilter == 'DURATION') {
        minParams.updatedWithin = updatedWithin
    }

    return Object.keys(minParams)
        .map((param) => `${param}=${minParams[param]}`)
        .join('&')
}

const onExport = (baseUrl, setExportEnabled) => async (values) => {
    setExportEnabled(false)

    const { format } = values

    // generate URL and redirect
    const apiBaseUrl = `${baseUrl}/api/tracker/`
    const endpoint = `trackedEntities`
    const filename = `${endpoint}.${format}`
    const downloadUrlParams = valuesToParams(values, filename)
    const url = `${apiBaseUrl}${endpoint}.${format}?${downloadUrlParams}`
    locationAssign(url)
    setExportEnabled(true)

    // log for debugging purposes
    console.log('tei-export:', { url, params: downloadUrlParams })
}

const validate = (values) => {
    const errors = {}

    if (
        values.teiTypeFilter == 'PROGRAM' &&
        values.enrollmentEnrolledAfter &&
        values.enrollmentEnrolledBefore
    ) {
        errors.enrollmentEnrolledAfter = DATE_BEFORE_VALIDATOR(
            values.enrollmentEnrolledAfter,
            values.enrollmentEnrolledBefore
        )
        errors.enrollmentEnrolledBefore = DATE_AFTER_VALIDATOR(
            values.enrollmentEnrolledBefore,
            values.enrollmentEnrolledAfter
        )
    }

    if (
        values.lastUpdatedFilter == 'DATE' &&
        values.updatedAfter &&
        values.updatedBefore
    ) {
        errors.updatedAfter = DATE_BEFORE_VALIDATOR(
            values.updatedAfter,
            values.updatedBefore
        )
        errors.updatedBefore = DATE_AFTER_VALIDATOR(
            values.updatedBefore,
            values.updatedAfter
        )
    }

    if (
        values.lastUpdatedFilter == 'DATE' &&
        !values.updatedAfter &&
        !values.updatedBefore
    ) {
        errors.updatedBefore = i18n.t(
            "At least one of the 'last updated' date fields must be specified"
        )
    }

    return errors
}

export { onExport, validate }
