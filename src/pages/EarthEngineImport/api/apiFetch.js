// import { isString, isObject } from 'lodash/fp'

// The api/configuration/xx endpoints returns an empty body if the config is not set
// This is a replacement for response.json() which gives error if body is empty
// https://stackoverflow.com/a/51320025
// const getJsonResponse = async response => {
//     const string = await response.text()
//     const json = string === '' ? undefined : JSON.parse(string)
//     return json
// }

const isString = value => {
    const type = typeof value
    return type === 'string'
    // return (
    //     type === 'string' ||
    //     (type === 'object' &&
    //         value != null &&
    //         !Array.isArray(value) &&
    //         getTag(value) == '[object String]')
    // )
}

const isObject = value => {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
}

export const apiFetch = async (url, method, body) => {
    const options = {
        headers: {
            'Content-Type': 'application/json', // Default API response
        },
    }

    // if (config.context && config.context.auth) {
    //     options.headers['Authorization'] = 'Basic ' + btoa(config.context.auth)
    // } else {
    options.credentials = 'include'
    // }

    if (method && body) {
        options.method = method

        if (isString(body)) {
            options.headers['Content-Type'] = 'text/html'
            options.body = body
        } else if (isObject(body)) {
            options.body = JSON.stringify(body)
        }
    }

    // TODO: Better error handling
    return fetch(encodeURI(url), options)
        .then(response =>
            ['POST', 'PUT', 'PATCH'].includes(method)
                ? response
                : response.json()
        )
        .catch(error => console.log('Error: ', error)) // eslint-disable-line
}
