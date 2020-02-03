import React, { useEffect, useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { CssReset, CircularLoader, ScreenCover } from '@dhis2/ui-core'

import { UserContext } from '../../contexts/'

const userQuery = {
    user: {
        resource: 'me',
    },
}

const WithUser = Component => props => {
    const { loading, data } = useDataQuery(userQuery)
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        if (data) {
            setUser(data.user)
        }
    }, [data])

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
