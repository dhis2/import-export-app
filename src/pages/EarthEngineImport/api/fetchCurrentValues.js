export const fetchCurrentValues = async url => {
    console.log('fetchCurrentValues with url', url)
    const fetcher = url =>
        fetch(url, { credentials: 'include' })
            .then(resp => {
                if (resp.status >= 200 && resp.status < 300) {
                    return Promise.resolve(resp.json())
                } else {
                    throw resp
                }
            })
            .catch(resp => {
                const error = new Error(resp.statusText || resp.status)
                console.error(`fetchCurrentValues error: `, error)
                return Promise.reject(error)
            })

    return await fetcher(url).catch(error => Promise.reject(error))
}
