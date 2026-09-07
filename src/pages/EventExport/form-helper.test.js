import { valuesToParams } from './form-helper.js'

const paramKeys = (query) => query.split('&').map((pair) => pair.split('=')[0])
const paramMap = (query) =>
    Object.fromEntries(query.split('&').map((pair) => pair.split('=')))

const baseValues = {
    selectedOrgUnits: ['/ImspTQPwCqd'],
    selectedPrograms: 'lxAQ7Zs9VYR',
    programStage: 'ALL',
    format: 'json',
    compression: '',
    occurredAfter: '2020-01-01',
    occurredBefore: '2020-02-01',
    includeDeleted: false,
    dataElementIdScheme: 'UID',
    orgUnitIdScheme: 'UID',
    idScheme: 'UID',
    inclusion: 'SELECTED',
}

describe('EventExport valuesToParams', () => {
    it('emits the explicitly chosen schemes', () => {
        const params = paramMap(valuesToParams(baseValues))

        expect(params.idScheme).toBe('UID')
        expect(params.dataElementIdScheme).toBe('UID')
        expect(params.orgUnitIdScheme).toBe('UID')
    })

    it('drops a scheme left at "(Default)"', () => {
        const keys = paramKeys(
            valuesToParams({ ...baseValues, dataElementIdScheme: '' })
        )

        expect(keys).not.toContain('dataElementIdScheme')
        expect(keys).toContain('idScheme')
    })

    it('never emits the dataValueSets-only schemes', () => {
        const keys = paramKeys(
            valuesToParams({ ...baseValues, categoryIdScheme: 'CODE' })
        )

        expect(keys).not.toContain('categoryIdScheme')
    })
})
