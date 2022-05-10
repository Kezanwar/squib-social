import Helmet from 'react-helmet'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { logoutUser } from '../actions/auth'
import { connect } from 'react-redux'
import { headTitles } from './headTitles'

function SquibHelmet(props) {
  const { auth } = props
  const location = useLocation()
  const heads = headTitles(location)

  const renderTitles = (auth, path) => {
    switch (path) {
      case 'Profile':
        return heads.myprofile(auth)
      case '':
        return heads.home
      case 'Discover':
      case 'Login':
      case 'Register':
        return heads.squibAndRoute()
      default:
        break
    }
    return
  }

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{renderTitles(auth, heads.path1())}</title>
    </Helmet>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(SquibHelmet)
