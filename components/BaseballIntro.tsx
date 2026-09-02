'use client'

import React, { useRef, useMemo, useState, useEffect, createContext, useContext } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════
//  BIOMECHANICAL PITCHING & BATTING TIMELINE (Seconds)
// ═══════════════════════════════════════════════════════════════
const TIME = {
  START: 0.0,
  SET: 0.6,          // Balanced set position on rubber, hands at chest
  LEG_APEX: 1.3,     // High knee balance point, hands begin breaking
  STRIDE_DRIVE: 1.9, // Stride toward plate, arm path circle & scapular load
  MAX_EXTERNAL: 2.25,// Foot plant, torso whips open, arm lays back (MER)
  RELEASE: 2.45,     // Forearm snaps forward, ball released at high 3/4 slot
  FOLLOW_THROUGH: 3.1,// Arm sweeps across opposite knee, back leg kicks up
  CONTACT: 2.85,     // Batter connects with 98mph pitch at sweet spot (CRACK!)
  BALL_APEX: 5.2,    // High home run moonshot over stadium lights
  OUT_OF_PARK: 7.6,  // Disappears into deep night sky
  TOTAL_LOOP: 9.0,   // Natural restart cycle
}

// Organic Interpolation Functions
const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp(t)
const invLerp = (start: number, end: number, t: number) => clamp((t - start) / (end - start))

// Smooth natural muscle acceleration curves
const smoothStep = (t: number) => {
  const x = clamp(t)
  return x * x * (3 - 2 * x)
}
const easeOutQuart = (x: number): number => 1 - Math.pow(1 - clamp(x), 4)
const easeOutCubic = (x: number) => 1 - Math.pow(1 - clamp(x), 3)
const easeInOutSine = (x: number) => -(Math.cos(Math.PI * clamp(x)) - 1) / 2
const easeOutBack = (x: number): number => {
  const c1 = 1.70158
  const c3 = c1 + 1
  const t = clamp(x) - 1
  return 1 + c3 * Math.pow(t, 3) + c1 * Math.pow(t, 2)
}

const AnimContext = createContext<{ getAnimTime: () => number }>({ getAnimTime: () => 0 })

// ═══════════════════════════════════════════════════════════════
//  CINEMATIC DYNAMIC BROADCAST CAMERA
// ═══════════════════════════════════════════════════════════════
function CinematicCamera() {
  const { getAnimTime } = useContext(AnimContext)

  useFrame(({ camera }) => {
    const t = getAnimTime()

    if (t < TIME.STRIDE_DRIVE) {
      // 1. Medium-close telephoto angle on Pitcher winding up
      const p = invLerp(TIME.START, TIME.STRIDE_DRIVE, t)
      camera.position.x = lerp(-3.8, -2.4, p)
      camera.position.y = lerp(2.2, 2.4, p)
      camera.position.z = lerp(8.0, 8.8, p)
      camera.lookAt(lerp(-3.8, -1.0, p * 0.5), 1.6, 0)
    } else if (t < TIME.CONTACT) {
      // 2. High-speed whip track following the 98mph pitch
      const p = invLerp(TIME.STRIDE_DRIVE, TIME.CONTACT, t)
      camera.position.x = lerp(-2.4, 2.2, p)
      camera.position.y = lerp(2.4, 2.1, p)
      camera.position.z = lerp(8.8, 8.0, p)
      camera.lookAt(lerp(-1.0, 3.0, p), 1.45, 0)
    } else if (t < TIME.BALL_APEX) {
      // 3. Impact contact zoom + camera rises with the towering ball
      const p = invLerp(TIME.CONTACT, TIME.BALL_APEX, t)
      const shake = t - TIME.CONTACT < 0.22 ? Math.sin((t - TIME.CONTACT) * 75) * 0.12 : 0
      camera.position.x = lerp(2.2, 0.2, p) + shake
      camera.position.y = lerp(2.1, 4.6, p) + shake
      camera.position.z = lerp(8.0, 14.2, p)
      camera.lookAt(lerp(3.0, 7.8, p), lerp(1.45, 9.8, p), lerp(0, -12, p))
    } else {
      // 4. Wide majestic stadium panorama
      const p = invLerp(TIME.BALL_APEX, TIME.TOTAL_LOOP, t)
      camera.position.x = lerp(0.2, 0.0, p)
      camera.position.y = lerp(4.6, 3.2, p)
      camera.position.z = lerp(14.2, 13.0, p)
      camera.lookAt(lerp(7.8, 0.0, p), lerp(9.8, 1.8, p), 0)
    }
  })

  return null
}

// ═══════════════════════════════════════════════════════════════
//  ORGANIC FLOATING 3D STARS (Full 360-Degree Celestial Sky Dome)
// ═══════════════════════════════════════════════════════════════
function FloatingSkyStars() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 680

  const { positions, basePositions, starParams, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const basePositions = new Float32Array(count * 3)
    const starParams = new Float32Array(count * 6)
    const colors = new Float32Array(count * 3)

    const colorPalette = [
      new THREE.Color('#ffffff'), // Crisp White
      new THREE.Color('#93c5fd'), // Starlight Blue
      new THREE.Color('#bae6fd'), // Ice Cyan
      new THREE.Color('#fef08a'), // Warm Gold
      new THREE.Color('#e0f2fe'), // Soft Diamond
    ]

    for (let i = 0; i < count; i++) {
      // 360-degree spherical dome distribution
      const theta = Math.random() * Math.PI * 2 // 360° full azimuth
      const phi = Math.acos(Math.random() * 0.92 + 0.05) // Sky hemisphere above horizon
      const radius = 52 + Math.random() * 45 // Deep celestial radius

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const z = radius * Math.sin(phi) * Math.sin(theta)
      const y = Math.max(5.0, radius * Math.cos(phi) + 2.0) // Kept in sky dome above field level

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      basePositions[i * 3] = x
      basePositions[i * 3 + 1] = y
      basePositions[i * 3 + 2] = z

      starParams[i * 6 + 0] = (Math.random() * 0.3 + 0.12) * (Math.random() > 0.5 ? 1 : -1)
      starParams[i * 6 + 1] = (Math.random() * 0.4 + 0.15) * (Math.random() > 0.5 ? 1 : -1)
      starParams[i * 6 + 2] = (Math.random() * 0.25 + 0.1) * (Math.random() > 0.5 ? 1 : -1)
      starParams[i * 6 + 3] = Math.random() * 1.2 + 0.3
      starParams[i * 6 + 4] = Math.random() * 0.8 + 0.2
      starParams[i * 6 + 5] = Math.random() * Math.PI * 2

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    return { positions, basePositions, starParams, colors }
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.elapsedTime
    const posAttr = pointsRef.current.geometry.attributes.position

    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3]
      const by = basePositions[i * 3 + 1]
      const bz = basePositions[i * 3 + 2]

      const fx = starParams[i * 6 + 0]
      const fy = starParams[i * 6 + 1]
      const fz = starParams[i * 6 + 2]
      const ax = starParams[i * 6 + 3]
      const ay = starParams[i * 6 + 4]
      const ph = starParams[i * 6 + 5]

      const curX = bx + Math.sin(t * fx + ph) * ax + Math.sin(t * 0.06) * 0.15
      const curY = Math.max(4.5, by + Math.cos(t * fy + ph) * ay + Math.cos(t * 0.08) * 0.15)
      const curZ = bz + Math.sin(t * fz + ph) * (ax * 0.6)

      posAttr.setXYZ(i, curX, curY, curZ)
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.92} sizeAttenuation />
    </points>
  )
}

