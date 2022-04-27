import React from 'react'
import { motion } from 'framer-motion'

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

export default DesktopNav
