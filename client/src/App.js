import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { isIOS, isMobile } from 'react-device-detect'
import LeftBar from './components/sidebars/LeftBar'
import Main from './components/main/Main'
import RightBar from './components/sidebars/RightBar'
import './App.scss'
import ProfileBar from './components/main/ProfileBar'
import SquibRoutes from './components/main/routes/SquibRoutes'
// redux
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layout/Alert'

const App = () => {
  const location = useLocation()
  const [mobNavVis, setMobNavVis] = useState(false)
  const handleMobNavVis = () => setMobNavVis((prev) => !prev)

  const [navRoute, setNavRoute] = useState(location.pathname)
  const handleNavRoute = (route) => setNavRoute(route)

  const classes = () => {
    return isIOS && isMobile ? 'App iosMob' : 'App'
  }

  return (
    <div className={mobNavVis ? `${classes()} mobNavVis` : `${classes()}`}>
      <Provider store={store}>
        <LayoutGroup>
          <LeftBar
            mobNavVis={mobNavVis}
            handleMobNavVis={handleMobNavVis}
            navRoute={navRoute}
            handleNavRoute={handleNavRoute}
          />
          <Main>
            <ProfileBar navRoute={navRoute} />
            <Alert />
            <AnimatePresence exitBeforeEnter initial={false}>
              <SquibRoutes location={location} />
            </AnimatePresence>
          </Main>
          <RightBar />
        </LayoutGroup>
      </Provider>
    </div>
  )
}

export default App
