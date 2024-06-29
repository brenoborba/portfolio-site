import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState } from 'react'

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
  const pathname = usePathname()
  const homeRef = useRef<HTMLLIElement>(null)
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 1,
  })

  useEffect(() => {
    let activeLink = document.querySelector('.active-tab')
    if (pathname === '/' && homeRef.current) {
      activeLink = homeRef.current
    }

    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink as HTMLElement
      setPosition({
        left: offsetLeft,
        width: offsetWidth,
        opacity: 1,
      })
    }
  }, [pathname])

  return (
    <ul className='relative mx-auto flex w-fit rounded-full border-2 bg-neutral-50 p-1 shadow-lg'>
      {navLinks.map((navLink) => {
        const isActive = pathname === navLink.href
        return (
          <Tab
            isActive={isActive}
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

const Tab = ({
  children,
  navLink,
  setPosition,
  isActive,
}: {
  children: ReactNode
  navLink: NavLink
  setPosition: any
  isActive: boolean
}) => {
  const ref = useRef<HTMLLIElement>(null)
  return (
    <li
      ref={ref}
      onClick={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        })
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base antialiased font-semibold ${
        isActive ? 'active-tab' : ''
      }`}
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
