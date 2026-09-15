import { idSchemeEntries, idSchemeParams } from './idSchemeParams.js'

describe('idSchemeParams', () => {
    it('emits only the params that have a value', () => {
        const values = {
            dataElementIdScheme: '',
            orgUnitIdScheme: 'CODE',
            idScheme: 'UID',
        }

        expect(idSchemeParams(values, 'tracker')).toEqual([
            'orgUnitIdScheme=CODE',
            'idScheme=UID',
        ])
    })

    it('emits nothing when every scheme is left at "(Default)"', () => {
        const values = {
            dataElementIdScheme: '',
            orgUnitIdScheme: '',
            idScheme: '',
        }

        expect(idSchemeParams(values, 'tracker')).toEqual([])
    })

    it('supports the category / data set / attribute option combo params for dataValueSets', () => {
        const values = {
            categoryIdScheme: 'NAME',
            dataSetIdScheme: 'CODE',
            attributeOptionComboIdScheme: 'UID',
        }

        expect(idSchemeParams(values, 'dataValueSets')).toEqual([
            'categoryIdScheme=NAME',
            'dataSetIdScheme=CODE',
            'attributeOptionComboIdScheme=UID',
        ])
    })

    it('ignores params the endpoint does not support even when set', () => {
        const values = { categoryIdScheme: 'NAME', idScheme: 'UID' }

        expect(idSchemeParams(values, 'tracker')).toEqual(['idScheme=UID'])
    })

    it('returns [key, value] pairs from idSchemeEntries', () => {
        const values = { orgUnitIdScheme: 'CODE', idScheme: '' }

        expect(idSchemeEntries(values, 'tracker')).toEqual([
            ['orgUnitIdScheme', 'CODE'],
        ])
    })

    it('returns an empty array for an unknown endpoint instead of throwing', () => {
        const values = { orgUnitIdScheme: 'CODE' }

        expect(idSchemeParams(values, 'notAnEndpoint')).toEqual([])
        expect(idSchemeEntries(values, 'notAnEndpoint')).toEqual([])
    })
})
