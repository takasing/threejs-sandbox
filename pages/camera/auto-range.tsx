import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import Flex from '../../components/Flex'
import css from 'styled-jsx/css'
import { forwardRef, MutableRefObject, useRef } from 'react'
import {
  BufferGeometry,
  Material,
  Mesh,
  PerspectiveCamera,
  Vector3,
} from 'three'
import { degToRad } from 'three/src/math/MathUtils'

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
    const ay0 = Math.tan(degToRad((camera as PerspectiveCamera).fov * 0.5))
    const ay1 = -ay0
    const ax0 = ay0 * (camera as PerspectiveCamera).aspect
    const ax1 = -ax0
    let yMin = 0
    let yMax = 0
    let xMin = 0
    let xMax = 0

    // const localSpheres = worldToLocals(camera.position, meshes.map(m => m.current))
    const localSpheres = meshes.map(
      (m) =>
        // m.current.worldToLocal(camera.position)
        m.current.position
    )

    for (let i = 0; i < localSpheres.length; i++) {
      const m = localSpheres[i]
      if (!m) {
        continue
      }

      const y0 = m.y - ay0 * m.z
      const y1 = m.y - ay1 * m.z
      const x0 = m.x - ax0 * m.z
      const x1 = m.x - ax1 * m.z
      yMin = Math.min(yMin, y0)
      yMax = Math.max(yMax, y1)
      xMin = Math.min(xMin, x0)
      xMax = Math.max(xMax, x1)
    }
    // console.log(yMax, yMin, xMax, xMin)

    const zy = (yMax - yMin) / (ay0 - ay1)
    const y = yMin + ay0 * zy
    const zx = (xMax - xMin) / (ax0 - ax1)
    const x = xMin + ax0 * zx

    // 大枠の調整はここではない
    // FIXME: 何故かy,z=0
    // camera.position.set(x, y + 5, Math.min(zy, zx))
    const localPos = new Vector3(
      buffer(x, 3),
      buffer(y, 3),
      buffer(Math.min(zy, zx), 10)
    )
    // const newWorldCam = camera.localToWorld(localPos)
    // console.log(localPos, newWorldCam)

    camera.position.set(localPos.x, localPos.y, localPos.z)
    // camera.position.set(newWorldCam.x, newWorldCam.y, newWorldCam.z)
    camera.lookAt(0, 0, 0)
    // console.log('cam pos', camera.position)
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

const buffer = (x: number, buf: number) => {
  return x > 0 ? x + buf : x < 0 ? x - buf : x
}
export default AutoRange