// ═══════════════════════════════════════════════════════════════
//  DEEP COSMIC SKY & MOON
// ═══════════════════════════════════════════════════════════════
function CosmicSky() {
  const meteorRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime
    if (meteorRef.current) {
      const cycle = elapsed % 4.5
      if (cycle < 0.6) {
        meteorRef.current.visible = true
        const p = cycle / 0.6
        meteorRef.current.position.x = lerp(-32, 28, p)
        meteorRef.current.position.y = lerp(38, 22, p)
        meteorRef.current.position.z = -42
          ; (meteorRef.current.material as THREE.MeshBasicMaterial).opacity = Math.sin(p * Math.PI) * 0.95
      } else {
        meteorRef.current.visible = false
      }
    }
  })

  return (
    <group>
      {/* Meteor streak */}
      <mesh ref={meteorRef} rotation={[0, 0, -0.45]} visible={false}>
        <boxGeometry args={[4.5, 0.06, 0.06]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
      </mesh>

      {/* Clean Moon in High Sky */}
      <group position={[22, 38, -48]}>
        <mesh>
          <sphereGeometry args={[2.4, 32, 32]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef9c3" emissiveIntensity={1.4} roughness={0.35} />
        </mesh>
      </group>
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════
//  GRANDSTANDS, JUMBOTRON & 360-DEGREE PROFESSIONAL STADIUM BOWL
// ═══════════════════════════════════════════════════════════════
function StadiumArchitecture() {
  const { getAnimTime } = useContext(AnimContext)
  const scoreboardTextRef = useRef<THREE.Mesh>(null)
  const scoreboardGlowRef = useRef<THREE.PointLight>(null)
  const ribbonGlowRef = useRef<THREE.Group>(null)

  // 16-Sector Full 360-Degree Stadium Grandstand Bowl
  const grandstandSectors = useMemo(() => {
    const SECTORS = 16
    const sectors = []
    for (let i = 0; i < SECTORS; i++) {
      const angle = (i / SECTORS) * Math.PI * 2
      // Natural baseball stadium oval radius
      const R = 33 - 5 * Math.cos(angle)
      const x = Math.sin(angle) * R
      const z = -Math.cos(angle) * R
      const width = ((2 * Math.PI * R) / SECTORS) * 1.06
      sectors.push({ i, angle, x, z, width })
    }
    return sectors
  }, [])

  // Dynamic Animated Jumbotron & LED Ribbon Content
  useFrame(({ clock }) => {
    const t = getAnimTime()
    if (!scoreboardTextRef.current || !scoreboardGlowRef.current) return

    if (t < TIME.CONTACT) {
      // Pre-hit: Pitch Speed Display
      ;(scoreboardTextRef.current.material as THREE.MeshStandardMaterial).color.set('#38bdf8')
      ;(scoreboardTextRef.current.material as THREE.MeshStandardMaterial).emissive.set('#0284c7')
      scoreboardGlowRef.current.intensity = 4.0
    } else {
      // Post-hit: HOME RUN celebration glow!
      ;(scoreboardTextRef.current.material as THREE.MeshStandardMaterial).color.set('#fde047')
      ;(scoreboardTextRef.current.material as THREE.MeshStandardMaterial).emissive.set('#eab308')
      scoreboardGlowRef.current.intensity = 12.0
    }
  })

  return (
    <group>
      {/* ── 1. Full 360-Degree Continuous Stadium Grandstand Bowl (16 Sectors) ── */}
      {grandstandSectors.map(({ i, angle, x, z, width }) => (
        <group key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
          {/* Lower Seating Deck (Concrete Tier) */}
          <mesh position={[0, 3.5, 0]} receiveShadow>
            <boxGeometry args={[width, 4.5, 4.8]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>

          {/* Detailed Stadium Seating Rows on Lower Deck (Navy & Royal Blue Seats) */}
          {[-1.2, 0, 1.2].map((sz, idx) => (
            <mesh key={`lower-seats-${idx}`} position={[0, 4.4 + idx * 0.45, sz]}>
              <boxGeometry args={[width * 0.96, 0.35, 0.8]} />
              <meshStandardMaterial color={idx % 2 === 0 ? '#1e3a8a' : '#1d4ed8'} roughness={0.6} />
            </mesh>
          ))}

          {/* Club Level Facade with Glowing Animated Ribbon LED */}
          <mesh position={[0, 6.0, 0.2]}>
            <boxGeometry args={[width + 0.15, 0.5, 0.4]} />
            <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={2.2} />
          </mesh>

          {/* Upper Seating Deck */}
          <mesh position={[0, 9.0, -2.4]} receiveShadow>
            <boxGeometry args={[width * 1.08, 5.5, 5.4]} />
            <meshStandardMaterial color="#0f172a" roughness={0.85} />
          </mesh>

          {/* Upper Deck Stadium Seating Rows (Crimson & Navy Accent Tiers) */}
          {[-1.5, -0.3, 0.9].map((sz, idx) => (
            <mesh key={`upper-seats-${idx}`} position={[0, 10.2 + idx * 0.5, sz - 2.4]}>
              <boxGeometry args={[width * 1.04, 0.35, 0.9]} />
              <meshStandardMaterial color={idx === 1 ? '#991b1b' : '#1e3a8a'} roughness={0.6} />
            </mesh>
          ))}

          {/* Upper Deck Ribbon LED Board */}
          <mesh position={[0, 12.0, -2.2]}>
            <boxGeometry args={[width * 1.08 + 0.15, 0.5, 0.4]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.8} />
          </mesh>

          {/* Cantilever Stadium Roof Canopy */}
          <mesh position={[0, 14.8, -1.2]} rotation={[0.15, 0, 0]}>
            <boxGeometry args={[width * 1.14, 0.6, 8.5]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Structural Steel Roof Cantilever Truss Beams */}
          {[-width * 0.35, width * 0.35].map((bx, bidx) => (
            <mesh key={`truss-${bidx}`} position={[bx, 14.5, -1.2]} rotation={[0.15, 0, 0]}>
              <boxGeometry args={[0.25, 0.9, 8.4]} />
              <meshStandardMaterial color="#64748b" metalness={0.85} />
            </mesh>
          ))}

          {/* Outer Stadium Concourse Perimeter Wall */}
          <mesh position={[0, 7.5, -5.2]}>
            <boxGeometry args={[width * 1.16, 15.5, 1.0]} />
            <meshStandardMaterial color="#0b1329" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* ── 2. High-Tech Centerfield Jumbotron Scoreboard ── */}
      <group position={[0, 14.2, -28]}>
        {/* Screen Frame Bezel */}
        <mesh>
          <boxGeometry args={[14, 7, 0.8]} />
          <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Glowing LED Screen Face */}
        <mesh position={[0, 0, 0.42]}>
          <planeGeometry args={[13.2, 6.2]} />
          <meshStandardMaterial color="#0b1329" roughness={0.5} />
        </mesh>
        {/* Scoreboard Diamond Graphic Display */}
        <mesh ref={scoreboardTextRef} position={[0, 0.6, 0.45]}>
          <boxGeometry args={[8.5, 3.2, 0.05]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={2.5} />
        </mesh>
        {/* Scoreboard Header Matrix */}
        <mesh position={[0, 2.4, 0.45]}>
          <boxGeometry args={[11, 0.5, 0.05]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2.0} />
        </mesh>
        {/* Jumbotron Ambient Screen Light */}
        <pointLight ref={scoreboardGlowRef} position={[0, 0, 1.5]} color="#38bdf8" distance={20} intensity={4} />
      </group>

      {/* ── 3. Home Plate Backstop Protective Safety Netting ── */}
      <group position={[3.0, 0, 6.5]}>
        {/* Netting Steel Support Poles */}
        {[-8, -4, 0, 4, 8].map((px) => (
          <mesh key={`net-pole-${px}`} position={[px, 4.5, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 9, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
        ))}
        {/* High-Tension Safety Net Screen */}
        <mesh position={[0, 4.5, 0]}>
          <planeGeometry args={[16.2, 8.8]} />
          <meshBasicMaterial color="#0f172a" wireframe transparent opacity={0.32} />
        </mesh>
        {/* Backstop Wall Sunk Padded Base */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[16.5, 1.2, 0.4]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.6} />
        </mesh>
      </group>

      {/* ── 4. 1st Base & 3rd Base Dugouts ── */}
      {/* 3rd Base Dugout (Home Team) */}
      <group position={[-11, 0, 4]}>
        {/* Dugout Roof Canopy */}
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[10, 0.25, 2.6]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        {/* Dugout Protective Railing */}
        <mesh position={[0, 0.5, 1.25]}>
          <boxGeometry args={[9.8, 0.9, 0.1]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Dugout Team Bench */}
        <mesh position={[0, 0.4, -0.6]}>
          <boxGeometry args={[9.2, 0.35, 0.6]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
      </group>

      {/* 1st Base Dugout (Away Team) */}
      <group position={[17, 0, 4]}>
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[10, 0.25, 2.6]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.5, 1.25]}>
          <boxGeometry args={[9.8, 0.9, 0.1]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0.4, -0.6]}>
          <boxGeometry args={[9.2, 0.35, 0.6]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
      </group>

      {/* ── 5. Outfield Wall with Padded Navy Blue Texture & Distance Markers ── */}
      <group position={[0, 2.2, -22]}>
        {/* Padded Wall Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[68, 4.4, 0.6]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.55} metalness={0.15} />
        </mesh>
        {/* Yellow Top Boundary Line */}
        <mesh position={[0, 2.25, 0.1]}>
          <boxGeometry args={[68.2, 0.16, 0.2]} />
          <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.8} />
        </mesh>

        {/* Distance Markers Painted on Wall */}
        {/* 405 FT (Center Field) */}
        <mesh position={[0, 0.6, 0.32]}>
          <planeGeometry args={[2.5, 0.9]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* 375 FT (Left-Center & Right-Center) */}
        {[-16, 16].map((x) => (
          <mesh key={x} position={[x, 0.6, 0.32]}>
            <planeGeometry args={[2.2, 0.8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        ))}
        {/* 330 FT (Foul Lines) */}
        {[-28, 28].map((x) => (
          <mesh key={x} position={[x, 0.6, 0.32]}>
            <planeGeometry args={[2.0, 0.8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* ── 6. Yellow Foul Poles (Left & Right Field) ── */}
      {[-30, 30].map((px) => (
        <group key={px} position={[px, 0, -21.8]}>
          {/* Main Pole */}
          <mesh position={[0, 8, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 16, 12]} />
            <meshStandardMaterial color="#eab308" emissive="#ca8a04" emissiveIntensity={0.6} />
          </mesh>
          {/* Foul Pole Mesh Wing */}
          <mesh position={[px > 0 ? -0.4 : 0.4, 10, 0]}>
            <boxGeometry args={[0.8, 8, 0.05]} />
            <meshStandardMaterial color="#fde047" wireframe />
          </mesh>
        </group>
      ))}

      {/* ── 7. Outfield Bullpens (Left & Right Field) ── */}
      {[-24, 24].map((bx) => (
        <group key={`bullpen-${bx}`} position={[bx, 0, -24.2]}>
          {/* Bullpen Clay Pitching Strip */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <planeGeometry args={[3.2, 5.5]} />
            <meshStandardMaterial color="#9a3412" roughness={0.9} />
          </mesh>
          {/* Bullpen Mound */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -1.2]}>
            <circleGeometry args={[0.9, 16]} />
            <meshStandardMaterial color="#c2410c" roughness={0.9} />
          </mesh>
          {/* Bullpen Bench */}
          <mesh position={[bx > 0 ? 1.4 : -1.4, 0.35, 0]}>
            <boxGeometry args={[0.5, 0.35, 3.2]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
        </group>
      ))}

      {/* ── 8. Stadium Floodlight Towers (Outfield with Beams, Front Stands Physical Only Without Beams) ── */}
      {[
        { tx: -24, tz: -26, targetPos: [-14, 0, -6] as [number, number, number], isWhite: true,  hasBeam: true },
        { tx: -9,  tz: -28, targetPos: [-4, 0, -4]  as [number, number, number], isWhite: false, hasBeam: true },
        { tx: 9,   tz: -28, targetPos: [4, 0, -4]   as [number, number, number], isWhite: true,  hasBeam: true },
        { tx: 24,  tz: -26, targetPos: [14, 0, -6]  as [number, number, number], isWhite: false, hasBeam: true },
        // Front / Side stands: Physical light towers with glowing bulbs, NO beam shaft crossing foreground
        { tx: -26, tz: 8,   targetPos: [-6, 0, 4]   as [number, number, number], isWhite: true,  hasBeam: false },
        { tx: 26,  tz: 8,   targetPos: [6, 0, 4]    as [number, number, number], isWhite: false, hasBeam: false },
      ].map(({ tx, tz, targetPos, isWhite, hasBeam }, i) => (
        <FloodlightTower
          key={`${tx}-${tz}-${i}`}
          tx={tx}
          tz={tz}
          targetPos={targetPos}
          isWhite={isWhite}
          hasBeam={hasBeam}
        />
      ))}
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════
//  FLOODLIGHT TOWER COMPONENT (Realistic Stadium Floodlights & Configurable God Rays)
// ═══════════════════════════════════════════════════════════════
function FloodlightTower({
  tx,
  tz = -26,
  targetPos,
  isWhite,
  hasBeam = true,
}: {
  tx: number
  tz?: number
  targetPos: [number, number, number]
  isWhite: boolean
  hasBeam?: boolean
}) {
  const spotLightRef = useRef<THREE.SpotLight>(null)
  const targetObjRef = useRef<THREE.Object3D>(null)
  const beamGroupRef = useRef<THREE.Group>(null)

  // Distance from light rack [tx, 18, tz + 0.4] to targetPos on the open field
  const distance = useMemo(() => {
    const dx = targetPos[0] - tx
    const dy = targetPos[1] - 18
    const dz = targetPos[2] - (tz + 0.4)
    return Math.hypot(dx, dy, dz)
  }, [tx, tz, targetPos])

  useFrame(() => {
    if (spotLightRef.current && targetObjRef.current) {
      if (spotLightRef.current.target !== targetObjRef.current) {
        spotLightRef.current.target = targetObjRef.current
      }
    }
    if (beamGroupRef.current && hasBeam) {
      beamGroupRef.current.lookAt(targetPos[0], targetPos[1], targetPos[2])
    }
  })

  return (
    <group position={[tx, 0, tz]}>
      {/* Target object positioned in local coordinates corresponding to targetPos on field */}
      <object3D
        ref={targetObjRef}
        position={[targetPos[0] - tx, targetPos[1], targetPos[2] - tz]}
      />

      {/* Steel Truss Tower Pole */}
      <mesh position={[0, 9, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.65, 18, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Light Head Assembly angled forward-downward toward field */}
      <group position={[0, 18, 0.4]} rotation={[0.48, 0, 0]}>
        {/* Light Grid Rack */}
        <mesh>
          <boxGeometry args={[4.8, 2.6, 0.5]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>

        {/* Emissive High-Power Flood Bulbs (3x5 Grid) */}
        {[-1.6, -0.8, 0, 0.8, 1.6].map((bx) =>
          [-0.7, 0, 0.7].map((by) => (
            <mesh key={`${bx}-${by}`} position={[bx, by, 0.28]}>
              <sphereGeometry args={[0.22, 12, 12]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive={isWhite ? '#ffffff' : '#bae6fd'}
                emissiveIntensity={6.0}
              />
            </mesh>
          ))
        )}

        {/* Front Light Flare Glow Lens */}
        <mesh position={[0, 0, 0.32]}>
          <planeGeometry args={[5.2, 3.0]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.38} />
        </mesh>
      </group>

      {/* Wide Realistic Stadium Spotlight (Only for outfield towers, disabled for front stands) */}
      {hasBeam && (
        <spotLight
          ref={spotLightRef}
          position={[0, 18, 0.4]}
          intensity={550}
          angle={Math.PI / 3.2}
          penumbra={0.85}
          distance={85}
          color={isWhite ? '#ffffff' : '#e0f2fe'}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
      )}

      {/* Volumetric Clean Focused Core Beam Shaft pointing forward across the field */}
      {hasBeam && (
        <group ref={beamGroupRef} position={[0, 18, 0.4]}>
          {/* Focused Inner Core God Ray */}
          <mesh position={[0, 0, distance / 2]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 3.4, distance, 16, 1, true]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.09}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════
//  BASEBALL FIELD & DIAMOND (Full 360-Degree Ground Coverage)
// ═══════════════════════════════════════════════════════════════
function BaseballField() {
  return (
    <group>
      {/* ── Deep Space Cosmos ── */}
      <CosmicSky />

      {/* ── 360-Degree Floating Stars in the Sky ── */}
      <FloatingSkyStars />

      {/* ── 360-Degree Stadium Architecture Bowl ── */}
      <StadiumArchitecture />

      {/* ── Master Infinite 360-Degree Stadium Ground Disc (Zero black voids) ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]} receiveShadow>
        <circleGeometry args={[180, 64]} />
        <meshStandardMaterial color="#0a2a16" roughness={0.75} />
      </mesh>

      {/* ── Vibrant Emerald Outfield Turf Disc ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -2]} receiveShadow>
        <circleGeometry args={[56, 64]} />
        <meshStandardMaterial color="#14532d" roughness={0.65} />
      </mesh>

      {/* Outfield Warning Track Clay Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -2]}>
        <ringGeometry args={[26, 32, 64]} />
        <meshStandardMaterial color="#9a3412" roughness={0.85} />
      </mesh>

      {/* Turf Striping Mower Patterns */}
      {[-24, -18, -12, -6, 0, 6, 12, 18, 24].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.0, -2]}>
          <planeGeometry args={[3.6, 52]} />
          <meshStandardMaterial color="#166534" roughness={0.65} />
        </mesh>
      ))}

      {/* ── Clay Infield Diamond ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[11, 48]} />
        <meshStandardMaterial color="#9a3412" roughness={0.8} />
      </mesh>

      {/* Pitcher Mound Dirt & Rubber Plate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.8, 0.03, 0]}>
        <circleGeometry args={[1.7, 32]} />
        <meshStandardMaterial color="#c2410c" roughness={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.8, 0.05, 0]}>
        <planeGeometry args={[0.3, 0.8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* Home Plate Dirt, Plate & Boxes */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.0, 0.03, 0]}>
        <circleGeometry args={[2.2, 32]} />
        <meshStandardMaterial color="#c2410c" roughness={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.0, 0.06, 0]}>
        <planeGeometry args={[0.6, 0.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      {[-0.65, 0.65].map((z, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[3.0, 0.04, z]}>
          <planeGeometry args={[1.4, 0.7]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} wireframe />
        </mesh>
      ))}

      {/* 1st & 3rd Base On-Deck Circles */}
      {[-0.5, 6.5].map((x) => (
        <mesh key={`on-deck-${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, 2.8]}>
          <circleGeometry args={[1.1, 24]} />
          <meshStandardMaterial color="#9a3412" roughness={0.85} />
        </mesh>
      ))}

      {/* 1st & 3rd Base Coach's Boxes */}
      {[-1.2, 7.2].map((x) => (
        <mesh key={`coach-box-${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.025, 0]}>
          <planeGeometry args={[1.8, 3.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} wireframe />
        </mesh>
      ))}

      {/* Foul Line connecting mound and plate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
        <planeGeometry args={[30, 0.12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════
//  PITCHER (Lifelike Biomechanical Pitching Chain & Arms)
// ═══════════════════════════════════════════════════════════════
function Pitcher() {
  const { getAnimTime } = useContext(AnimContext)

  const rootRef = useRef<THREE.Group>(null)
  const pelvisRef = useRef<THREE.Group>(null)
  const spineRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)

  // Right Throwing Arm Chain
  const rClavicleRef = useRef<THREE.Group>(null)
  const rShoulderRef = useRef<THREE.Group>(null)
  const rElbowRef = useRef<THREE.Group>(null)
  const rWristRef = useRef<THREE.Group>(null)

  // Left Glove Arm Chain
  const lClavicleRef = useRef<THREE.Group>(null)
  const lShoulderRef = useRef<THREE.Group>(null)
  const lElbowRef = useRef<THREE.Group>(null)
  const lWristRef = useRef<THREE.Group>(null)

  // Legs
  const lHipRef = useRef<THREE.Group>(null)
  const lKneeRef = useRef<THREE.Group>(null)
  const rHipRef = useRef<THREE.Group>(null)
  const rKneeRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const t = getAnimTime()
    if (!rootRef.current || !pelvisRef.current || !spineRef.current || !rShoulderRef.current || !rElbowRef.current || !rWristRef.current || !lShoulderRef.current || !lElbowRef.current || !lHipRef.current || !rHipRef.current) return

    if (t < TIME.SET) {
      // 1. SET STANCE: Pitcher standing poised on mound, hands together at chest
      const p = invLerp(TIME.START, TIME.SET, t)
      rootRef.current.position.set(0, 0, 0)
      pelvisRef.current.rotation.set(0, 0, 0)
      spineRef.current.rotation.set(0.05, 0, 0)
      if (headRef.current) headRef.current.rotation.set(0, -0.35, 0)

      rShoulderRef.current.rotation.set(0.45, 0.15, 0.45)
      rElbowRef.current.rotation.set(-1.25, 0.2, 0.1)
      rWristRef.current.rotation.set(0.35, 0.15, 0)

      lShoulderRef.current.rotation.set(0.45, -0.15, -0.45)
      lElbowRef.current.rotation.set(-1.25, -0.2, -0.1)
      if (lWristRef.current) lWristRef.current.rotation.set(0.35, -0.15, 0)

      lHipRef.current.rotation.set(0, 0, 0)
      if (lKneeRef.current) lKneeRef.current.rotation.set(0, 0, 0)
      rHipRef.current.rotation.set(0, 0, 0)
    } else if (t < TIME.LEG_APEX) {
      // 2. ROCKER & HIGH LEG LIFT
      const p = invLerp(TIME.SET, TIME.LEG_APEX, t)
      const ep = easeInOutSine(p)

      pelvisRef.current.rotation.y = lerp(0, -0.38, ep)
      spineRef.current.rotation.set(lerp(0.05, -0.05, ep), lerp(0, -0.15, ep), 0)
      rootRef.current.position.y = Math.sin(ep * Math.PI) * 0.14

      lHipRef.current.rotation.x = lerp(0, -1.95, ep)
      lHipRef.current.rotation.z = lerp(0, -0.25, ep)
      if (lKneeRef.current) lKneeRef.current.rotation.x = lerp(0, 2.1, ep)

      rShoulderRef.current.rotation.set(lerp(0.45, -0.45, ep), lerp(0.15, 0.35, ep), lerp(0.45, 0.55, ep))
      rElbowRef.current.rotation.set(lerp(-1.25, -0.5, ep), 0, 0)

      lShoulderRef.current.rotation.set(lerp(0.45, 0.5, ep), lerp(-0.15, 0.3, ep), -0.45)
      lElbowRef.current.rotation.set(lerp(-1.25, -0.8, ep), 0, 0)
    } else if (t < TIME.STRIDE_DRIVE) {
      // 3. STRIDE & ARM PATH (Scapular Load)
      const p = invLerp(TIME.LEG_APEX, TIME.STRIDE_DRIVE, t)
      const ep = smoothStep(p)

      rootRef.current.position.x = lerp(0, 0.45, ep)
      pelvisRef.current.rotation.y = lerp(-0.38, -0.65, ep)
      spineRef.current.rotation.set(lerp(-0.05, 0.1, ep), lerp(-0.15, -0.3, ep), 0)

      lHipRef.current.rotation.x = lerp(-1.95, -0.5, ep)
      lHipRef.current.rotation.z = 0
      if (lKneeRef.current) lKneeRef.current.rotation.x = lerp(2.1, 0.6, ep)

      rShoulderRef.current.rotation.set(lerp(-0.45, -2.45, ep), lerp(0.35, 0.75, ep), lerp(0.55, 0.95, ep))
      rElbowRef.current.rotation.set(lerp(-0.5, 1.6, ep), 0, 0)
      rWristRef.current.rotation.set(0.65, 0, 0)

      lShoulderRef.current.rotation.set(lerp(0.5, 1.35, ep), lerp(0.3, 0.45, ep), -0.25)
      lElbowRef.current.rotation.set(-0.35, 0, 0)
      if (lWristRef.current) lWristRef.current.rotation.set(0.2, 0, 0)
    } else if (t < TIME.MAX_EXTERNAL) {
      // 4. FOOT PLANT & MAXIMUM EXTERNAL ROTATION
      const p = invLerp(TIME.STRIDE_DRIVE, TIME.MAX_EXTERNAL, t)
      const ep = smoothStep(p)

      rootRef.current.position.x = lerp(0.45, 0.95, ep)
      rootRef.current.position.y = lerp(0.08, -0.1, ep)

      pelvisRef.current.rotation.y = lerp(-0.65, 0.85, ep)
      spineRef.current.rotation.set(lerp(0.1, 0.45, ep), lerp(-0.3, 0.4, ep), 0)

      lHipRef.current.rotation.x = lerp(-0.5, 0.75, ep)
      if (lKneeRef.current) lKneeRef.current.rotation.x = 0.25
      rHipRef.current.rotation.x = lerp(0, -0.85, ep)

      lShoulderRef.current.rotation.set(lerp(1.35, -0.45, ep), -0.65, 0.35)
      lElbowRef.current.rotation.set(-1.45, 0, 0)

      rShoulderRef.current.rotation.set(lerp(-2.45, -0.2, ep), lerp(0.75, 0.85, ep), lerp(0.95, 1.25, ep))
      rElbowRef.current.rotation.set(lerp(1.6, 1.85, ep), 0, 0)
      rWristRef.current.rotation.set(0.8, 0, 0)
    } else if (t < TIME.RELEASE) {
      // 5. INTERNAL ROTATION & BALL RELEASE
      const p = invLerp(TIME.MAX_EXTERNAL, TIME.RELEASE, t)
      const ep = easeOutQuart(p)

      rootRef.current.position.x = 0.95
      pelvisRef.current.rotation.y = lerp(0.85, 1.05, ep)
      spineRef.current.rotation.set(lerp(0.45, 0.7, ep), lerp(0.4, 0.15, ep), 0)

      rShoulderRef.current.rotation.set(lerp(-0.2, 1.55, ep), lerp(0.85, -0.3, ep), lerp(1.25, -0.25, ep))
      rElbowRef.current.rotation.set(lerp(1.85, -0.35, ep), 0, 0)
      rWristRef.current.rotation.set(lerp(0.8, -0.45, ep), lerp(0, 0.7, ep), 0)
    } else {
      // 6. NATURAL PRONATION & FOLLOW-THROUGH
      const p = invLerp(TIME.RELEASE, TIME.FOLLOW_THROUGH, t)
      const ep = easeOutBack(p)

      rootRef.current.position.x = 0.95
      pelvisRef.current.rotation.y = lerp(1.05, 1.2, ep)
      spineRef.current.rotation.set(lerp(0.7, 0.85, ep), 0.1, 0)

      rHipRef.current.rotation.x = lerp(-0.85, 1.45, ep)

      rShoulderRef.current.rotation.set(lerp(1.55, 1.95, ep), lerp(-0.3, -1.35, ep), -0.6)
      rElbowRef.current.rotation.set(-0.55, 0, 0)
      rWristRef.current.rotation.set(-0.65, 0.85, 0)
    }
  })

  const jersey = <meshStandardMaterial color="#1d4ed8" roughness={0.4} />
  const pinstripePants = <meshStandardMaterial color="#f8fafc" roughness={0.6} />
  const skin = <meshStandardMaterial color="#fbb075" roughness={0.65} />
  const navyCap = <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.2} />
  const cleat = <meshStandardMaterial color="#0f172a" roughness={0.4} />
  const leatherGlove = <meshStandardMaterial color="#78350f" roughness={0.7} />

  return (
    <group position={[-3.8, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <group ref={rootRef}>
        <group ref={pelvisRef} position={[0, 1.05, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.24, 0.22, 0.22, 16]} />
            {pinstripePants}
          </mesh>
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.245, 0.245, 0.05, 16]} />
            {cleat}
          </mesh>

          <group ref={spineRef} position={[0, 0.35, 0]}>
            <mesh position={[0, 0.1, 0]} castShadow>
              <capsuleGeometry args={[0.26, 0.52, 8, 16]} />
              {jersey}
            </mesh>
            <mesh position={[0, 0.15, -0.27]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.2, 0.26]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>

            <group ref={headRef} position={[0, 0.65, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.22, 16, 16]} />
                {skin}
              </mesh>
              <mesh position={[0, 0.14, 0]} castShadow>
                <cylinderGeometry args={[0.19, 0.23, 0.14, 16]} />
                {navyCap}
              </mesh>
              <mesh position={[0.2, 0.1, 0]} rotation={[0, 0, -0.16]} castShadow>
                <boxGeometry args={[0.2, 0.035, 0.26]} />
                {navyCap}
              </mesh>
            </group>

            {/* Right Arm */}
            <group ref={rClavicleRef} position={[-0.32, 0.28, 0]}>
              <group ref={rShoulderRef}>
                <mesh position={[0, -0.2, 0]} castShadow>
                  <capsuleGeometry args={[0.085, 0.36, 6, 12]} />
                  {jersey}
                </mesh>
                <group ref={rElbowRef} position={[0, -0.45, 0]}>
                  <mesh position={[0, -0.2, 0]} castShadow>
                    <capsuleGeometry args={[0.075, 0.34, 6, 12]} />
                    {skin}
                  </mesh>
                  <group ref={rWristRef} position={[0, -0.42, 0]}>
                    <mesh castShadow>
                      <boxGeometry args={[0.09, 0.12, 0.05]} />
                      {skin}
                    </mesh>
                    <mesh position={[0.02, -0.06, 0.02]} rotation={[0.4, 0, 0]} castShadow>
                      <boxGeometry args={[0.08, 0.06, 0.04]} />
                      {skin}
                    </mesh>
                  </group>
                </group>
              </group>
            </group>

            {/* Left Arm */}
            <group ref={lClavicleRef} position={[0.32, 0.28, 0]}>
              <group ref={lShoulderRef}>
                <mesh position={[0, -0.2, 0]} castShadow>
                  <capsuleGeometry args={[0.085, 0.36, 6, 12]} />
                  {jersey}
                </mesh>
                <group ref={lElbowRef} position={[0, -0.45, 0]}>
                  <mesh position={[0, -0.18, 0]} castShadow>
                    <capsuleGeometry args={[0.075, 0.3, 6, 12]} />
                    {skin}
                  </mesh>
                  <group ref={lWristRef} position={[0, -0.36, 0]}>
                    <mesh castShadow>
                      <boxGeometry args={[0.18, 0.2, 0.12]} />
                      {leatherGlove}
                    </mesh>
                    <mesh position={[0.02, 0.04, 0.06]} castShadow>
                      <boxGeometry args={[0.12, 0.14, 0.04]} />
                      {leatherGlove}
                    </mesh>
                  </group>
                </group>
              </group>
            </group>
          </group>

          {/* Legs */}
          <group ref={lHipRef} position={[0.16, -0.1, 0]}>
            <mesh position={[0, -0.28, 0]} castShadow>
              <capsuleGeometry args={[0.11, 0.48, 6, 12]} />
              {pinstripePants}
            </mesh>
            <group ref={lKneeRef} position={[0, -0.56, 0]}>
              <mesh position={[0, -0.26, 0]} castShadow>
                <capsuleGeometry args={[0.095, 0.44, 6, 12]} />
                {pinstripePants}
              </mesh>
              <mesh position={[0, -0.52, 0.08]} castShadow>
                <boxGeometry args={[0.16, 0.12, 0.32]} />
                {cleat}
              </mesh>
            </group>
          </group>

          <group ref={rHipRef} position={[-0.16, -0.1, 0]}>
            <mesh position={[0, -0.28, 0]} castShadow>
              <capsuleGeometry args={[0.11, 0.48, 6, 12]} />
              {pinstripePants}
            </mesh>
            <group ref={rKneeRef} position={[0, -0.56, 0]}>
              <mesh position={[0, -0.26, 0]} castShadow>
                <capsuleGeometry args={[0.095, 0.44, 6, 12]} />
                {pinstripePants}
              </mesh>
              <mesh position={[0, -0.52, 0.08]} castShadow>
                <boxGeometry args={[0.16, 0.12, 0.32]} />
                {cleat}
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════
//  BATTER & PRO MAPLE WOOD BAT
// ═══════════════════════════════════════════════════════════════
function Batter() {
  const { getAnimTime } = useContext(AnimContext)

  const hipsRef = useRef<THREE.Group>(null)
  const torsoRef = useRef<THREE.Group>(null)
  const batMountRef = useRef<THREE.Group>(null)
  const leadLegRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = getAnimTime()
    if (!hipsRef.current || !torsoRef.current || !batMountRef.current || !leadLegRef.current) return

    if (t < TIME.STRIDE_DRIVE) {
      const waggle = Math.sin(clock.elapsedTime * 6) * 0.08
      hipsRef.current.rotation.y = -0.35 + waggle * 0.5
      torsoRef.current.rotation.y = -0.3 + waggle
      leadLegRef.current.rotation.x = 0

      batMountRef.current.rotation.set(0.35 + waggle, 0.25, -0.7 + waggle)
    } else if (t < TIME.CONTACT) {
      const p = invLerp(TIME.STRIDE_DRIVE, TIME.CONTACT, t)
      const ep = easeInOutSine(p)

      leadLegRef.current.rotation.x = lerp(0, -0.45, ep)
      hipsRef.current.rotation.y = lerp(-0.35, Math.PI * 0.65, ep)
      torsoRef.current.rotation.y = lerp(-0.3, Math.PI * 0.85, ep)

      batMountRef.current.rotation.x = lerp(0.35, -0.2, ep)
      batMountRef.current.rotation.y = lerp(0.25, Math.PI * 1.35, ep)
      batMountRef.current.rotation.z = lerp(-0.7, 0.82, ep)
    } else {
      const p = invLerp(TIME.CONTACT, TIME.CONTACT + 0.8, t)
      const ep = easeOutQuart(p)

      hipsRef.current.rotation.y = Math.PI * 0.65
      torsoRef.current.rotation.y = lerp(Math.PI * 0.85, Math.PI * 1.1, ep)
      leadLegRef.current.rotation.x = -0.45

      batMountRef.current.rotation.x = -0.2
      batMountRef.current.rotation.y = lerp(Math.PI * 1.35, Math.PI * 1.65, ep)
      batMountRef.current.rotation.z = lerp(0.82, 1.3, ep)
    }
  })

  const redJersey = <meshStandardMaterial color="#dc2626" roughness={0.4} />
  const darkGrayPants = <meshStandardMaterial color="#1e293b" roughness={0.7} />
  const skin = <meshStandardMaterial color="#fbb075" roughness={0.65} />
  const glossHelmet = <meshStandardMaterial color="#991b1b" roughness={0.15} metalness={0.4} />
  const mapleBat = <meshStandardMaterial color="#d97706" roughness={0.25} metalness={0.15} />
  const redCleat = <meshStandardMaterial color="#dc2626" roughness={0.4} />

  return (
    <group position={[3.0, 0, 0]} rotation={[0, -Math.PI / 2 + 0.35, 0]}>
      <group ref={hipsRef} position={[0, 0.95, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.24, 0.22, 0.2, 16]} />
          {darkGrayPants}
        </mesh>

        <group position={[-0.16, -0.1, 0]}>
          <mesh position={[0, -0.28, 0]} castShadow>
            <capsuleGeometry args={[0.11, 0.48, 6, 12]} />
            {darkGrayPants}
          </mesh>
          <mesh position={[0, -0.72, 0.08]} castShadow>
            <boxGeometry args={[0.16, 0.12, 0.32]} />
            {redCleat}
          </mesh>
        </group>

        <group ref={leadLegRef} position={[0.16, -0.1, 0]}>
          <mesh position={[0, -0.28, 0]} castShadow>
            <capsuleGeometry args={[0.11, 0.48, 6, 12]} />
            {darkGrayPants}
          </mesh>
          <mesh position={[0, -0.72, 0.08]} castShadow>
            <boxGeometry args={[0.16, 0.12, 0.32]} />
            {redCleat}
          </mesh>
        </group>
      </group>

      <group ref={torsoRef} position={[0, 1.15, 0]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <capsuleGeometry args={[0.26, 0.55, 8, 16]} />
          {redJersey}
        </mesh>
        <mesh position={[0, 0.95, 0]} castShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
          {skin}
        </mesh>
        <mesh position={[0, 1.02, 0]} castShadow>
          <sphereGeometry args={[0.26, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          {glossHelmet}
        </mesh>
        <mesh position={[0.18, 1.0, 0]} rotation={[0, 0, -0.2]} castShadow>
          <boxGeometry args={[0.16, 0.04, 0.22]} />
          {glossHelmet}
        </mesh>

        <group position={[0, 0.6, 0.25]}>
          <mesh position={[-0.18, -0.15, 0]} castShadow>
            <capsuleGeometry args={[0.08, 0.35, 6, 12]} />
            {redJersey}
          </mesh>
          <mesh position={[0.18, -0.15, 0]} castShadow>
            <capsuleGeometry args={[0.08, 0.35, 6, 12]} />
            {redJersey}
          </mesh>
        </group>

        <group ref={batMountRef} position={[0, 0.55, 0.35]}>
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.024, 0.038, 0.42, 12]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.85, 0]} castShadow>
            <cylinderGeometry args={[0.068, 0.038, 0.9, 14]} />
            {mapleBat}
          </mesh>
          <mesh position={[0, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.04, 14]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 1.32, 0]} castShadow>
            <sphereGeometry args={[0.068, 12, 12]} />
            {mapleBat}
          </mesh>
        </group>
      </group>
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════
//  BASEBALL (Fastball Pitch & Towering Moonshot Arc)
// ═══════════════════════════════════════════════════════════════
function Baseball() {
  const { getAnimTime } = useContext(AnimContext)
  const ballRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    const t = getAnimTime()
    if (!ballRef.current) return

    if (t < TIME.SET) {
      ballRef.current.position.set(-3.7, 1.48, 0.26)
      ballRef.current.scale.setScalar(1)
      ballRef.current.visible = true
    } else if (t < TIME.STRIDE_DRIVE) {
      const p = invLerp(TIME.SET, TIME.STRIDE_DRIVE, t)
      ballRef.current.position.set(lerp(-3.7, -4.3, p), lerp(1.48, 2.15, p), lerp(0.26, 0.48, p))
      ballRef.current.visible = true
    } else if (t < TIME.RELEASE) {
      const p = invLerp(TIME.STRIDE_DRIVE, TIME.RELEASE, t)
      ballRef.current.position.set(lerp(-4.3, -2.7, p), lerp(2.15, 1.95, p), lerp(0.48, 0.35, p))
      ballRef.current.visible = true
    } else if (t < TIME.CONTACT) {
      const p = invLerp(TIME.RELEASE, TIME.CONTACT, t)
      const ep = easeOutQuart(p)
      ballRef.current.position.x = lerp(-2.7, 2.9, ep)
      ballRef.current.position.y = lerp(1.95, 1.45, ep) + Math.sin(p * Math.PI) * 0.12
      ballRef.current.position.z = lerp(0.35, 0.2, ep)

      ballRef.current.rotation.x -= 0.65
      ballRef.current.rotation.z += 0.2
      ballRef.current.visible = true
    } else if (t < TIME.OUT_OF_PARK) {
      const p = invLerp(TIME.CONTACT, TIME.OUT_OF_PARK, t)
      ballRef.current.position.x = 2.9 + p * 38
      ballRef.current.position.y = 1.45 + Math.sin(p * Math.PI * 0.82) * 22
      ballRef.current.position.z = 0.2 - p * 32

      ballRef.current.rotation.x += 0.3
      ballRef.current.rotation.y += 0.4
      ballRef.current.scale.setScalar(Math.max(0.08, 1 - p * 0.65))
      ballRef.current.visible = true
    } else {
      ballRef.current.visible = false
    }
  })

  return (
    <mesh ref={ballRef} castShadow>
      <sphereGeometry args={[0.16, 24, 24]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.25}
        metalness={0.05}
        emissive="#ffffff"
        emissiveIntensity={0.35}
      />
    </mesh>
  )
}

// ═══════════════════════════════════════════════════════════════
//  IMPACT HIT EFFECT: Sparks, Double Rings & Dynamic Flash
// ═══════════════════════════════════════════════════════════════
function ImpactHitEffect() {
  const { getAnimTime } = useContext(AnimContext)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const flashRef = useRef<THREE.PointLight>(null)
  const sparksRef = useRef<THREE.Points>(null)

  const { sparkPositions, sparkVelocities } = useMemo(() => {
    const N = 32
    const sparkPositions = new Float32Array(N * 3)
    const sparkVelocities = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      sparkPositions[i * 3] = 0
      sparkPositions[i * 3 + 1] = 0
      sparkPositions[i * 3 + 2] = 0

      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI - Math.PI / 2
      const speed = Math.random() * 8 + 4
      sparkVelocities[i * 3] = Math.cos(theta) * Math.cos(phi) * speed
      sparkVelocities[i * 3 + 1] = Math.sin(phi) * speed + 3
      sparkVelocities[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * speed
    }
    return { sparkPositions, sparkVelocities }
  }, [])

  useFrame(() => {
    const t = getAnimTime()
    if (!ring1Ref.current || !ring2Ref.current || !flashRef.current || !sparksRef.current) return

    const dt = t - TIME.CONTACT
    if (dt >= 0 && dt < 0.5) {
      const p = dt / 0.5

      ring1Ref.current.visible = true
      ring1Ref.current.scale.setScalar(1 + p * 12)
        ; (ring1Ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.95

      ring2Ref.current.visible = true
      ring2Ref.current.scale.setScalar(1 + p * 9)
        ; (ring2Ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.85

      flashRef.current.intensity = (1 - p) * 45

      sparksRef.current.visible = true
      const posAttr = sparksRef.current.geometry.attributes.position
      for (let i = 0; i < 32; i++) {
        posAttr.setXYZ(
          i,
          sparkVelocities[i * 3] * dt * 0.4,
          sparkVelocities[i * 3 + 1] * dt * 0.4 - 9.8 * dt * dt * 0.2,
          sparkVelocities[i * 3 + 2] * dt * 0.4
        )
      }
      posAttr.needsUpdate = true
        ; (sparksRef.current.material as THREE.PointsMaterial).opacity = (1 - p) * 0.9
    } else {
      ring1Ref.current.visible = false
      ring2Ref.current.visible = false
      flashRef.current.intensity = 0
      sparksRef.current.visible = false
    }
  })

  return (
    <group position={[2.9, 1.45, 0.2]}>
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <ringGeometry args={[0.08, 0.22, 32]} />
        <meshBasicMaterial color="#fde047" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[0, -Math.PI / 3, 0]} visible={false}>
        <ringGeometry args={[0.08, 0.22, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <points ref={sparksRef} visible={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sparkPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#fbbf24" transparent opacity={0} />
      </points>

      <pointLight ref={flashRef} color="#fef08a" distance={16} intensity={0} />
    </group>
  )
}

// ═══════════════════════════════════════════════════════════════
//  SCENE CONTROLLER & RUNNER
// ═══════════════════════════════════════════════════════════════
function SceneRunner({ resetTrigger }: { resetTrigger: number }) {
  const startClockTimeRef = useRef<number | null>(null)
  const currentClockRef = useRef<number>(0)

  useFrame(({ clock }) => {
    currentClockRef.current = clock.elapsedTime
    if (startClockTimeRef.current === null) {
      startClockTimeRef.current = clock.elapsedTime
    }
  })

  useEffect(() => {
    startClockTimeRef.current = currentClockRef.current
  }, [resetTrigger])

  const contextValue = {
    getAnimTime: () => {
      if (startClockTimeRef.current === null) return 0
      const elapsed = currentClockRef.current - startClockTimeRef.current
      return elapsed % TIME.TOTAL_LOOP
    },
  }

  return (
    <AnimContext.Provider value={contextValue}>
      <CinematicCamera />

      {/* Bright Atmospheric Stadium Broadcast Illumination */}
      <ambientLight intensity={1.35} color="#e0f2fe" />
      <directionalLight
        position={[4, 24, 16]}
        intensity={2.6}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-14, 18, 8]} intensity={1.4} color="#bae6fd" />
      <directionalLight position={[0, 16, -18]} intensity={1.1} color="#93c5fd" />

      {/* Baseball Field & Stadium Bowl Architecture */}
      <BaseballField />
      <Pitcher />
      <Batter />
      <Baseball />
      <ImpactHitEffect />
    </AnimContext.Provider>
  )
}

// ═══════════════════════════════════════════════════════════════
//  EXPORTED FULLSCREEN 3D BASEBALL INTRO
// ═══════════════════════════════════════════════════════════════
export function BaseballIntro() {
  const [mounted, setMounted] = useState(false)
  const [resetTrigger, setResetTrigger] = useState(0)
  const hasScrolledDown = useRef(false)
  const { scrollY } = useScroll()

  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 0.95])
  const y = useTransform(scrollY, [0, 500], [0, -60])
  const pointerEvents = useTransform(scrollY, (val) => (val > 450 ? 'none' : 'auto'))

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      if (latest > 250) {
        hasScrolledDown.current = true
      } else if (latest < 40 && hasScrolledDown.current) {
        hasScrolledDown.current = false
        setResetTrigger((prev) => prev + 1)
      }
    })
  }, [scrollY])

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="fixed inset-0 w-full h-screen z-30 overflow-hidden select-none pointer-events-none bg-gradient-to-b from-[#01040d] via-[#050f24] to-[#020712]"
    >
      {mounted && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            style={{ width: '100%', height: '100%' }}
          >
            <SceneRunner resetTrigger={resetTrigger} />
          </Canvas>
        </div>
      )}
    </motion.div>
  )
}
export default BaseballIntro
