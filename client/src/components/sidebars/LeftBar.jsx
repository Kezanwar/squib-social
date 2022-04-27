import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import DesktopNav from './DesktopNav'
import MobNav from './MobNav'

const LeftBar = (props) => {
  const { handleMobNavVis, mobNavVis, auth } = props
  const navigate = useNavigate()
  const navRoute = window.location.pathname

  const updateRoute = (e) => {
    const val = e.target.dataset.value
    navigate(val)
  }

  const logout = () => {}

  const handleLoginRegisterDataVis = (route) => {
    if (route === '/login') return true
    if (route === '/register') return true
    else return false
  }
  return (
    <motion.aside transition={{ duration: 0.3, ease: 'easeOut' }} layout className="__leftBar">
      <motion.h1 className="logo-text">squib</motion.h1>
      <motion.h1 transition={{ duration: 0.3, ease: 'easeOut' }} layout className="logo-text mob">
        s{mobNavVis ? 'quib' : ''}
      </motion.h1>

      <DesktopNav
        navRoute={navRoute}
        updateRoute={updateRoute}
        loginRegisterDataVis={handleLoginRegisterDataVis(navRoute)}
        auth={auth}
        logout={logout}
      />
      <MobNav
        auth={auth}
        logout={logout}
        navRoute={navRoute}
        updateRoute={updateRoute}
        mobNavVis={mobNavVis}
        loginRegisterDataVis={handleLoginRegisterDataVis(navRoute)}
      />

      <motion.button
        onClick={() => handleMobNavVis()}
        className="mobNavBtn"
        transition={{ duration: 0.3, ease: 'easeOut' }}
        layout
      >
        <i class={!mobNavVis ? 'fas fa-arrow-right' : 'fas fa-arrow-left'}></i>
      </motion.button>
    </motion.aside>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, null)(LeftBar)
