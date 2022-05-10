import React from 'react'
import { motion } from 'framer-motion'

const MobNav = (props) => {
  const {
    navRoute,
    updateRoute,
    mobNavVis,
    loginRegisterDataVis,
    auth,
    logout,
  } = props
  return (
    <motion.nav
      layout
      className="mobileNav"
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <motion.button
        onClick={updateRoute}
        data-value={'/'}
        data-visible={navRoute === '/' ? 'true' : 'false'}
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
      {auth && auth.isAuthenticated && auth.user && (
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
      )}

      {auth && auth.isAuthenticated && auth.user ? (
        ''
      ) : (
        <motion.button
          onClick={
            auth && auth.isAuthenticated && auth.user ? logout : updateRoute
          }
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
              {auth && auth.isAuthenticated && auth.user ? 'Log Out' : 'Log In'}
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
      )}
    </motion.nav>
  )
}

export default MobNav
