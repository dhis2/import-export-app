import axios from 'axios'
import { apiConfig } from 'config'

const { server, version } = apiConfig
const config = {
  baseURL: `${server}/api/${version}/`,
  withCredentials: true,
  maxRedirects: 0,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}

export default class API {
  get(url) {
    return axios.get(url, config)
  }

  url(path) {
    return `${config.baseURL}${path}`
  }
}
