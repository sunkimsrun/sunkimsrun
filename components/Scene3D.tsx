'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from './ThemeProvider'
import { useDevMode } from './DevModeProvider'

function FloatingGeometry({ position, geometry, color, speed = 1 }: {
  position: [number, number, number]
  geometry: 'icosahedron' | 'torus' | 'dodecahedron' | 'torusKnot'
  color: string
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Unique random parameters for organic drift
  const randomParams = useMemo(() => ({
    offsetX: Math.random() * 100,
    offsetY: Math.random() * 100,
    offsetZ: Math.random() * 100,
    rotX: (Math.random() * 0.15 + 0.08) * (Math.random() > 0.5 ? 1 : -1),
    rotY: (Math.random() * 0.2 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
    rotZ: (Math.random() * 0.1 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
    driftScaleX: Math.random() * 1.2 + 1.2,
    driftScaleY: Math.random() * 1.0 + 1.0,
    driftScaleZ: Math.random() * 0.8 + 0.6,
  }), [])

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed

      // Smooth random 3D orbital drift around origin point
      meshRef.current.position.x = position[0] + Math.sin(t * 0.25 + randomParams.offsetX) * randomParams.driftScaleX
      meshRef.current.position.y = position[1] + Math.cos(t * 0.35 + randomParams.offsetY) * randomParams.driftScaleY
      meshRef.current.position.z = position[2] + Math.sin(t * 0.2 + randomParams.offsetZ) * randomParams.driftScaleZ

      // Multi-axis rotation
      meshRef.current.rotation.x = t * randomParams.rotX
      meshRef.current.rotation.y = t * randomParams.rotY
      meshRef.current.rotation.z = t * randomParams.rotZ
    }
  })

  const geometryComponent = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />
      case 'torus':
        return <torusGeometry args={[1, 0.35, 12, 24]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />
      case 'torusKnot':
        return <torusKnotGeometry args={[0.8, 0.25, 48, 12]} />
    }
  }, [geometry])

  return (
    <Float speed={2 * speed} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={meshRef} position={position}>
        {geometryComponent}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 180

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 45
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45
      pos[i * 3 + 2] = (Math.random() - 0.5) * 45
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.008
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#06b6d4"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

export function Scene3D() {
  const { theme } = useTheme()
  const { isDevMode } = useDevMode()
  const [isVisible, setIsVisible] = useState(true)
  const [pastIntro, setPastIntro] = useState(true)

  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // In Dev Mode with BaseballIntro, hide 3D background until scrolled past the intro
  useEffect(() => {
    if (!isDevMode) {
      setPastIntro(true)
      return
    }

    const onScroll = () => {
      setPastIntro(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isDevMode])

  const opacity = (!pastIntro || !isVisible) ? 0 : (theme === 'dark' ? 1 : 0.35)

  return (
    <div className="fixed inset-0 z-0 transition-opacity duration-500" style={{ pointerEvents: 'none', opacity }}>
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <ambientLight intensity={0.4} />

        <Stars
          radius={45}
          depth={40}
          count={350}
          factor={2.5}
          saturation={0}
          fade
          speed={0.4}
        />
        <ParticleField />

        <FloatingGeometry position={[-8, 4, -5]} geometry="icosahedron" color="#06b6d4" speed={2.0} />
        <FloatingGeometry position={[-6, -5, -3]} geometry="torus" color="#3b82f6" speed={2.0} />
        <FloatingGeometry position={[7, 5, -6]} geometry="dodecahedron" color="#06b6d4" speed={2.0} />
        <FloatingGeometry position={[0, -7, -4]} geometry="torusKnot" color="#a855f7" speed={2.0} />
        <FloatingGeometry position={[8, -2, -7]} geometry="icosahedron" color="#a855f7" speed={1.8} />
      </Canvas>
    </div>
  )
}

