import React, { useState } from 'react'
import RouteWrapper from '../../../layout/RouteWrapper'
import { TextField } from '@mui/material'
import axios from 'axios'
import { HEADERS } from '../../../../utilities/axiosConfig'
// rdux
import { connect } from 'react-redux'
import { setAlert } from '../../../../actions/alert'
import propTypes from 'prop-types'
import { generateAlerts } from '../../../../utilities/utilities'

const Login = ({ setAlert }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formArray = [form.email, form.password]
    if (form.email === '' || form.password === '')
      return setAlert('Please fill the form out', 'error')
    const user = {
      email: form.email,
      password: form.password,
    }
    // console.log(user)
    try {
      const res = await axios({
        url: 'api/auth',
        method: 'post',
        data: user,
        headers: HEADERS.POST_NOAUTH,
      })
      console.log(res.data)
    } catch (err) {
      console.log(err.response.data)
      if (err.response.data.errors) {
        generateAlerts(err.response.data.errors, setAlert)
      }
    }
  }

  const handleInput = (e) => {
    const value = e.target.value
    const state = e.target.name
    setForm({
      ...form,
      [state]: value,
    })
  }

  return (
    <RouteWrapper className={'register'} id="register">
      <div className="__container">
        <h2 className="title">Login</h2>
        <p className="sub-title">Sign in with your credentials</p>
        <form className="__form">
          <div className="formrow">
            <TextField
              fullWidth={'true'}
              type={'email'}
              name="email"
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              value={form.email}
              onChange={handleInput}
            />
          </div>
          <div className="formrow">
            <TextField
              fullWidth={'true'}
              type={'password'}
              name="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={form.password}
              onChange={handleInput}
            />
          </div>

          <p className="sub-title signinMsg">
            Don't have an account? <span className="">Create an account</span>
          </p>
          <button onClick={handleSubmit} className="submitBtn" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </RouteWrapper>
  )
}

export default connect(null, { setAlert })(Login)
