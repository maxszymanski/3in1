import { usePathname } from 'next/navigation'
import NavLink from './NavLink'

const list = [
	{ name: 'Edytor', href: '/' },
	{ name: 'Walidator', href: '/walidator' },
	{ name: 'Lista użytkowników', href: '/lista-uzytkownikow' },
]

function NavList() {
	const pathname = usePathname()

	return (
		<ul className={`flex flex-col gap-5 md:flex-row md:gap-1 lg:gap-10 `}>
			{list.map(l => (
				<NavLink key={l.href} {...l} isActive={pathname === l.href} />
			))}
		</ul>
	)
}

export default NavList
