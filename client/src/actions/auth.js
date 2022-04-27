import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_USER,
} from './types'
import { setAlert } from './alert'
import { HEADERS } from '../utilities/axiosConfig'

// @action loadUser
// @desc Loads a user upon app.js mount

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios({
      url: 'api/auth',
      method: 'get',
      headers: HEADERS.AUTH,
    })
    if (res.data) {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
      return
    }
    if (!res.data) {
      dispatch({
        type: AUTH_ERROR,
      })
    }
  } catch (err) {
    if (err?.response?.data?.msg === 'token not valid') {
      dispatch({
        type: AUTH_ERROR,
      })
    }
  }
}

// @action register
// @dec Registers a user and then logs them in

export const register =
  ({ name, email, password }, relocate) =>
  async (dispatch) => {
    const newUser = {
      name: name,
      email: email,
      password: password,
    }
    try {
      const res = await axios({
        url: 'api/users',
        method: 'post',
        data: newUser,
        headers: HEADERS.POST_NOAUTH,
      })
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
      relocate()
    } catch (err) {
      const errData = err?.response?.data
      dispatch({
        type: REGISTER_FAILED,
      })
      errData.errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'error'))
      })
    }
  }

export const loginUser = (user, relocate) => async (dispatch) => {
  try {
    const res = await axios({
      url: 'api/auth',
      method: 'post',
      data: user,
      headers: HEADERS.POST_NOAUTH,
    })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })
    relocate()
  } catch (err) {
    const errData = err?.response?.data
    dispatch({
      type: LOGIN_FAILED,
    })
    errData.errors.forEach((error) => {
      dispatch(setAlert(error.msg, 'error'))
    })
  }
}

export const logoutUser = (relocate) => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  })
  relocate()
}
