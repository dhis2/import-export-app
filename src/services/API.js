import axios from 'axios'

const { REACT_APP_DHIS2_BASE_URL } = process.env
const config = {
    baseURL: `${REACT_APP_DHIS2_BASE_URL}/api/`,
    withCredentials: true,
    maxRedirects: 0,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
}

export default class API {
    url(path) {
        return `${config.baseURL}${path}`
    }

    get(url) {
        return axios.get(url, config)
    }

    post(url, data) {
        return axios.post(url, data, config)
    }
}
