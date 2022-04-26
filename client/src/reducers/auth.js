import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../actions/types'
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
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_FAILED:
    case AUTH_ERROR:
    case LOGIN_FAILED:
      AUTH_ACTIONS.removeAuthToken()
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      }
    case USER_LOADED:
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
