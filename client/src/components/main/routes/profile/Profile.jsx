import React, { useEffect, useState } from 'react'
import Post from '../../../layout/Post'
import { connect } from 'react-redux'
import RouteWrapper from '../../../layout/RouteWrapper'
import { useNavigate } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../../../utilities/utilities'
import { logoutUser } from '../../../../actions/auth'
import Loading from '../../Loading'

const Profile = (props) => {
  const { auth, logoutUser } = props
  const { isAuthenticated, user, loading } = auth
  const navigate = useNavigate()

  const [userObj, setUserObj] = useState({
    name: 'No User',
    id: 'No ID',
    notifications: [],
    activities: [],
    email: 'No Email',
    avatar: 'No Avatar',
  })

  useEffect(() => {
    if (!user && !isAuthenticated && !loading) {
      navigate('/login')
    }
    if (isAuthenticated && user && !loading) {
      const splitNameArr = user.name ? user.name.split(' ') : ''
      const firstName = capitalizeFirstLetter(splitNameArr[0])
      const lastName = capitalizeFirstLetter(splitNameArr[1])
      setUserObj(user)
      setProfileFields((prev) => ({
        ...prev,
        firstName: firstName,
        lastName: lastName,
      }))
    }
  }, [user, isAuthenticated])

  const [profileFields, setProfileFields] = useState({
    firstName: '',
    lastName: '',
    status: 'Online',
    bio: '',
    website: '',
    location: '',
    instagram: '',
    twitter: '',
    linkedin: '',
  })

  const handleProfileFieldChange = (e) => {
    const stateKey = e.target.dataset.value
    const value = e.target.value
    setProfileFields((prev) => ({
      ...prev,
      [stateKey]: value,
    }))
  }

  const setPlaceholderText = (name) => {
    return `Add your ${name}...`
  }

  if (!user && !isAuthenticated && loading) return <Loading />
  return (
    <RouteWrapper id={'profile'} className={'profile'}>
      <div className="yourProfileContainer">
        <h1 className="title">Your Profile</h1>
        <div className="nameAndAvatarContainer">
          <h4 className="name">
            {profileFields.firstName + ' ' + profileFields.lastName}
            <p onClick={() => logoutUser(() => navigate('/login'))} className="sign-out">
              ✌🏼 Sign Out
            </p>
          </h4>
          <img className="avatar" src={userObj.avatar} alt="avatar" />
        </div>
      </div>

      {profileInputDataArr.map((inputData, index) => {
        return (
          <InputContainer
            name={inputData.name}
            input={
              <input
                type={'text'}
                value={profileFields[inputData.dataValue]}
                placeholder={setPlaceholderText(inputData.name)}
                data-value={inputData.dataValue}
                onChange={handleProfileFieldChange}
              />
            }
          />
        )
      })}
    </RouteWrapper>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(Profile)

const InputContainer = (props) => {
  const { name, input } = props
  return (
    <div className="inputContainer">
      <h4 className="inputName">{name}</h4>
      {input}
      {/* <div className="inputDivider"></div> */}
    </div>
  )
}

const profileInputDataArr = [
  {
    name: 'First Name',
    dataValue: 'firstName',
  },
  {
    name: 'Last Name',
    dataValue: 'lastName',
  },
  {
    name: 'Status',
    dataValue: 'status',
  },
  {
    name: 'Bio',
    info: 'Max 30 Characters',
    dataValue: 'bio',
  },
  {
    name: 'Website',
    dataValue: 'website',
  },
  {
    name: 'Location',
    dataValue: 'location',
  },
  {
    name: 'Instagram',
    dataValue: 'instagram',
  },
  {
    name: 'Twitter',
    dataValue: 'twitter',
  },
  {
    name: 'LinkedIn',
    dataValue: 'linkedin',
  },
]
