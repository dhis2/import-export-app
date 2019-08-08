import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export const WithAuthorityComponent = ({ check, children, user }) => {
    if (user && check(user.authorities)) {
        return children
    }

    return null
}

WithAuthorityComponent.propTypes = {
    check: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
}

export const WithAuthority = connect(state => ({ user: state.user }))(
    WithAuthorityComponent
)
