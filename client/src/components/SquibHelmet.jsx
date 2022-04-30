import Helmet from 'react-helmet'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { capitalizeFirstLetter } from '../utilities/utilities'

export default function SquibHelmet(props) {
  const location = useLocation()
  //   console.dir(location)
  const pathTitle =
    location.pathname === '/' ? 'Home' : capitalizeFirstLetter(location.pathname.split('/')[1])
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Squib | {pathTitle}</title>
    </Helmet>
  )
}
