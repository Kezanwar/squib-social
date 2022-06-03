import React from 'react'
import { connect } from 'react-redux'
import RouteWrapper from '../../../layout/RouteWrapper'

const NewPost = (props) => {
  const { auth } = props

  console.log(auth)

  return <RouteWrapper id="newpost" className="new-post"></RouteWrapper>
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

// export default Home
export default connect(mapStateToProps, null)(NewPost)
