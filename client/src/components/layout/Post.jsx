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

  const [postLikes, setLikes] = useState(likes)

  useEffect(() => {}, [])

  const hasUserLiked = () => {
    const likesByUser = postLikes.filter(
      (like) => like.user.toString() === auth.user.id
    )
    if (likesByUser.length < 1) return false
    else return true
  }

  const handleLike = () => {
    const hasLiked = hasUserLiked()
    try {
      let url
      if (hasLiked) url = `api/posts/unlike/${postID}`
      if (!hasLiked) url = `api/posts/like/${postID}`
      const res = axios({
        url: url,
        method: 'put',
        headers: HEADERS.AUTH,
      })
      console.log(res.data)
      // setLike((prev) => !prev.like)
      // setLikeCount((prev) => (like ? prev.likeCount - 1 : prev.likeCount + 1))
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
          {likes.length} Likes
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
