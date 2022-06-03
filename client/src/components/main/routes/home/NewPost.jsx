import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { isAuthLoading } from '../../../../utilities/utilities'
import RouteWrapper from '../../../layout/RouteWrapper'
import { useNavigate } from 'react-router-dom'

const NewPost = (props) => {
  const navigate = useNavigate()
  const { auth } = props

  console.log(auth)
  useEffect(() => {
    console.log('hello')
    if (isAuthLoading(auth)) return
    if (!auth.user) navigate('/')
  }, [auth])

  if (isAuthLoading(auth)) return <div>loading</div>
  return (
    <RouteWrapper id="newpost" className="new-post">
      <div>hello</div>
    </RouteWrapper>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

// export default Home
export default connect(mapStateToProps, null)(NewPost)
