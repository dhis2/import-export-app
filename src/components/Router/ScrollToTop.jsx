import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const ScrollToTop = ({ children }) => {
    const history = useHistory()
    useEffect(() => {
        const unlisten = history.listen(() => {
            document.getElementsByClassName('app-shell-app')[0]?.scrollTo(0, 0)
        })

        return () => {
            unlisten()
        }
    }, [])

    return <>{children}</>
}

ScrollToTop.propTypes = {
    children: PropTypes.node,
}
