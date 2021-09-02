import { useFrame } from '@react-three/fiber'
import { forwardRef, useRef } from 'react'
import { Mesh } from 'three'

type MovingSphereProps = Partial<Mesh> & {
  direction: 'x' | 'y' | 'z'
}
export const MovingSphere = forwardRef<Mesh, MovingSphereProps>(
  ({ direction }, ref) => {
    const local = useRef<Mesh>(null)
    useFrame(({ clock }) => {
      // type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;
      // ↑これに対応
      // https://stackoverflow.com/a/62238917
      if (typeof ref === 'function') {
        ref(local.current)
      } else if (ref) {
        if (direction === 'x') {
          ref.current.position.x += Math.cos(clock.getElapsedTime()) / 10
        } else if (direction === 'z') {
          ref.current.position.z += Math.cos(clock.getElapsedTime()) / 5
        } else if (direction === 'y') {
          ref.current.position.y += Math.sin(clock.getElapsedTime()) / 10
        }
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
      <mesh ref={applyRef}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshPhongMaterial color={0xffff00} />
      </mesh>
    )
  }
)
