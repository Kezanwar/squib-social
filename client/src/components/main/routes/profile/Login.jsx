import React, { useEffect, useState } from 'react'
import RouteWrapper from '../../../layout/RouteWrapper'
import { TextField } from '@mui/material'
// rdux
import { connect } from 'react-redux'
import { setAlert } from '../../../../actions/alert'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../../../actions/auth'

const Login = ({ setAlert, loginUser, auth }) => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = auth

  useEffect(() => {
    if (user) {
      navigate('/profile')

      return
    }
  }, [user])

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.email === '' || form.password === '') {
      setAlert('Please fill the form out', 'error')
      return
    }
    const userDetails = {
      email: form.email,
      password: form.password,
    }

    loginUser(userDetails, () => navigate('/'))
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

          <p
            onClick={() => navigate('/register')}
            className="sub-title signinMsg"
          >
            Don't have an account?{' '}
            <span className="blue-link">Create an account 🤙🏽</span>
          </p>
          <button onClick={handleSubmit} className="submitBtn" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </RouteWrapper>
  )
}

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { setAlert, loginUser })(Login)
