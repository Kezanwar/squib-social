import React from 'react'
import { motion } from 'framer-motion'
import Post from '../../../layout/Post'
import RouteWrapper from '../../../layout/RouteWrapper'

const Profile = () => {
  return (
    <RouteWrapper id={'profile'} className={'profile'}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </RouteWrapper>
  )
}

export default Profile
