import React, { useEffect, useState } from 'react'
import RouteWrapper from '../../../layout/RouteWrapper'
import { TextField } from '@mui/material'
// redux
import { connect } from 'react-redux'
import { setAlert } from '../../../../actions/alert'
import { register } from '../../../../actions/auth'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const Register = (props) => {
  const { setAlert, register, auth } = props
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate('/profile')
    }
  }, [])
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordtwo: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formArray = [form.firstName, form.lastName, form.email, form.password, form.passwordtwo]

    if (formArray.some((inputValues) => inputValues === ''))
      return setAlert('Please fill out the form', 'error')

    if (form.password !== form.passwordtwo) {
      return setAlert('Passwords do not match', 'error')
    } else {
      const newUser = {
        name: form.firstName + ' ' + form.lastName,
        email: form.email,
        password: form.password,
      }
      register(newUser, () => navigate('/profile'))
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

  const { isAuthenticated, user } = auth

  // console.log(token, isAuthenticated)

  return (
    <RouteWrapper className={'register'} id="register">
      <div className="__container">
        <h2 className="title">Sign up</h2>
        <p className="sub-title">Create an account to log in</p>
        <form className="__form">
          <div className="formrow5050">
            <TextField
              required
              type={'text'}
              name="firstName"
              label="First name"
              variant="outlined"
              value={form.firstName}
              onChange={handleInput}
            />
            <TextField
              required
              type={'text'}
              name="lastName"
              label="Last name"
              variant="outlined"
              value={form.lastNamet}
              onChange={handleInput}
            />
          </div>
          <div className="formrow">
            <TextField
              required
              fullWidth
              type={'email'}
              name="email"
              label="E-mail"
              variant="outlined"
              value={form.email}
              onChange={handleInput}
            />
          </div>
          <div className="formrow">
            <TextField
              required
              fullWidth
              type={'password'}
              name="password"
              label="Create password"
              variant="outlined"
              value={form.password}
              onChange={handleInput}
            />
          </div>
          <div className="formrow">
            <TextField
              required
              fullWidth
              type={'password'}
              name="passwordtwo"
              label="Confirm password"
              variant="outlined"
              value={form.passwordtwo}
              onChange={handleInput}
            />
          </div>
          <p onClick={() => navigate('/login')} className="sub-title signinMsg">
            Already have an account? <span className="blue-link">Sign in 🤙🏽</span>
          </p>
          <button onClick={handleSubmit} className="submitBtn" type="submit">
            Register
          </button>
        </form>
      </div>
    </RouteWrapper>
  )
}

Register.propTypes = {
  setAlert: propTypes.func.isRequired,
  register: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { setAlert, register })(Register)
