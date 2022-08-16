import { getFormValues } from '../getFormValues.js'

test('gets bandcocs', () => {
    const values = {
        earthEngineId: 'population',
        aggregationType: 'sum',
        rounding: 1,
        F_0: 'abc',
        M_5: 'def',
    }

    const expected = getFormValues(values, ['earthEngineId', 'bandCocs'])

    console.log('expected', expected)

    expect(expected).toEqual({
        earthEngineId: 'population',
        F_0: 'abc',
        M_5: 'def',
    })

    expect(getFormValues(values, ['rounding', 'aggregationType'])).toEqual({
        rounding: 1,
        aggregationType: 'sum',
    })
})
