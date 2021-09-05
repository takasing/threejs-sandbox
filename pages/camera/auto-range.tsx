import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import Flex from '../../components/Flex'
import css from 'styled-jsx/css'
import { forwardRef, MutableRefObject, useRef } from 'react'
import { BufferGeometry, Material, Mesh, PerspectiveCamera } from 'three'
import { CameraController } from './CameraController'

type Props = {
  className?: string
}
const AutoRange: React.FC<Props> = () => {
  const sphere1 = useRef<Mesh>(null)
  const sphere2 = useRef<Mesh>(null)
  const sphere3 = useRef<Mesh>(null)

  return (
    <article className="container">
      <Flex className={canvasStyle.className}>
        <Canvas>
          <ambientLight args={[0xff0000]} intensity={0.5} />
          <gridHelper args={[30, 30, 30]} />
          <MovingSphere ref={sphere1} direction="x" />
          <MovingSphere ref={sphere2} direction="z" />
          <MovingSphere ref={sphere3} direction="y" />
          <OrbitControls enableDamping dampingFactor={0.2} />
          <AdjustableCamera meshes={[sphere1, sphere2, sphere3]} />
        </Canvas>
      </Flex>
      <style jsx>{`
        .container {
          height: 100vh;
        }
      `}</style>
      {canvasStyle.styles}
    </article>
  )
}
const canvasStyle = css.resolve`
  height: 100%;
  flex: 4;
`

type AdjustableCameraProps = {
  meshes: MutableRefObject<Mesh<BufferGeometry, Material | Material[]>>[]
}
const AdjustableCamera: React.FC<AdjustableCameraProps> = ({ meshes }) => {
  const ref = useRef()
  useFrame(({ camera }) => {
    const { position, lookAt } = CameraController(
      camera as PerspectiveCamera
    ).fitByMove(meshes.map((m) => m.current))

    camera.position.set(position.x, position.y, position.z)
    camera.lookAt(lookAt)
  })
  return <perspectiveCamera ref={ref} near={0.01} fov={30} />
}

type MovingSphereProps = Partial<Mesh> & {
  direction: 'x' | 'y' | 'z'
}
const MovingSphere = forwardRef<Mesh, MovingSphereProps>(
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

export default AutoRange
