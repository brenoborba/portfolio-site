import { cn } from '@/lib/utils'
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
    <ul className='relative flex w-fit rounded-full bg-neutral-900 p-1 shadow-lg dark:bg-neutral-100'>
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
      className={cn(
        'relative z-10 block cursor-pointer px-3 py-1 text-xs font-semibold uppercase text-neutral-100 antialiased mix-blend-difference md:px-5 md:py-3 md:text-base',
        {
          'active-tab': isActive,
        }
      )}
    >
      <Link href={navLink.href}>{children}</Link>
    </li>
  )
}

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={position}
      className='absolute z-0 h-7 rounded-full bg-neutral-100 md:h-12 dark:bg-neutral-900'
    ></motion.li>
  )
}
