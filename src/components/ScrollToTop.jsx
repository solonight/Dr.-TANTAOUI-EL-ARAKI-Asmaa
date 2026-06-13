import React, { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      if (y < lastY && y > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
      setLastY(y)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed right-4 bottom-[184px] md:right-6 md:bottom-[216px] z-[9998] w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--accent-cyan)] text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      aria-label="Scroll to top"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
