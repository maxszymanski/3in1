import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav/Nav'
import BgHero from '@/components/ui/BgHero'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: '3in1',
	description: 'Zadanie rekrutacyjne',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pl">
			<body
				className={`${geistSans.className} text-primary bg-bgWhite  antialiased flex flex-col min-h-dvh lg:min-h-screen`}>
				<Nav />
				<main className="wrapper w-full flex-1 px-4 pb-20 pt-24 lg:flex lg:items-start lg:justify-between lg:pb-20 lg:pt-32 xl:px-0">
					<BgHero />
					{children}
					<BgHero />
				</main>
			</body>
		</html>
	)
}
