export const AUTH_ACTIONS = {
  getAuthToken: function () {
    if (window.localStorage.token) return window.localStorage.token
    else return null
  },
  removeAuthToken: function () {
    localStorage.removeItem('token')
  },
}

export const HEADERS = {
  POST_NOAUTH: { 'Content-type': 'application/json' },
  POST_AUTH: function () {
    return window.localStorage.token
      ? {
          'x-auth-token': window.localStorage.token,
          'Content-type': 'application/json',
        }
      : null
  },
  AUTH: function () {
    return window.localStorage.token
      ? { 'x-auth-token': window.localStorage.token }
      : null
  },
}
