import React from 'react'
import { motion } from 'framer-motion'

const Main = (props) => {
  return (
   <motion.main transition={{duration: 0.3, ease: "easeOut"}}  layout className="__main">
     {props.children}
   </motion.main>
  )
}

export default Main