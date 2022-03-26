import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Discover from './discover/Discover'
import Home from './home/Home'
import Login from './profile/Login'
import Profile from './profile/Profile'
import Register from './profile/Register'

const SquibRoutes = (props) => {
  const { location } = props
  return (
    <Routes location={location} key={location.pathname}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="/discover" element={<Discover />} />
    </Routes>
  )
}

export default SquibRoutes
