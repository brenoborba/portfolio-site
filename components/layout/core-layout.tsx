'use client'
import React from 'react'
import DarkModeSwitch from './dark-mode-switch'
import { motion } from 'framer-motion'
import { SlideTabs } from './slide-tabs'

type Props = {
  children: React.ReactNode
}

const CoreLayout = (props: Props) => {
  return (
    <motion.div className='flex h-screen flex-col bg-neutral-50 px-[10%] pb-4 text-neutral-950 xl:px-[15%] dark:invert'>
      <header className='min-h-auto flex w-full items-center justify-between py-4'>
        <h1 className='hidden text-4xl md:block'>Logo</h1>
        <SlideTabs />
        <DarkModeSwitch />
      </header>
      <main className='border-1 min-h-auto flex-1 rounded-lg border border-neutral-500/20 p-4 antialiased'>
        {props.children}
      </main>
    </motion.div>
  )
}

export default CoreLayout
