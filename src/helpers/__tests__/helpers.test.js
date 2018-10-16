import { today } from '../date'
import { getField } from '../form'

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
})
