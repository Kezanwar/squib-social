import React from 'react'
import { motion } from 'framer-motion'
import { v1 } from 'uuid'

const RouteWrapper = (props) => {
  const { className, id, children } = props
  return (
    <motion.section
      layout
      className={className ? className : ''}
      key={id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{
        duration: 0.1,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.section>
  )
}

export default RouteWrapper
