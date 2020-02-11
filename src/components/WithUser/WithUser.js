import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'
import { useDataQuery } from '@dhis2/app-runtime'
import { CssReset, CircularLoader, ScreenCover } from '@dhis2/ui-core'

import { testIds } from '../../utils/testIds'
import { UserContext } from '../../contexts/'

const userQuery = {
    user: {
        resource: 'me',
    },
}

const WithUser = Component => props => {
    const [user, setUser] = useState(undefined)
    const [error, setError] = useState(undefined)
    const { loading } = useDataQuery(userQuery, {
        onComplete: data => {
            setUser(data.user)
        },
        onError: error => {
            setError(error)
            console.error('WithUser error: ', error)
        },
    })

    let content
    if (loading) {
        content = (
            <ScreenCover dataTest={testIds.WithUser.ScreenCover}>
                <CircularLoader dataTest={testIds.WithUser.Loader} />
            </ScreenCover>
        )
    } else if (error) {
        content = (
            <div data-test={testIds.WithUser.Error}>
                <p>
                    {i18n.t(
                        'Something went wrong when loading the current user!'
                    )}
                </p>
                <p>{error.message}</p>
            </div>
        )
    } else {
        content = (
            <UserContext.Provider value={user}>
                <Component {...props} />
            </UserContext.Provider>
        )
    }

    return (
        <>
            <CssReset />
            {content}
        </>
    )
}

export { WithUser }
