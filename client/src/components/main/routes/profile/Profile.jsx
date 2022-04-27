import React from 'react'
import Post from '../../../layout/Post'
import { connect } from 'react-redux'
import RouteWrapper from '../../../layout/RouteWrapper'

const Profile = (props) => {
  const { auth } = props

  return (
    <RouteWrapper id={'profile'} className={'profile'}>
      <Post />
      <p>{auth.isAuthenticated && auth.user ? auth.user.name : 'not authenticated'}</p>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, null)(Profile)
