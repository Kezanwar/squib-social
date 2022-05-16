import axios from 'axios'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { HEADERS } from '../../../../utilities/axiosConfig'
import { capitalizeFirstLetter } from '../../../../utilities/utilities'
import RouteWrapper from '../../../layout/RouteWrapper'
import Post from '../../../layout/Post'
import Loading from '../../Loading'
import { getAllPosts } from '../../../../actions/posts'

const Home = (props) => {
  const { auth, allPosts, getAllPosts } = props
  const { user, isAuthenticated, loading } = auth
  const navigate = useNavigate()

  useEffect(() => {
    getAllPosts()
  }, [getAllPosts])

  const renderName = () => {
    if (!user)
      return (
        <p
          className="blue-link name"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/login')}
        >
          Login / Sign Up 👉🏼
        </p>
      )
    else {
      const splitNameArr =
        user && user.name ? user.name.split(' ') : ['John', 'Doe']
      const firstName = capitalizeFirstLetter(splitNameArr[0])
      const lastName = capitalizeFirstLetter(splitNameArr[1])
      return (
        <p
          className="name"
          onClick={() => navigate('/profile')}
        >{`${firstName} ${lastName}`}</p>
      )
    }
  }

  return (
    <RouteWrapper id={'home'} className={'home'}>
      <div className="yourFeedContainer">
        <h1 className="title">
          Home
          {renderName()}
        </h1>
        <div className="nameAndCreatePostContainer">
          <button
            onClick={() => navigate(user ? '/post/new' : '/login')}
            className="blue-link"
          >
            New post ✍🏽
          </button>
          {/* <img className="avatar" src={userObj.avatar} alt="avatar" /> */}
        </div>
      </div>

      {!allPosts ? (
        <Loading />
      ) : (
        allPosts.map((post, index) => (
          <Post
            key={index + 'post'}
            likes={post.likes}
            comments={post.comments}
            username={post.name}
            content={post.text}
            avatar={post.avatar}
            postUrl={`/post/${post._id}`}
            postID={post._id}
            postOwnerID={post.user}
            userProfileUrl={`/profile/${post.user}`}
            date={post.date}
          />
        ))
      )}
    </RouteWrapper>
  )
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  allPosts: state.posts.allPosts,
})

// export default Home
export default connect(mapStateToProps, { getAllPosts })(Home)
