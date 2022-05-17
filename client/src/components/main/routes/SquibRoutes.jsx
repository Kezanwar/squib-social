import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Discover from './discover/Discover'
import Home from './home/Home'
import NewPost from './home/NewPost'
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
      <Route path="/post/new" element={<NewPost />} />
      <Route path="/post/:id" element={<div>hello</div>} />
    </Routes>
  )
}

export default SquibRoutes
