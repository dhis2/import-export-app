import axios from 'axios'
import { apiConfig } from 'config'

export default class API {
  constructor() {
    this.config = apiConfig
  }

  getBaseURL() {
    const { server, version } = this.config
    return `${server}/api/${version}/`
  }

  get(url) {
    return axios.request({
      url,
      method: 'get',
      baseURL: this.getBaseURL(),
      withCredentials: true,
    })
  }
}
