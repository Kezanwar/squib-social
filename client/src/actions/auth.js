import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAILED } from '../actions/types'
import { HEADERS } from '../utilities/axiosConfig'
import { generateAlerts } from '../utilities/utilities'
import { setAlert } from './alert'

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
      dispatch({
        type: REGISTER_FAILED,
      })
      if (err.response.data.errors) {
        generateAlerts(err.response.data.errors, setAlert)
      }
    }
  }
