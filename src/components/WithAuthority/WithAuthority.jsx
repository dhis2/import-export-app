import PropTypes from 'prop-types'
import { useContext } from 'react'
import { UserContext } from '../../contexts/index.js'

const WithAuthority = ({ pred, children }) => {
    const user = useContext(UserContext)
    if (!user) {
        return null
    }
    return pred(user.authorities) ? children : null
}

WithAuthority.propTypes = {
    children: PropTypes.node,
    pred: PropTypes.func,
}

export { WithAuthority }
