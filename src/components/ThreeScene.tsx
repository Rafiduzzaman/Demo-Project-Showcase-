"use client"
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, ContactShadows, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

function NeuralConnections({ nodePositions }: { nodePositions: [number, number, number][] }) {
  const segments = useMemo(() => {
    const pts: number[] = []
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 2; j < nodePositions.length; j += 3) {
        pts.push(...nodePositions[i], ...nodePositions[j])
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    const mat = new THREE.LineBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.22 })
    return new THREE.LineSegments(geo, mat)
  }, [nodePositions])

  return <primitive object={segments} />
}

function DataSculpture({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null)
  const ringA = useRef<Group>(null)
  const ringB = useRef<Group>(null)
  const ringC = useRef<Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  const nodePositions = useMemo<[number, number, number][]>(() =>
    Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2
      return [Math.cos(angle) * 2.05, 0.65 * Math.sin(i), Math.sin(angle) * 2.05]
    }), [])

  useFrame((state, delta) => {
    if (reduced) return
    if (group.current) {
      group.current.rotation.y += delta * 0.15
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.28
    if (ringB.current) ringB.current.rotation.z -= delta * 0.22
    if (ringC.current) {
      ringC.current.rotation.x += delta * 0.16
      ringC.current.rotation.z += delta * 0.09
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.22
      coreRef.current.rotation.z += delta * 0.14
    }
  })

  return (
    <group ref={group}>
      {/* Core icosahedron */}
      <mesh ref={coreRef} castShadow>
        <icosahedronGeometry args={[0.58, 3]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0c4a6e"
          emissiveIntensity={0.9}
          metalness={0.9}
          roughness={0.08}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[0.65, 2]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.13} />
      </mesh>

      {/* Ring A – horizontal orbit */}
      <group ref={ringA}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[1.15, 0.055, 16, 120]} />
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.9}
            roughness={0.08}
            emissive="#0891b2"
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>

      {/* Ring B – vertical orbit */}
      <group ref={ringB}>
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.88, 0.045, 16, 120]} />
          <meshStandardMaterial
            color="#a78bfa"
            metalness={0.88}
            roughness={0.12}
            emissive="#6d28d9"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Ring C – diagonal orbit (new) */}
      <group ref={ringC}>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} castShadow>
          <torusGeometry args={[1.38, 0.035, 16, 120]} />
          <meshStandardMaterial
            color="#f472b6"
            metalness={0.85}
            roughness={0.15}
            emissive="#be185d"
            emissiveIntensity={0.25}
            transparent
            opacity={0.78}
          />
        </mesh>
      </group>

      {/* Data bars */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 1.65 + (i % 2) * 0.14
        const height = 0.8 + (i % 4) * 0.2
        const colors = ['#38bdf8', '#c084fc', '#4ade80']
        const emissives = ['#075985', '#581c87', '#14532d']
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, -0.12 + (i % 3) * 0.06, Math.sin(angle) * radius]}
            rotation={[0, angle, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.038, 0.038, height, 8]} />
            <meshStandardMaterial
              color={colors[i % 3]}
              metalness={0.65}
              roughness={0.28}
              emissive={emissives[i % 3]}
              emissiveIntensity={0.18}
            />
          </mesh>
        )
      })}

      {/* Node spheres */}
      {nodePositions.map(([x, y, z], i) => (
        <mesh key={`n${i}`} position={[x, y, z]} castShadow>
          <sphereGeometry args={[0.072 + (i % 3) * 0.014, 16, 16]} />
          <meshStandardMaterial
            color="#e2e8f0"
            emissive="#38bdf8"
            emissiveIntensity={0.75}
            metalness={0.25}
            roughness={0.12}
          />
        </mesh>
      ))}

      <NeuralConnections nodePositions={nodePositions} />

      {/* Ambient particle sparkles */}
      <Sparkles count={55} scale={6.5} size={1.5} speed={0.3} opacity={0.55} color="#22d3ee" />
      <Sparkles count={30} scale={4.5} size={1.0} speed={0.2} opacity={0.4} color="#a78bfa" />
      <Sparkles count={20} scale={3.5} size={0.8} speed={0.15} opacity={0.3} color="#f472b6" />
    </group>
  )
}

export default function ThreeScene() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="w-full h-80 rounded-[1.5rem] overflow-hidden border border-white/10 bg-slate-950/80">
      <Canvas
        shadows
        camera={{ position: [0, 1.8, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 7, 20]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} castShadow />
        <pointLight position={[-4, 3, -2]} intensity={1.8} color="#8b5cf6" />
        <pointLight position={[4, -2, 3]} intensity={1.8} color="#22d3ee" />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#f472b6" />

        <Float
          rotationIntensity={0.3}
          speed={reduced ? 0 : 0.85}
          floatIntensity={reduced ? 0 : 0.38}
        >
          <DataSculpture reduced={reduced} />
        </Float>

        <ContactShadows position={[0, -1.6, 0]} opacity={0.35} blur={3} far={5} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={!reduced}
          autoRotateSpeed={0.35}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
