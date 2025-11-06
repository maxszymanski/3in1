'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import useClickOutside from '@/hooks/useClickOutside'
import { createPortal } from 'react-dom'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'

function Nav() {
	const [show, setShow] = useState(true)
	const navRef = useRef(null)
	const [lastScrollY, setLastScrollY] = useState(0)
	const [isExpanded, setIsExpanded] = useState(false)
	const [hasBorder, setHasBorder] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const currentY = window.scrollY
			const triggerScroll = 0

			if (currentY > triggerScroll) {
				if (currentY > lastScrollY) {
					setShow(false)
					setIsExpanded(false)
				} else {
					setShow(true)
				}
			} else {
				setShow(true)
			}

			setHasBorder(currentY > 0)

			setLastScrollY(currentY)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [lastScrollY, isExpanded])

	const toogleNav = () => {
		setIsExpanded(is => !is)
	}
	const closeNav = useCallback(() => {
		setIsExpanded(false)
	}, [])

	useClickOutside(navRef, closeNav)
	return (
		<nav
			className={`bg-whiteBg duration-400 fixed top-0 z-50 w-full transition-transform ${
				show ? 'translate-y-0' : '-translate-y-full'
			}`}>
			<div className={`wrapper ${hasBorder ? 'lg:border-gray-100 lg:border-b' : ''}`} ref={navRef}>
				<MobileNav isExpanded={isExpanded} toogleNav={toogleNav} closeNav={closeNav} />
				<DesktopNav />
			</div>
			{isExpanded &&
				createPortal(
					<div className="fixed bg-black/10 inset-0 z-40 backdrop-blur-sm lg:hidden"></div>,
					document.body
				)}
		</nav>
	)
}

export default Nav
