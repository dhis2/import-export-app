export const AUTH_TYPE_BASIC_AUTH = 'auth/basicAuth'
export const AUTH_TYPE_OAUTH2 = 'auth/oAuth2'

export const apiConfig = {
  server: 'http://localhost:8080',
  version: '29',

  auth: {
    type: AUTH_TYPE_BASIC_AUTH,
    username: 'admin',
    password: 'district'
  }
}