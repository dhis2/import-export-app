export const USER_SET = 'user/SET'
export const USER_CLEAR = 'user/CLEAR'

export const setUser = user => ({ type: USER_SET, payload: user })
export const clearUser = () => ({ type: USER_CLEAR })
