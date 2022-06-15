import { useContext } from 'react'
import { UserContext } from '../../contexts/index'

const WithAuthority = ({ pred, children }) => {
    const user = useContext(UserContext)
    if (!user) {
        return null
    }
    return pred(user.authorities) ? children : null
}

export { WithAuthority }
