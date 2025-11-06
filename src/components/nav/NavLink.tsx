import Link from 'next/link'

function NavLink({ href, name, isActive }: { href: string; name: string; isActive: boolean }) {
	return (
		<li>
			<Link
				className={`my-outline hover:text-dark  text-nowrap p-1 text-base font-medium leading-[140%] ring-purple-400 transition-colors duration-300 ${
					isActive ? 'text-purple-400' : 'text-primary'
				}`}
				href={href}>
				{name}
			</Link>
		</li>
	)
}

export default NavLink
