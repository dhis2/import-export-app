import userReducer from '../'
import { USER_SET, USER_CLEAR } from '../actions'

describe('User Reducer', () => {
    it('USER_CLEAR removes existing user', () => {
        expect(userReducer(null, { type: USER_CLEAR })).toBe(null)
    })

    it('USER_SET sets user', () => {
        const user = { name: 'Muhammad Adeel' }
        expect(
            userReducer(null, { type: USER_SET, payload: user })
        ).toMatchObject(user)
    })
})
