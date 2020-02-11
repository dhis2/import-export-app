import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { CssReset, CircularLoader, ScreenCover } from '@dhis2/ui-core'

import { UserContext } from '../../contexts/'

const userQuery = {
    user: {
        resource: 'me',
    },
}

const WithUser = Component => props => {
    const [user, setUser] = useState(undefined)
    const { loading } = useDataQuery(userQuery, {
        onComplete: data => {
            setUser(data.user)
        },
        onError: error => {
            console.error('WithUser error: ', error)
        },
    })

    return (
        <>
            <CssReset />
            {loading ? (
                <ScreenCover>
                    <CircularLoader />
                </ScreenCover>
            ) : (
                <UserContext.Provider value={user}>
                    <Component {...props} />
                </UserContext.Provider>
            )}
        </>
    )
}

export { WithUser }
