import React from 'react'
import { motion } from 'framer-motion'

export default function MotionDiv(props) {
  const { className, children } = props
  return (
    <motion.div
      transition={{ duration: 0.3, ease: 'easeOut' }}
      layout
      className={className}
    >
      {children}
    </motion.div>
  )
}
