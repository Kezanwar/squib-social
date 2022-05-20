import { API_LOADING, AUTH } from '../actions/types'
import { AUTH_ACTIONS } from '../utilities/axiosConfig'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
}

function authReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case API_LOADING:
      return {
        ...state,
        loading: true,
      }
    case AUTH.REGISTER_SUCCESS:
    case AUTH.LOGIN_SUCCESS:
      window.localStorage.setItem('token', payload.token)
      console.log(payload)
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
        loading: false,
      }
    case AUTH.REGISTER_FAILED:
    case AUTH.AUTH_ERROR:
    case AUTH.LOGIN_FAILED:
    case AUTH.LOGOUT_USER:
      AUTH_ACTIONS.removeAuthToken()
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      }
    case AUTH.USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      }

    default:
      return state
  }
}

export default authReducer
