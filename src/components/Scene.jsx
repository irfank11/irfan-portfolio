import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Cube({ p, s, c, r }) {
  const m = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    m.current.rotation.y = r[1] + t * 0.12
    m.current.rotation.x = r[0] + Math.sin(t * 0.4 + p[0]) * 0.15
    m.current.position.y = p[1] + Math.sin(t * 0.6 + p[0]) * 0.15
  })
  return (
    <mesh ref={m} position={p} rotation={r}>
      <boxGeometry args={s} />
      <meshStandardMaterial color={c} roughness={0.55} metalness={0.15} />
    </mesh>
  )
}

function Rig({ children }) {
  const g = useRef()
  useFrame(({ pointer }) => {
    g.current.rotation.y += (pointer.x * 0.35 - g.current.rotation.y) * 0.05
    g.current.rotation.x += (-pointer.y * 0.18 - g.current.rotation.x) * 0.05
  })
  return <group ref={g}>{children}</group>
}

export default function Scene({ dark }) {
  const c = dark ? ['#2b3a4d', '#4a3a36', '#1f2733', '#2a2f3a'] : ['#c5cedb', '#e2b99c', '#b3bfcf', '#cfd6e1']
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={dark ? 0.35 : 0.9} />
      <pointLight position={[1.2, 2.4, 2]} intensity={dark ? 60 : 30} color="#ff9a5a" />
      <directionalLight position={[-4, 3, 3]} intensity={dark ? 0.4 : 1} />
      <Rig>
        <Cube p={[-2.2, 1.2, -1]} s={[1.9, 1.9, 1.9]} c={c[0]} r={[0.3, 0.6, 0.1]} />
        <Cube p={[0, 0.2, 0]} s={[2.6, 2.6, 2.6]} c={c[1]} r={[0.5, 0.8, 0]} />
        <Cube p={[2.4, -1.6, -0.5]} s={[1.8, 1.8, 1.8]} c={c[2]} r={[0.2, 0.3, 0.4]} />
        <Cube p={[-1.4, -2, 0.5]} s={[0.9, 1.4, 0.9]} c={c[3]} r={[0.4, 0.2, 0.9]} />
        <mesh position={[0.9, 2.5, 0.5]}>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshBasicMaterial color="#ffb08a" />
        </mesh>
      </Rig>
    </Canvas>
  )
}
