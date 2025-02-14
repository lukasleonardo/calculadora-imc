"use client"

import { useState, useRef, useEffect, use, useCallback } from "react"

export function useTextOverflow() {
    const [isOverflowing, setIsOverflowing] = useState(false)
    const containerRef = useRef<HTMLDivElement| null>(null)
    const textRef = useRef<HTMLSpanElement| null>(null)

    const checkOverflow = useCallback(() => {
        const text = textRef.current
        const container = containerRef.current

        if (!text || !container) return
        
        setIsOverflowing(text.scrollWidth > container.clientWidth)
    }, [textRef.current, containerRef.current])
    
    useEffect(() => {
        checkOverflow()
        window.addEventListener("resize", checkOverflow)

        const resizeObserver = new ResizeObserver(checkOverflow)
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        return () => {
            window.removeEventListener("resize", checkOverflow)
            resizeObserver.disconnect()
        }

    }, [checkOverflow])


    return { isOverflowing, containerRef, textRef }
}