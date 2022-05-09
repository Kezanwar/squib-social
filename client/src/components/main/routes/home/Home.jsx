import axios from 'axios'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HEADERS } from '../../../../utilities/axiosConfig'
import { capitalizeFirstLetter } from '../../../../utilities/utilities'
import RouteWrapper from '../../../layout/RouteWrapper'

const Home = (props) => {
  const { auth } = props
  const { user, isAuthenticated, loading } = auth
  const navigate = useNavigate()
  const splitNameArr = user && user.name ? user.name.split(' ') : ['John', 'Doe']
  const firstName = capitalizeFirstLetter(splitNameArr[0])
  const lastName = capitalizeFirstLetter(splitNameArr[1])

  useEffect(() => {
    axios({
      url: 'api/posts',
      method: 'get',
    }).then((res) => {
      console.log(res.data)
    })
  }, [])

  return (
    <RouteWrapper id={'home'} className={'home'}>
      <div className="yourFeedContainer">
        <h1 className="title">
          Home
          <p>Your personalized feed</p>
        </h1>
        <div className="nameAndCreatePostContainer">
          <h4 className="name">
            {firstName + ' ' + lastName}
            <button onClick={() => navigate('/post/new')} className="blue-link">
              New post ✍🏽
            </button>
          </h4>
          {/* <img className="avatar" src={userObj.avatar} alt="avatar" /> */}
        </div>
      </div>
    </RouteWrapper>
  )
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

// export default Home
export default connect(mapStateToProps, null)(Home)
