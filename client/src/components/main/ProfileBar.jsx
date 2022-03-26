import React from 'react'
import { motion } from 'framer-motion'
import { capitalizeFirstLetter } from '../../utilities/utilities'

const ProfileBar = (props) => {
  const { navRoute } = props
  return (
    <motion.header
      layout
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="profileBar"
    >
      <p>{capitalizeFirstLetter(navRoute)}</p>
    </motion.header>
  )
}

export default ProfileBar
