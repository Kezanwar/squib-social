import React from 'react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { HEADERS } from '../../utilities/axiosConfig'
import { connect } from 'react-redux'

function Post(props) {
  const {
    username,
    avatar,
    content,
    comments,
    likes,
    postID,
    postOwnerID,
    postUrl,
    userProfileUrl,
    auth,
  } = props

  const [postLikes, setPostLikes] = useState(likes)
  const [liked, setLiked] = useState(false)

  const hasUserLiked = (likesArr) => {
    if (!auth || !auth.user) return false
    else {
      const likesByUser = likesArr.filter(
        (like) => like.user.toString() === auth.user._id
      )
      if (likesByUser.length < 1) return false
      else return true
    }
  }

  useEffect(() => {
    if (auth && auth.user) {
      const hasLiked = hasUserLiked(postLikes)
      if (hasLiked) setLiked(true)
    }
  }, [auth])

  const handleLike = async () => {
    try {
      const hasLiked = hasUserLiked(postLikes)
      let url
      if (hasLiked) url = `api/posts/unlike/${postID}`
      if (!hasLiked) url = `api/posts/like/${postID}`
      const res = await axios({
        url: url,
        method: 'put',
        headers: HEADERS.AUTH,
      })
      setPostLikes(res.data)
      setLiked(hasUserLiked(res.data) ? true : false)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <motion.article
      transition={{ duration: 0.3, ease: 'easeOut' }}
      layout
      className="post"
    >
      <div className="userInfoContainer">
        <img className="avatar" src={avatar} alt="userImg" />
        <h5 className="username">{username}</h5>
      </div>
      <p className="content">{content}</p>
      <div className="metricsContainer">
        {' '}
        <button onClick={handleLike} className="metric blue-link">
          {liked ? 'liked' : 'notliked'} {postLikes.length}{' '}
          {postLikes.length === 1 ? 'Like' : 'Likes'}
        </button>
        <button className="metric blue-link">{comments.length} Comments</button>
      </div>
    </motion.article>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, null)(Post)
