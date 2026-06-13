import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaEye, FaCalendarAlt } from 'react-icons/fa'
import doctor from '../data/doctorData'

// Dynamically load all images from the HERO folder
const modules = import.meta.glob('/src/assets/image/HERO/*.{png,jpg,jpeg}', { eager: true })
let heroImages = Object.keys(modules).sort().map(k => (modules[k] && (modules[k].default || modules[k])))
heroImages = heroImages.slice(0, 6)

export default function Hero() {
  const defaultTexts = [
    'Board-certified ophthalmologist with clinical and surgical expertise. Dedicated to patient-centered care and modern diagnostics.',
    'Advanced surgical and medical ophthalmology with a focus on evidence-based outcomes.',
    'Comprehensive care in cataract, glaucoma, strabismus and refractive treatments.',
    'State-of-the-art diagnostics and patient-centered surgical care.',
    'Holistic follow-up and personalized treatment plans.'
  ]

  const slides = heroImages.length > 0 ? heroImages.map((img, i) => ({
    image: img,
    title: doctor.name,
    subtitle: i === 0 ? doctor.title : 'Clinical Excellence • Patient-first Care',
    text: defaultTexts[i % defaultTexts.length]
  })) : [{ image: '', title: doctor.name, subtitle: doctor.title, text: '' }]

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const timerRef = React.useRef(null)
  const heroRef = useRef(null)

  // Minimum swipe distance (px)
  const minSwipeDistance = 50

  useEffect(() => {
    if (slides.length <= 1) return
    if (timerRef.current) clearInterval(timerRef.current)
    if (!paused) {
      timerRef.current = setInterval(() => setIndex(i => (i + 1) % slides.length), 5000)
    }
    return () => clearInterval(timerRef.current)
  }, [slides.length, paused])

  const current = slides[index]

  const go = (i) => {
    setIndex(i)
    setPaused(true)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setIndex(s => (s + 1) % slides.length), 5000)
    setTimeout(() => setPaused(false), 5000)
  }

  const prev = () => go((index - 1 + slides.length) % slides.length)
  const next = () => go((index + 1) % slides.length)

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      next()
    } else if (isRightSwipe) {
      prev()
    }
  }

  return (
    <section 
      ref={heroRef}
      className="relative w-full overflow-hidden" 
      onMouseEnter={() => setPaused(true)} 
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12 relative">
        {/* Prev/Next controls - always visible at container edges */}
        <button 
          aria-label="Previous" 
          onClick={prev} 
          className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full shadow-2xl hover:scale-110 transition-all bg-[var(--text)] text-[var(--bg)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button 
          aria-label="Next" 
          onClick={next} 
          className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full shadow-2xl hover:scale-110 transition-all bg-[var(--text)] text-[var(--bg)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Slide container - both card and image slide together */}
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
        >
          {/* Card Section */}
          <div className="w-full md:w-1/2">
            <div className="bg-[var(--card)]/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-[var(--border)]">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text)]">{current.title}</h1>
              <div className="text-sm md:text-base text-[var(--muted)] mt-1">{current.subtitle}</div>
              <p className="mt-3 text-sm md:text-base text-[var(--text)] leading-relaxed">{current.text}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="#work" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-yellow-500 text-white text-sm font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                  <FaEye /> <span>View Cases</span>
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border-2 border-[var(--accent-cyan)] text-sm text-[var(--text)] bg-[var(--accent-cyan)]/10 hover:bg-[var(--accent-cyan)]/20 transition-all font-semibold">
                  <FaCalendarAlt /> <span>Book Appointment</span>
                </a>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg filter brightness-90"
            />
          </div>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((s, i) => (
          <button 
            key={i} 
            aria-label={`Go to slide ${i + 1}`} 
            onClick={() => go(i)} 
            className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-gradient-to-r from-cyan-500 to-yellow-500 scale-125' : 'bg-gray-400'}`} 
          />
        ))}
      </div>
    </section>
  )
}
