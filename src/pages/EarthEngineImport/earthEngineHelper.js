import i18n from '@dhis2/d2-i18n'

// Returns auth token for EE API as a promise
export const getAuthToken = engine => () => {
    const googleTokenQuery = {
        resource: 'tokens/google',
    }
    return new Promise(async (resolve, reject) => {
        const token = await engine
            .query(googleTokenQuery)
            .catch(() =>
                reject(
                    new Error(
                        i18n.t(
                            'Cannot get authorization token for Google Earth Engine.'
                        )
                    )
                )
            )

        if (token && token.status === 'ERROR') {
            reject(
                new Error(
                    i18n.t(
                        'This layer requires a Google Earth Engine account. Check the DHIS2 documentation for more information.'
                    )
                )
            )
        }

        resolve({
            token_type: 'Bearer',
            ...token,
        })
    })
}
