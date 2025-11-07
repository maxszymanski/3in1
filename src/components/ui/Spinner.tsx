function Spinner({ restClass = '', variant='large' }: { restClass?: string, variant?: 'small' | 'large' }) {
	return (
		<span
			className={` animate-spin rounded-full border-4 border-gray-300 border-t-purple-400 ${variant==='small' ? 'size-5' : 'size-10'} ${restClass}`}></span>
	)
}

export default Spinner
