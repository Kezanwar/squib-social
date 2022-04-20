export const AUTH_ACTIONS = {
  getAuthToken: function () {
    if (window.localStorage.token) return window.localStorage.token
    else return 'no-token'
  },
  removeAuthToken: function () {
    localStorage.removeItem('token')
  },
  THIS: function () {
    return this
  },
}

export const HEADERS = {
  POST_NOAUTH: { 'Content-type': 'application/json' },
  POST_AUTH: {
    'Content-type': 'application/json',
    'x-auth-token': AUTH_ACTIONS.getAuthToken(),
  },
  AUTH: {
    'x-auth-token': AUTH_ACTIONS.getAuthToken(),
  },
  THIS: function () {
    return this
  },
}
