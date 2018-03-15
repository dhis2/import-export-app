import axios from 'axios'
import { base64Encode } from 'helpers'
import { AUTH_TYPE_BASIC_AUTH, AUTH_TYPE_OAUTH2 } from 'config'
import { apiConfig } from 'config'

export default class API {
  constructor() {
    this.config = apiConfig
  }

  authHeaders() {
    const { type } = this.config.auth
    if (type === AUTH_TYPE_BASIC_AUTH) {
      const { username, password } = this.config.auth
      const encoded = base64Encode(`${username}:${password}`)
      return {
        Authorization: `Basic ${encoded}`
      }
    } else if (type === AUTH_TYPE_OAUTH2) {
      // TODO
      console.warn('NOT IMPLEMENTED', AUTH_TYPE_OAUTH2)
      return {}
    } else {
      console.error('Invalid Auth Type', type)
    }
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
      headers: {
        ...this.authHeaders(),
      }
    })
  }
}
