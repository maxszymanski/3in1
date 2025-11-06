import Image from 'next/image'
import HeroImage from '@/assets/main-bg.png'

function BgHero() {
	return (
		<div className="relative hidden min-h-[690px] w-[220px] shrink-0 lg:block">
			<Image fill src={HeroImage} alt="" role="presentation" className="object-cover" quality={90} priority />
		</div>
	)
}

export default BgHero
