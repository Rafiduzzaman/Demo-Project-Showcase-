"use client"
import React from 'react'
import Image from 'next/image'
import CarouselGallery from './CarouselGallery'
import { motion } from 'framer-motion'

export default function Gallery({ images = [], videoUrl }: { images?: string[], videoUrl?: string }) {
  return (
    <div className="mt-4">
      {videoUrl && (
        <div className="mb-4">
          <iframe className="w-full aspect-video rounded" src={videoUrl} title="Video demo" allowFullScreen />
        </div>
      )}

      {images && images.length > 0 && (
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <CarouselGallery images={images} />
          </motion.div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            {images.map((src, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative h-24 rounded overflow-hidden glass-card">
                <Image src={src} alt={`thumb-${i}`} fill style={{ objectFit: 'cover' }} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
