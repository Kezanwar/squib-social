import { ALERT } from './types'
import { v4 } from 'uuid'

// @action setAlert
// @desc Sets an alert

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = v4()
  dispatch({
    type: ALERT.SET_ALERT,
    payload: { msg, alertType, id },
  })
}

// @action removeAlert
// @desc removes an alert by ID

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: ALERT.REMOVE_ALERT,
    payload: id,
  })
}
