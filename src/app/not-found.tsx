import { redirect } from 'next/navigation'

function notFound() {
 redirect('/')

	return null
}

export default notFound
