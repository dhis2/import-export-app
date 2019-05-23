import { today } from '../date'
import {
    getField,
    getRequiredFields,
    hasRequiredFieldsWithoutValue,
} from '../form'
import { isValueNil } from '../values'

describe('Date', () => {
    it('today() is not null', () => {
        const d = today()
        expect(typeof d === 'object').toEqual(true)
    })

    it('today() is a date object', () => {
        const d = today()
        expect(typeof d.getMonth === 'function').toEqual(true)
    })
})

describe('Form', () => {
    it('getField', () => {
        const fields = [
            {
                name: 'test',
            },
        ]
        const selected = 'test'
        const f = getField(selected, fields)
        expect(f.name === selected).toBe(true)
    })

    describe('getRequiredFields', () => {
        it('should return a list with only required fields', () => {
            const fields = [
                {
                    name: 'test',
                    required: true,
                },
                {
                    name: 'test',
                    required: false,
                },
                {
                    name: 'test',
                },
            ]
            const f = getRequiredFields(fields)
            f.forEach(f => expect(f).toHaveProperty('required', true))
        })
        it('should return empty list if required is not specified', () => {
            const fields = [
                {
                    name: 'test',
                },
                {
                    name: 'test',
                },
                {
                    name: 'test',
                },
            ]
            const f = getRequiredFields(fields)
            f.forEach(f => expect(f).toHaveProperty('required', true))
        })
    })

    describe('hasRequiredFieldsWithoutValue', () => {
        it('should return false when fields have values', () => {
            const fields = [
                { name: 'Birk', required: true },
                { name: 'Kjetil' },
            ]
            const fieldValues = {
                Birk: {
                    selected: 'Cool',
                },
                Kjetil: {
                    selected: 'Traitor',
                },
            }

            expect(hasRequiredFieldsWithoutValue(fields, fieldValues)).toBe(
                false
            )
        })
        it('should return true when fields are required and have no value', () => {
            const fields = [
                { name: 'Birk', required: true },
                { name: 'Kjetil', required: false },
            ]
            const fieldValues = {
                Birk: {
                    selected: null,
                },
                Kjetil: {
                    selected: 'Traitor',
                },
            }
            expect(hasRequiredFieldsWithoutValue(fields, fieldValues)).toBe(
                true
            )
        })
        it('should return false when fields do not have required flag', () => {
            const fields = [{ name: 'Ameen' }, { name: 'Stian' }]
            const fieldValues = {
                Ameen: {
                    selected: null,
                },
                Stian: {
                    selected: 'Flink',
                },
            }
            expect(hasRequiredFieldsWithoutValue(fields, fieldValues)).toBe(
                false
            )
        })

        it('should return true when fields are required and value is empty string', () => {
            const fields = [
                { name: 'Ameen' },
                { name: 'Stian', required: true },
            ]
            const fieldValues = {
                Ameen: {
                    selected: null,
                },
                Stian: {
                    selected: '',
                },
            }
            expect(hasRequiredFieldsWithoutValue(fields, fieldValues)).toBe(
                true
            )
        })
    })
})

describe('Values', () => {
    describe('isValueNil', () => {
        it('should return true when value is null', () => {
            expect(isValueNil(null)).toBe(true)
        })

        it('should return true when value is undefined', () => {
            expect(isValueNil(undefined)).toBe(true)
        })

        it('should return true when value is empty string', () => {
            expect(isValueNil('')).toBe(true)
        })

        it('should return false when value is false', () => {
            expect(isValueNil(false)).toBe(false)
        })

        it('should return false when value is a value', () => {
            expect(isValueNil('test')).toBe(false)
            expect(isValueNil(5)).toBe(false)
            expect(isValueNil({ test: 'test' })).toBe(false)
        })
    })
})
