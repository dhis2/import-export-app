import { valuesToParams } from './form-helper.js'

const paramMap = (query) =>
    Object.fromEntries(query.split('&').map((pair) => pair.split('=')))

const baseValues = {
    selectedOrgUnits: ['/ImspTQPwCqd'],
    selectedUsers: [],
    selectedPrograms: 'lxAQ7Zs9VYR',
    selectedTETypes: [],
    orgUnitMode: 'SELECTED',
    inclusion: 'SELECTED',
    format: 'json',
    includeDeleted: false,
    dataElementIdScheme: 'UID',
    orgUnitIdScheme: 'UID',
    idScheme: 'UID',
    assignedUserModeFilter: false,
    teiTypeFilter: 'PROGRAM',
    programStatus: '',
    followUp: 'ALL',
    enrollmentEnrolledAfter: '',
    enrollmentEnrolledBefore: '',
    lastUpdatedFilter: 'NONE',
    updatedAfter: '',
    updatedBefore: '',
    updatedWithin: '',
}

describe('TEIExport valuesToParams', () => {
    it('emits the explicitly chosen schemes', () => {
        const params = paramMap(valuesToParams(baseValues))

        expect(params.idScheme).toBe('UID')
        expect(params.dataElementIdScheme).toBe('UID')
        expect(params.orgUnitIdScheme).toBe('UID')
    })

    it('drops a scheme left at "(Default)"', () => {
        const params = paramMap(valuesToParams({ ...baseValues, idScheme: '' }))

        expect(params.idScheme).toBeUndefined()
        expect(params.dataElementIdScheme).toBe('UID')
    })
})
