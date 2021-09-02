import { OrbitControls } from '@react-three/drei'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'
import { forwardRef, useRef } from 'react'
import { Mesh, PerspectiveCamera, Vector3 } from 'three'
import Flex from '../../components/Flex'
import css from 'styled-jsx/css'
import { useControls } from 'leva'
import Camera, { CameraProps } from '../../projects/Camera'

type Props = {
  className?: string
}
const Perspective: React.FC<Props> = () => {
  return (
    <article className="container">
      <Flex className={canvasStyle.className}>
        <Canvas camera={{}}>
          <ambientLight args={[0xff0000]} intensity={0.5} />
          <gridHelper args={[120, 120, 120]} />
          <OrbitControls enableDamping dampingFactor={0.2} />
          <Sphere position={[8, 0, 8]} />
          <Sphere position={[-8, 0, 8]} />
          <Sphere position={[-8, 0, -8]} />
          <Sphere position={[8, 0, -8]} />
          <Sphere position={[100, 0, -100]} />
          <WrappedCamera />
        </Canvas>
      </Flex>
      <section className={controlsStyle.className}></section>
      <style jsx>{`
        .container {
          height: 100vh;
        }
      `}</style>
      {canvasStyle.styles}
      {controlsStyle.styles}
    </article>
  )
}
const canvasStyle = css.resolve`
  height: 100%;
  flex: 4;
`
const controlsStyle = css.resolve`
  position: fixed;
  right: 0;
  top: 0;
`

const WrappedCamera = forwardRef<typeof Camera, CameraProps>(() => {
  const camera = useRef<PerspectiveCamera>()
  const { x, y, z, fov, near, far } = useControls({
    x: {
      value: -8,
      min: -10,
      max: 10,
    },
    y: {
      value: 8,
      min: -10,
      max: 10,
    },
    z: {
      value: 8,
      min: -10,
      max: 10,
    },
    fov: {
      value: 50,
      min: 10,
      max: 180,
    },
    // 手前が見えなくなってくる
    near: {
      value: 0.1,
      min: 0.1,
      max: 10,
    },
    // 多分遠くにものを置かないとあんま意味ない
    far: {
      value: 200,
      min: 10,
      max: 300,
    },
  })
  return (
    <Camera
      ref={camera}
      position={new Vector3(x, y, z)}
      fov={fov}
      near={near}
      far={far}
    />
  )
})

const Sphere = forwardRef<Mesh, MeshProps>((props, ref) => {
  const local = useRef<Mesh>(null)
  useFrame(() => {
    // type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;
    // ↑これに対応
    // https://stackoverflow.com/a/62238917
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

export default Perspective
