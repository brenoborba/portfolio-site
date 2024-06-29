'use client'
import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode
}

const Template = (props: Props) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.2 }}
    >
      {props.children}
    </motion.div>
  )
}

export default Template
