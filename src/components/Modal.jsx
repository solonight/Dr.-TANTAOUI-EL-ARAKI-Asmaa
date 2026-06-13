import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ open, onClose, items = [], startIndex = 0 }) {
  const [idx, setIdx] = useState(startIndex)
  const [lightbox, setLightbox] = useState(false)
  const [showBefore, setShowBefore] = useState(true)

  useEffect(() => {
    if (open) {
      setIdx(startIndex)
      setShowBefore(true)
    }
  }, [open, startIndex])

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(false)
        else onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, idx, lightbox, onClose])

  // Preload images
  useEffect(() => {
    if (items.length > 0) {
      items.forEach((item) => {
        const img1 = new Image()
        img1.src = item.beforeImage
        const img2 = new Image()
        img2.src = item.afterImage
      })
    }
  }, [items])

  const next = () => {
    if (!items.length) return
    setLightbox(false)
    setShowBefore(true)
    if (idx < items.length - 1) setIdx(i => i + 1)
    else setIdx(0)
  }
  const prev = () => {
    if (!items.length) return
    setLightbox(false)
    setShowBefore(true)
    if (idx > 0) setIdx(i => i - 1)
    else setIdx(items.length - 1)
  }

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x
    if (offset < -100) next()
    else if (offset > 100) prev()
  }

  if (!open) return null

  const current = items[idx]
  const currentImage = showBefore ? current.beforeImage : current.afterImage

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />

          <motion.div className="relative z-50 max-w-4xl w-full mx-4 bg-[var(--card)] rounded-lg overflow-hidden shadow-xl" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}>
            <div className="p-4 flex flex-col md:flex-row items-start gap-4">
              <div className="flex-1">
                <motion.div className="relative h-72 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden" drag="x" onDragEnd={handleDragEnd} whileTap={{ cursor: 'grabbing' }}>
                  <motion.img 
                    src={currentImage} 
                    alt={showBefore ? "Before" : "After"} 
                    className="object-cover w-full h-full rounded" 
                    onClick={() => setLightbox(true)} 
                    loading="eager"
                  />
                  <button
                    onClick={() => setShowBefore(prev => !prev)}
                    className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/80 text-sm px-3 py-1 rounded-full backdrop-blur text-gray-900 dark:text-white shadow-md"
                  >
                    {showBefore ? 'Show After' : 'Show Before'}
                  </button>
                </motion.div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2">
                    <button onClick={prev} className="px-3 py-1 bg-[var(--accent)] text-white rounded hover:opacity-90">Prev Case</button>
                    <button onClick={next} className="px-3 py-1 bg-[var(--accent)] text-white rounded hover:opacity-90">Next Case</button>
                  </div>
                  <div className="text-sm text-[var(--muted)]">Case {idx + 1} / {items.length}</div>
                </div>
              </div>

              <div className="w-full md:w-80">
                <div className="font-semibold text-[var(--text)]">{current.title}</div>
                <div className="text-[var(--muted)] text-sm mb-2">{current.procedure}</div>
                <div className="text-sm text-[var(--muted)]">{current.description}</div>
                <div className="mt-4 flex gap-2">
                  <button onClick={onClose} className="px-4 py-2 bg-[var(--accent)] text-white rounded hover:opacity-90">Close</button>
                </div>
              </div>
            </div>
          </motion.div>

          {lightbox && (
            <motion.div className="fixed inset-0 z-[60] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-black/95" onClick={() => setLightbox(false)} />
              <motion.img 
                src={currentImage} 
                className="max-w-[95%] max-h-[90%] rounded-lg shadow-2xl" 
                initial={{ scale: 0.95 }} 
                animate={{ scale: 1 }} 
                exit={{ scale: 0.95 }} 
                alt={showBefore ? "Before" : "After"}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
