import React, { useEffect, useState } from 'react'
import { motion, useAnimation, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils'

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
}

const DarkModeSwitch = () => {
  const [dark, setDark] = useState(false)
  const toggleDarkMode = () => {
    setDark(!dark)
    document.body.classList.toggle('dark')
  }

  console.log(dark)
  return (
    <div
      className={cn('flex h-8 w-14 cursor-pointer items-center rounded-full bg-neutral-900 p-1.5 dark:bg-neutral-100', {
        'justify-end': dark,
      })}
      onClick={toggleDarkMode}
    >
      <motion.div
        className='h-6 w-6 rounded-full bg-neutral-100 shadow-md dark:bg-neutral-900'
        layout
        transition={spring}
      />
    </div>
  )
}

export default DarkModeSwitch
