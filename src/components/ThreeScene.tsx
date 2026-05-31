"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, ContactShadows, useGLTF } from '@react-three/drei'

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url)
  return <primitive object={gltf.scene} scale={1.2} position={[0, -0.05, 0]} />
}

export default function ThreeScene() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReduced(mq.matches)
      const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
      mq.addEventListener?.('change', handler)
      return () => mq.removeEventListener?.('change', handler)
    }
  }, [])

  return (
    <div className="w-full h-72 rounded-[1.5rem] overflow-hidden border border-white/10 bg-white/5">
      <Canvas shadows camera={{ position: [0, 1.5, 3], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Float rotationIntensity={0.6} speed={reduced ? 0 : 1.2} floatIntensity={reduced ? 0 : 0.6}>
            <Model url="/models/duck.glb" />
          </Float>
          <ContactShadows position={[0, -0.8, 0]} opacity={0.6} blur={2} far={5} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate={!reduced} autoRotateSpeed={0.45} />
      </Canvas>
    </div>
  )
}

