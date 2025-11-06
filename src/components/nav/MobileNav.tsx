'use client'

import { TbMenu2, TbX } from 'react-icons/tb'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import NavList from './NavList'
import Link from 'next/link'

export interface NavProps {
	toogleNav: () => void
	isExpanded: boolean
	closeNav: () => void
}

function MobileNav({ toogleNav, isExpanded, closeNav }: NavProps) {
	const pathname = usePathname()

	useEffect(() => {
		closeNav()
	}, [pathname, closeNav])

	return (
		<div className="relative h-[53px] w-full md:hidden">
			<div className="border-grayscale bg-whiteBg relative z-50 flex items-center justify-between border-b px-4 pb-2 pt-3 lg:border-0">
				<Link href="/" className="text-purple-400 font-semibold text-3xl my-outline">
					3in1
				</Link>
				<button
					className="my-outline text-dark flex size-8 shrink-0 items-center justify-center rounded-full ring-purple-400 duration-300"
					onClick={toogleNav}
					aria-label={`${isExpanded ? 'Zamknij' : 'Otwórz'} menu nawigacji`}>
					{isExpanded ? (
						<TbX className="pointer-events-none size-6" />
					) : (
						<TbMenu2 className="pointer-events-none size-6" />
					)}
				</button>
			</div>

			<div
				className={`text-primary bg-whiteBg sticky z-40 flex flex-col gap-8 px-4 py-6 transition-transform duration-300 ${
					isExpanded ? 'translate-y-0' : '-translate-y-[140%]'
				}`}>
				<NavList />
			</div>
		</div>
	)
}

export default MobileNav
