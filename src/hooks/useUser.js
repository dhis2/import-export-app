import { useDataQuery } from '@dhis2/app-runtime'

const userQuery = {
    user: {
        resource: 'me',
    },
}

const useUser = () => {
    const { loading, error, data } = useDataQuery(userQuery)

    if (error) {
        console.log('useUser error: ', error)
    }

    return { loading, error, user: data && data.user }
}

export { useUser }
