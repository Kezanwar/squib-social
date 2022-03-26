import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const LeftBar = (props) => {
  const { handleMobNavVis, mobNavVis, navRoute, handleNavRoute } = props
  const navigate = useNavigate()

  const updateRoute = (e) => {
    const val = e.target.dataset.value
    handleNavRoute(val)
    navigate(val === 'home' ? '/' : val)
  }

  return (
    <motion.aside
      transition={{ duration: 0.3, ease: 'easeOut' }}
      layout
      className="__leftBar"
    >
      <motion.h1 className="logo-text">squib</motion.h1>
      <motion.h1
        transition={{ duration: 0.3, ease: 'easeOut' }}
        layout
        className="logo-text mob"
      >
        s{mobNavVis ? 'quib' : ''}
      </motion.h1>

      <DesktopNav navRoute={navRoute} updateRoute={updateRoute} />
      <MobNav
        navRoute={navRoute}
        updateRoute={updateRoute}
        mobNavVis={mobNavVis}
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

export default LeftBar

const DesktopNav = (props) => {
  const { navRoute, updateRoute } = props
  return (
    <motion.nav
      className="desktopNav"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.button
        onClick={updateRoute}
        data-value={'/home'}
        data-visible={navRoute === '/home' ? 'true' : 'false'}
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
    </motion.nav>
  )
}

const MobNav = (props) => {
  const { navRoute, updateRoute, mobNavVis } = props
  return (
    <motion.nav
      layout
      className="mobileNav"
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
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
    </motion.nav>
  )
}
