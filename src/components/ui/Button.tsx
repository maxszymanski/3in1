interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void) | undefined
	children: React.ReactNode
	restClass?: string
	variant?: 'purple' | 'danger' | 'edit'
}

const mainClass =
	'text-white  rounded-lg  disabled:opacity-50 transition-colors duration-300 my-outline cursor-pointer text-sm sm:text-base disabled:cursor-not-allowed'

const variants = {
	purple: 'hover:bg-purple-600 bg-purple-500 px-4 py-2 ',
	danger: 'bg-red-500 hover:bg-red-600 px-4 py-2',
	'edit': 'bg-transparent shrink-0 border border-gray-300 p-1 hover:bg-gray-200'
}

function Button({
	onClick,
	children,
	restClass = '',
	variant = 'purple',

	...rest
}: ButtonProps) {
	const variantClass = variants[variant] || variants.purple

	return (
		<button onClick={onClick} className={`${mainClass} ${restClass} ${variantClass}`} {...rest}>
			{children}
		</button>
	)
}

export default Button
