export const HEADERS = {
  POST_NOAUTH: { 'Content-type': 'application/json' },
  POST_AUTH: {
    'Content-type': 'application/json',
    'x-auth-token': 'window.localstorage.....',
  },
  AUTH: { 'x-auth-token': 'windlow.localstorage....' },
}
