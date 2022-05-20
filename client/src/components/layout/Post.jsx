import React from 'react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { HEADERS } from '../../utilities/axiosConfig'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

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
    date,
  } = props

  const [postLikes, setPostLikes] = useState(likes)
  const [liked, setLiked] = useState(false)

  const navigate = useNavigate()

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
    if (!auth.user) {
      navigate('/login')
      return
    }
    try {
      const hasLiked = hasUserLiked(postLikes)
      let url
      if (hasLiked) url = `api/posts/unlike/${postID}`
      if (!hasLiked) url = `api/posts/like/${postID}`
      const res = await axios({
        url: url,
        method: 'put',
        headers: HEADERS.AUTH(),
      })
      setPostLikes(res.data)
      setLiked(hasUserLiked(res.data) ? true : false)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const getProfileLink = () => {
    if (auth && auth.user && auth.user._id === postOwnerID) return '/profile'
    else return `/profile/${postOwnerID}`
  }

  const postDate = new Date(date)
  const todayDate = new Date()

  const postDateObj = {
    day: postDate.getDate(),
    month: postDate.getMonth(),
    year: postDate.getFullYear(),
    ISODateAndTimeArr: postDate.toISOString().split('T'),
    timeArr: function () {
      return this.ISODateAndTimeArr[1].split(':')
    },
    getTime: function () {
      let [hour, min] = this.timeArr()
      return `${hour}:${min}`
    },
    dateArr: function () {
      return this.ISODateAndTimeArr[0].split('-')
    },
    getShortDate: function () {
      let [year, month, day] = this.dateArr()
      month = month < 10 ? month.slice(-1) : month
      year = year.slice(-2)
      return `${day}/${month}/${year}`
    },
  }

  const todayDateObj = {
    day: todayDate.getDate(),
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  }

  const renderDateText = () => {
    if (
      todayDateObj.day === postDateObj.day &&
      todayDateObj.month === postDateObj.month &&
      todayDateObj.year === postDateObj.year
    ) {
      return `Today @ ${postDateObj.getTime()}`
    }
    if (
      todayDateObj.day - 1 === postDateObj.day &&
      todayDateObj.month === postDateObj.month &&
      todayDateObj.year === postDateObj.year
    ) {
      return `Yesterday @ ${postDateObj.getTime()}`
    } else return `${postDateObj.getShortDate()} @ ${postDateObj.getTime()}`
  }

  return (
    <motion.article
      transition={{ duration: 0, ease: 'easeOut' }}
      layout
      className="post"
      // initial={{ opacity: 0, x: 0, y: 50 }}
      // animate={{ opacity: 1, x: 0, y: 0 }}
      // exit={{ opacity: 0, x: 0, y: 0 }}
    >
      <Link to={getProfileLink()}>
        <div className="userInfoContainer">
          <img className="avatar" src={avatar} alt="userImg" />
          <h5 className="username">
            {username} <p className="date"> {renderDateText()}</p>{' '}
          </h5>
        </div>
      </Link>
      <p className="content">{content}</p>
      <div className="metricsContainer">
        {' '}
        <button onClick={handleLike} className="metric  blue-link">
          <i
            style={liked ? { color: 'rgb(255, 115, 115)' } : {}}
            class="fa-solid fa-heart"
          ></i>
          {postLikes.length} {postLikes.length === 1 ? 'Like' : 'Likes'}
        </button>
        <button className="metric blue-link ">
          <i class="fa-solid fa-comment-dots"></i>
          {comments.length} Comments
        </button>
      </div>
    </motion.article>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, null)(Post)
