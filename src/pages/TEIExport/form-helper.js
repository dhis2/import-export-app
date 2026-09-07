import i18n from '@dhis2/d2-i18n'
import {
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker/DatePickerField.jsx'
import { OU_MODE_MANUAL_VALUE } from '../../components/Inputs/index.js'
import { fetchAndDownload, pathToId } from '../../utils/helper.js'
import { idSchemeEntries } from '../../utils/idSchemeParams.js'

// keep only the entries whose value is truthy
const compact = (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([, value]) => value))

// selected org units are sent only for manual selection; the mode then comes
// from the `inclusion` field
const orgUnitParams = ({ orgUnitMode, inclusion, selectedOrgUnits }) =>
    orgUnitMode === OU_MODE_MANUAL_VALUE
        ? {
              orgUnits: selectedOrgUnits.map((o) => pathToId(o)).join(','),
              orgUnitMode: inclusion,
          }
        : {}

const assignedUserParams = ({
    assignedUserModeFilter,
    assignedUserMode,
    selectedUsers,
}) => {
    if (!assignedUserModeFilter) {
        return {}
    }
    return {
        assignedUserMode,
        ...(assignedUserMode === 'PROVIDED'
            ? { assignedUsers: selectedUsers.join(',') }
            : {}),
    }
}

const programFilterParams = (values) => {
    if (values.teiTypeFilter !== 'PROGRAM') {
        return {}
    }
    const {
        selectedPrograms,
        programStatus,
        followUp,
        enrollmentEnrolledAfter,
        enrollmentEnrolledBefore,
    } = values
    return {
        program: selectedPrograms,
        // programStatus/followUp = ALL means "omit the param"
        ...compact({
            programStatus,
            followUp: followUp === 'ALL' ? '' : followUp,
            enrollmentEnrolledAfter,
            enrollmentEnrolledBefore,
        }),
    }
}

const lastUpdatedParams = ({
    lastUpdatedFilter,
    updatedAfter,
    updatedBefore,
    updatedWithin,
}) => {
    if (lastUpdatedFilter === 'DATE') {
        return compact({ updatedAfter, updatedBefore })
    }
    if (lastUpdatedFilter === 'DURATION') {
        return { updatedWithin }
    }
    return {}
}

// calculate minimum set of parameters based on given filters
const valuesToParams = (values) => {
    const {
        orgUnitMode,
        format,
        includeDeleted,
        teiTypeFilter,
        selectedTETypes,
    } = values

    const minParams = {
        fields: '*,enrollments[*,events[*]]',
        orgUnitMode,
        format,
        includeDeleted: includeDeleted.toString(),
        paging: false,
        totalPages: false,
        ...Object.fromEntries(idSchemeEntries(values, 'tracker')),
        ...orgUnitParams(values),
        ...assignedUserParams(values),
        ...programFilterParams(values),
        ...(teiTypeFilter === 'TE'
            ? { trackedEntityType: selectedTETypes }
            : {}),
        ...lastUpdatedParams(values),
    }

    return Object.entries(minParams)
        .map(([param, value]) => `${param}=${value}`)
        .join('&')
}

const onExport = (baseUrl, setExportEnabled) => async (values) => {
    setExportEnabled(false)

    const { format } = values

    // generate URL and redirect
    const apiBaseUrl = `${baseUrl}/api/tracker/`
    const endpoint = `trackedEntities`
    const downloadUrlParams = valuesToParams(values)
    const url = `${apiBaseUrl}${endpoint}.${format}?${downloadUrlParams}`

    try {
        return await fetchAndDownload(url, 'tei')
    } finally {
        setExportEnabled(true)

        // log for debugging purposes
        console.log('tei-export:', { url, params: downloadUrlParams })
    }
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

export { onExport, validate, valuesToParams }
