import React, { useEffect, useState } from 'react'
import Post from '../../../layout/Post'
import { connect } from 'react-redux'
import RouteWrapper from '../../../layout/RouteWrapper'
import { useNavigate } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../../../utilities/utilities'
import { logoutUser } from '../../../../actions/auth'
import { setAlert } from '../../../../actions/alert'
import Loading from '../../Loading'
import axios from 'axios'
import { HEADERS } from '../../../../utilities/axiosConfig'

const Profile = (props) => {
  const { auth, logoutUser, setAlert } = props
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

  const [profLoading, setProfLoading] = useState(true)

  useEffect(() => {
    if (!user && !isAuthenticated && !loading) {
      navigate('/login')
    }
    if (isAuthenticated && user && !loading) {
      const splitNameArr = user.name ? user.name.split(' ') : ''
      const firstName = capitalizeFirstLetter(splitNameArr[0])
      const lastName = capitalizeFirstLetter(splitNameArr[1])
      setUserObj(user)
      axios({
        url: 'api/profile/me',
        method: 'get',
        headers: HEADERS.AUTH,
      })
        .then((res) => {
          console.log(res.data)
          const { status, bio, website, location, instagram, twitter, linkedin } = res.data
          setProfileFields((prev) => ({
            ...prev,
            firstName: { ...prev.firstName, value: firstName },
            lastName: { ...prev.lastName, value: lastName },
            status: { ...prev.status, value: status ? status : prev.status.value },
            bio: { ...prev.bio, value: bio ? bio : prev.bio.value },
            website: { ...prev.website, value: website ? website : prev.website.value },
            location: { ...prev.location, value: location ? location : prev.location.value },
            instagram: { ...prev.instagram, value: instagram ? instagram : prev.instagram.value },
            twitter: { ...prev.twitter, value: twitter ? twitter : prev.twitter.value },
            linkedin: { ...prev.linkedin, value: linkedin ? linkedin : prev.linkedin.value },
          }))
          setProfLoading(false)
        })
        .catch((err) => {
          if (err?.response?.data?.msg === 'There is no profile for this user') {
            setProfileFields((prev) => ({
              ...prev,
              firstName: { ...prev.firstName, value: firstName },
              lastName: { ...prev.lastName, value: lastName },
            }))
            setProfLoading(false)
            return
          }
          setAlert(err?.response?.data?.msg, 'error')
        })
    }
  }, [user, isAuthenticated])

  const [profileFields, setProfileFields] = useState({
    firstName: {
      value: '',
      max: 12,
    },
    lastName: {
      value: '',
      max: 12,
    },
    status: {
      value: 'Online',
      max: 20,
    },
    bio: {
      value: '',
      max: 120,
    },
    website: {
      value: '',
      max: 30,
    },
    location: {
      value: '',
      max: 30,
    },
    instagram: {
      value: '',
      max: 20,
    },
    twitter: {
      value: '',
      max: 20,
    },
    linkedin: {
      value: '',
      max: 20,
    },
  })

  const handleProfileFieldChange = (e) => {
    const stateKey = e.target.dataset.value
    const value = e.target.value
    if (value.length - 1 >= profileFields[stateKey].max) return
    setProfileFields((prev) => ({
      ...prev,
      [stateKey]: { ...prev[stateKey], value: value },
    }))
  }

  const setPlaceholderText = (name) => {
    return `Add your ${name}...`
  }

  const handleUpdateProfile = () => {}

  if (!user && !isAuthenticated && loading) return <Loading />
  if (profLoading) return <Loading />
  return (
    <RouteWrapper id={'profile'} className={'profile'}>
      <div className="yourProfileContainer">
        <h1 className="title">Your Profile</h1>
        <div className="nameAndAvatarContainer">
          <h4 className="name">
            {profileFields.firstName.value + ' ' + profileFields.lastName.value}
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
            max={profileFields[inputData.dataValue].max}
            length={profileFields[inputData.dataValue].value.length}
            input={
              inputData.name === 'Bio' ? (
                <textarea
                  value={profileFields[inputData.dataValue].value}
                  placeholder={setPlaceholderText(inputData.name)}
                  data-value={inputData.dataValue}
                  onChange={handleProfileFieldChange}
                  rows={4}
                  style={{ resize: 'vertical' }}
                />
              ) : (
                <input
                  type={'text'}
                  value={profileFields[inputData.dataValue].value}
                  placeholder={setPlaceholderText(inputData.name)}
                  data-value={inputData.dataValue}
                  onChange={handleProfileFieldChange}
                />
              )
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

export default connect(mapStateToProps, { logoutUser, setAlert })(Profile)

const InputContainer = (props) => {
  const { name, input, length, max } = props
  return (
    <div className="inputContainer">
      <div className="__nameCountContainer">
        <h4 className="name">{name}</h4>
        <p className={length === max ? 'count blue-link' : 'count'}>
          {length} / {max}
        </p>
      </div>

      {input}
      {/* <div className="inputDivider"></div> */}
    </div>
  )
}

const profileInputDataArr = [
  {
    name: 'First Name',
    dataValue: 'firstName',
    max: 12,
  },
  {
    name: 'Last Name',
    dataValue: 'lastName',
    max: 12,
  },
  {
    name: 'Status',
    dataValue: 'status',
    max: 12,
  },
  {
    name: 'Bio',
    dataValue: 'bio',
    max: 50,
  },
  {
    name: 'Website',
    dataValue: 'website',
    max: 20,
  },
  {
    name: 'Location',
    dataValue: 'location',
    max: 20,
  },
  {
    name: 'Instagram',
    dataValue: 'instagram',
    max: 20,
  },
  {
    name: 'Twitter',
    dataValue: 'twitter',
    max: 20,
  },
  {
    name: 'Linked In',
    dataValue: 'linkedin',
    max: 20,
  },
]
