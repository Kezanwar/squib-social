import axios from 'axios'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { HEADERS } from '../../../../utilities/axiosConfig'
import { capitalizeFirstLetter } from '../../../../utilities/utilities'
import RouteWrapper from '../../../layout/RouteWrapper'
import Post from '../../../layout/Post'

const Home = (props) => {
  const { auth } = props
  const { user, isAuthenticated, loading } = auth
  const navigate = useNavigate()
  const splitNameArr =
    user && user.name ? user.name.split(' ') : ['John', 'Doe']
  const firstName = capitalizeFirstLetter(splitNameArr[0])
  const lastName = capitalizeFirstLetter(splitNameArr[1])

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios({
      url: 'api/posts',
      method: 'get',
    }).then((res) => {
      setPosts(res.data)
    })
  }, [])

  return (
    <RouteWrapper id={'home'} className={'home'}>
      <div className="yourFeedContainer">
        <h1 className="title">
          Home
          <p> {firstName + ' ' + lastName}</p>
        </h1>
        <div className="nameAndCreatePostContainer">
          <button onClick={() => navigate('/post/new')} className="blue-link">
            New post ✍🏽
          </button>

          {/* <img className="avatar" src={userObj.avatar} alt="avatar" /> */}
        </div>
      </div>

      {posts.map((post) => (
        <Post
          likes={post.likes}
          comments={post.comments}
          username={post.name}
          content={post.text}
          avatar={post.avatar}
          postUrl={`/post/${post._id}`}
          postID={post._id}
          postOwnerID={post.user}
          userProfileUrl={`/profile/${post.user}`}
        />
      ))}
    </RouteWrapper>
  )
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

// export default Home
export default connect(mapStateToProps, null)(Home)
