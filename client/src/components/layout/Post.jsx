import React from 'react'
import {motion} from 'framer-motion'

export default function Post() {
  return (
    <motion.div transition={{duration: 0.3, ease: "easeOut"}} layout className="post">
      Hello</motion.div>
  )

}
