import { REGISTER_SUCCESS, REGISTER_FAILED, USER_LOADED } from '../actions/types'

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
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_FAILED:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenicated: false,
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
