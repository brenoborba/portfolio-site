'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SlideTabs } from './slide-tabs'

type Props = {
  children: React.ReactNode
}

const CoreLayout = (props: Props) => {
  return (
    <div className='flex flex-col h-screen xl:px-[15%] px-[10%]'>
      <header className='min-h-auto py-4'>
        <SlideTabs />
      </header>
      <main className='flex-1 min-h-full border border-neutral-100'>{props.children}</main>
    </div>
  )
}

export default CoreLayout
