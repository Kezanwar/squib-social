import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

const LeftBar = (props) => {
  const { handleMobNavVis, mobNavVis, auth } = props
  const navigate = useNavigate()
  const navRoute = window.location.pathname

  const updateRoute = (e) => {
    const val = e.target.dataset.value
    navigate(val)
  }

  const logout = () => {
    window.localStorage.removeItem('token')
  }

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

      {/* <p className="devMsg">developed by <span>kez anwar</span></p> */}
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

const DesktopNav = (props) => {
  const { navRoute, updateRoute, auth, logout, loginRegisterDataVis } = props

  return (
    <motion.nav className="desktopNav" transition={{ duration: 0.3, ease: 'easeOut' }}>
      <motion.button
        onClick={updateRoute}
        data-value={'/'}
        data-visible={navRoute === '/' ? 'true' : 'false'}
        className="navBtn"
      >
        <p>Home </p> <i class="fa-solid fa-house-chimney-window"></i>
      </motion.button>

      <motion.button
        onClick={updateRoute}
        data-value={'/discover'}
        data-visible={navRoute === '/discover' ? 'true' : 'false'}
        className="navBtn"
      >
        <p>Discover </p>
        <i class="fa-solid fa-magnifying-glass"></i>
      </motion.button>

      <motion.button
        onClick={updateRoute}
        data-value={'/profile'}
        data-visible={navRoute === '/profile' ? 'true' : 'false'}
        className="navBtn"
      >
        <p>Profile </p>
        <i class="fa-solid fa-user-pen"></i>
      </motion.button>

      <motion.button
        onClick={auth && auth.isAuthenticated && auth.user ? logout : updateRoute}
        data-value={'/login'}
        data-visible={loginRegisterDataVis}
        className="navBtn"
      >
        <p>{auth && auth.isAuthenticated && auth.user ? 'Sign out' : 'Log in'}</p>
        <i class="fa-solid fa-arrow-right-to-bracket"></i>
      </motion.button>
    </motion.nav>
  )
}

const MobNav = (props) => {
  const { navRoute, updateRoute, mobNavVis, loginRegisterDataVis, auth, logout } = props
  return (
    <motion.nav layout className="mobileNav" transition={{ duration: 0.25, ease: 'easeOut' }}>
      <motion.button
        onClick={updateRoute}
        data-value={'/home'}
        data-visible={navRoute === '/home' ? 'true' : 'false'}
        className="navBtn"
      >
        {mobNavVis ? (
          <motion.p
            layout
            key="hometext"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
            }}
          >
            Home{' '}
          </motion.p>
        ) : (
          ''
        )}
        <motion.i
          layout
          transition={{
            duration: 0.3,
          }}
          class="fa-solid fa-house-chimney-window"
        ></motion.i>
      </motion.button>

      <motion.button
        onClick={updateRoute}
        data-value={'/discover'}
        data-visible={navRoute === '/discover' ? 'true' : 'false'}
        className="navBtn"
      >
        {mobNavVis ? (
          <motion.p
            layout
            key="discovertext"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
            }}
          >
            Discover{' '}
          </motion.p>
        ) : (
          ''
        )}
        <motion.i
          transition={{
            duration: 0.3,
          }}
          layout
          class="fa-solid fa-magnifying-glass"
        ></motion.i>
      </motion.button>

      <motion.button
        onClick={updateRoute}
        data-value={'/profile'}
        data-visible={navRoute === '/profile' ? 'true' : 'false'}
        className="navBtn"
      >
        {mobNavVis ? (
          <motion.p
            layout
            key="profiletext"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
            }}
          >
            Profile{' '}
          </motion.p>
        ) : (
          ''
        )}
        <motion.i
          transition={{
            duration: 0.3,
          }}
          layout
          class="fa-solid fa-user-pen"
        ></motion.i>
      </motion.button>
      <motion.button
        onClick={auth && auth.isAuthenticated && auth.user ? logout : updateRoute}
        data-value={'/login'}
        data-visible={loginRegisterDataVis}
        className="navBtn"
      >
        {mobNavVis ? (
          <motion.p
            layout
            key="lgintext"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
            }}
          >
            Login{' '}
          </motion.p>
        ) : (
          ''
        )}
        <motion.i
          transition={{
            duration: 0.3,
          }}
          layout
          class="fa-solid fa-arrow-right-to-bracket"
        ></motion.i>
      </motion.button>
    </motion.nav>
  )
}
