"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function FloatingContact() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.4, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          {/* Pulsing rings */}
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute inset-0 rounded-full bg-cyan-500/20"
              animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, delay: i * 0.7, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}

          <Link href="/contact" aria-label="Contact me">
            <motion.button
              className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.94 }}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
            >
              <motion.span
                key={hovered ? 'talk' : 'contact'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {hovered ? "Let's Talk!" : 'Contact'}
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
