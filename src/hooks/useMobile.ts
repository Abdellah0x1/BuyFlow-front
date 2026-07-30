import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useMobile() {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const mediaQeury = window.matchMedia(`(max-width : ${MOBILE_BREAKPOINT - 1}px)`)
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }
        mediaQeury.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        return () => {
            mediaQeury.removeEventListener("change", onChange)
        }
    }, [])
    return {
        isMobile
    }
}