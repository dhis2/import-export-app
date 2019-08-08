import { connect } from 'react-redux'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const WithAuthorityComponent = ({ check, children, user }) => {
    if (user && check(user.authorities)) {
        return <Fragment>{children}</Fragment>
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
