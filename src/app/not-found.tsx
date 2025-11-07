import { redirect } from 'next/navigation'

function notFound() {
	redirect('/')
}

export default notFound
