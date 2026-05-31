"use client"
import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

export default function CarouselGallery({ images = [] }: { images: string[] }) {
  if (!images || images.length === 0) return null
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    // autoplay simple
    if (!emblaApi) return
    let raf = 0
    let mounted = true
    const play = () => {
      if (!mounted) return
      emblaApi.scrollNext()
      raf = window.setTimeout(play, 3000)
    }
    raf = window.setTimeout(play, 3000)
    return () => { mounted = false; clearTimeout(raf) }
  }, [emblaApi])

  return (
    <div className="embla overflow-hidden rounded">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex">
          {images.map((src, i) => (
            <div key={i} className="embla__slide flex-shrink-0 w-full relative h-64 sm:h-96">
              <Image src={src} alt={`slide-${i}`} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
