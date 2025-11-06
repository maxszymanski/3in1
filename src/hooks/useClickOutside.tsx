import { useEffect } from 'react'

export default function useClickOutside(
    ref: React.RefObject<HTMLDivElement | null> | null,
    mutation: () => void,
    stopReset = false
) {
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as HTMLElement

            if (!ref?.current || stopReset) return
            if (ref.current.contains(target)) return

            if (ref?.current && !ref.current.contains(target)) {
                mutation()
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [ref, mutation, stopReset])
}
