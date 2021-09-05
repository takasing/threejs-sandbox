import { Html, OrbitControls } from '@react-three/drei'
import {
  Camera as ThreeCamera,
  Canvas,
  MeshProps,
  useFrame,
} from '@react-three/fiber'
import Flex from '../../components/Flex'
import css from 'styled-jsx/css'
import CustomGizmoHelper from '../../projects/CustomGizmoHelper'
import { forwardRef, useRef } from 'react'
import { Mesh, Object3D, PerspectiveCamera, Vector3 } from 'three'
import Camera from '../../projects/Camera'

const CanvasHeight = 800
const CanvasWidth = 1000
type Props = {
  className?: string
}
const Projection: React.FC<Props> = () => {
  const sphere1 = useRef<Mesh>(null)
  const sphere2 = useRef<Mesh>(null)
  const sphere3 = useRef<Mesh>(null)
  const sphere4 = useRef<Mesh>(null)
  const camera = useRef<PerspectiveCamera>(null)

  return (
    <Flex className={wrapperStyle.className} align="center" justify="center">
      <article className="container">
        <Canvas>
          <ambientLight args={[0xff0000]} intensity={0.5} />
          <gridHelper args={[120, 120, 120]} />
          <OrbitControls enableDamping dampingFactor={0.2} />
          <LabeledSphere ref={sphere1} position={[10, 0, 10]} />
          <LabeledSphere ref={sphere2} position={[-10, 0, 10]} />
          <LabeledSphere ref={sphere3} position={[-10, 0, -10]} />
          <LabeledSphere ref={sphere4} position={[10, 0, -10]} />
          <CustomGizmoHelper />
          <Camera ref={camera} position={new Vector3(10, 10, 10)} />
        </Canvas>
        <style jsx>{`
          .container {
            position: relative;
            width: ${CanvasWidth}px;
            height: ${CanvasHeight}px;
          }
        `}</style>
        {wrapperStyle.styles}
      </article>
    </Flex>
  )
}
const wrapperStyle = css.resolve`
  width: 100%;
  height: 100vh;
`

const toScreen = (camera: ThreeCamera, object: Object3D) => {
  const worldPosition = object.getWorldPosition(new Vector3())
  // スクリーン座標を取得する
  const projection = worldPosition.project(camera)
  const sx = (CanvasWidth / 2) * (+projection.x + 1.0)
  const sy = (CanvasHeight / 2) * (-projection.y + 1.0)
  return { x: Math.floor(sx), y: Math.floor(sy) }
}

const LabeledSphere = forwardRef<Mesh, MeshProps>((props, ref) => {
  const text = useRef('')
  const local = useRef<Mesh>()
  const applyRef = (node: Mesh) => {
    local.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }
  useFrame(({ camera }) => {
    if (typeof ref === 'function') {
      ref(local.current)
    } else if (ref) {
      const { x, y } = toScreen(camera, ref.current)
      text.current = `(${x}, ${y})`
    }
  })
  return (
    <mesh ref={applyRef} {...props}>
      <sphereGeometry args={[1, 32, 16]} />
      <meshPhongMaterial color={0xffff00} />
      <MeshLabel ref={text} />
    </mesh>
  )
})

const MeshLabel = forwardRef<string>((_, ref) => {
  const local = useRef<HTMLDivElement>()
  useFrame(() => {
    if (typeof ref === 'function') {
      // ref(local.current)
    } else if (ref) {
      local.current.textContent = ref.current
    }
  })
  return (
    <Html distanceFactor={10}>
      <div ref={local} className="content"></div>
      <style jsx>{`
        .content {
          font-family: 'Inter var', sans-serif;
          font-size: 40px;
          padding-top: 10px;
          transform: translate3d(50%, 0, 0);
          text-align: left;
          background: #202035;
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
        }
      `}</style>
    </Html>
  )
})

export default Projection
