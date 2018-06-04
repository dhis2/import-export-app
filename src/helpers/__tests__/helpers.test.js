import { today } from '../date'

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
