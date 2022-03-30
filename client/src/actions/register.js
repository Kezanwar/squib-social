import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAILED } from './types'
import { setAlert } from './alert'
import { HEADERS } from '../utilities/axiosConfig'

// register a user action

export const register =
  ({ name, email, password }) =>
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
    } catch (err) {
      const errData = err.response.data
      dispatch({
        type: REGISTER_FAILED,
      })
      errData.errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'error'))
      })
    }
  }
