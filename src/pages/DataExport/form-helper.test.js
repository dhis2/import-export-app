import { valuesToParams } from './form-helper.js'

const paramKeys = (query) => query.split('&').map((pair) => pair.split('=')[0])
const paramMap = (query) =>
    Object.fromEntries(query.split('&').map((pair) => pair.split('=')))

const baseValues = {
    selectedOrgUnits: ['/ImspTQPwCqd'],
    includeChildren: true,
    selectedDataSets: ['BfMAe6Itzgt'],
    compression: '',
    startDate: '2020-01-01',
    endDate: '2020-02-01',
    includeDeleted: false,
    dataElementIdScheme: 'UID',
    orgUnitIdScheme: 'UID',
    idScheme: 'UID',
    categoryIdScheme: '',
    categoryOptionIdScheme: '',
    categoryOptionComboIdScheme: '',
    dataSetIdScheme: '',
    attributeOptionComboIdScheme: '',
}

describe('DataExport valuesToParams', () => {
    it('emits the explicitly chosen schemes and omits the "(Default)" ones', () => {
        const params = paramMap(valuesToParams(baseValues))

        expect(params.idScheme).toBe('UID')
        expect(params.dataElementIdScheme).toBe('UID')
        expect(params.orgUnitIdScheme).toBe('UID')
        expect(paramKeys(valuesToParams(baseValues))).not.toContain(
            'categoryIdScheme'
        )
        expect(paramKeys(valuesToParams(baseValues))).not.toContain(
            'dataSetIdScheme'
        )
    })

    it('drops idScheme entirely when it is left at "(Default)"', () => {
        const keys = paramKeys(valuesToParams({ ...baseValues, idScheme: '' }))

        expect(keys).not.toContain('idScheme')
    })

    it('includes a category scheme once one is chosen', () => {
        const params = paramMap(
            valuesToParams({
                ...baseValues,
                categoryOptionComboIdScheme: 'CODE',
            })
        )

        expect(params.categoryOptionComboIdScheme).toBe('CODE')
    })

    it('still emits the non-scheme params', () => {
        const params = paramMap(valuesToParams(baseValues))

        expect(params.includeDeleted).toBe('false')
        expect(params.children).toBe('true')
        expect(params.orgUnit).toBe('ImspTQPwCqd')
        expect(params.dataSet).toBe('BfMAe6Itzgt')
    })
})
