import { REGISTER_SUCCESS, REGISTER_FAILED } from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenicated: null,
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
        isAuthenicated: true,
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
    default:
      return state
  }
}

export default authReducer
