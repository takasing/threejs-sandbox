import { MeshProps, useFrame } from '@react-three/fiber'
import { forwardRef, useRef } from 'react'
import { Mesh } from 'three'

const Sphere = forwardRef<Mesh, MeshProps>((props, ref) => {
  const local = useRef<Mesh>(null)
  useFrame(() => {
    if (typeof ref === 'function') {
      ref(local.current)
    } else if (ref) {
      // Use ref
    }
  })
  const applyRef = (node: Mesh) => {
    local.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }
  return (
    <mesh ref={applyRef} {...props}>
      <sphereGeometry args={[1, 32, 16]} />
      <meshPhongMaterial color={0xffff00} />
    </mesh>
  )
})

export default Sphere
