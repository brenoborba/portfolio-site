import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode, useRef, useState } from 'react'

type NavLink = {
  title: string
  href: string
}

const navLinks: NavLink[] = [
  { title: 'Home', href: '/' },
  { title: 'Blogs', href: '/blogs' },
  { title: 'Portfolio', href: '/portfolio' },
  { title: 'About', href: '/about' },
]

type Position = {
  left: number
  width: number
  opacity: number
}

export const SlideTabs = () => {
  const [position, setPosition] = useState<Position>({
    left: 4,
    width: 88.53125,
    opacity: 1,
  })
  return (
    <ul className='relative mx-auto flex w-fit rounded-full border-2 bg-neutral-50 p-1 shadow-lg'>
      {navLinks.map((navLink) => {
        return (
          <Tab
            setPosition={setPosition}
            key={navLink.title}
            navLink={navLink}
          >
            {navLink.title}
          </Tab>
        )
      })}
      <Cursor position={position} />
    </ul>
  )
}

const Tab = ({ children, navLink, setPosition }: { children: ReactNode; navLink: NavLink; setPosition: any }) => {
  const ref = useRef<HTMLLIElement>(null)
  return (
    <li
      ref={ref}
      onClick={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        console.log(ref.current.offsetLeft, width)
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        })
      }}
      className='relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base antialiased font-semibold'
    >
      <Link href={navLink.href}>{children}</Link>
    </li>
  )
}

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={position}
      className='absolute z-0 h-7 rounded-full bg-black md:h-12'
    ></motion.li>
  )
}
