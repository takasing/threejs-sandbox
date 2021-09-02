import { forwardRef, useRef } from 'react'
import { Mesh, PerspectiveCamera } from 'three'
import Flex from '../../components/Flex'
import css from 'styled-jsx/css'
import { Canvas, useFrame } from '@react-three/fiber'
import { MovingSphere } from '../../projects/MovingSphere'
import { OrbitControls } from '@react-three/drei'

type Props = {
  className?: string
}
const Local: React.FC<Props> = () => {
  const sphere = useRef<Mesh>(null)
  const camera = useRef<PerspectiveCamera>()

  return (
    <article className="container">
      <Flex className={canvasStyle.className}>
        <Canvas camera={{ position: [0, 5, 0] }}>
          <ambientLight args={[0xff0000]} intensity={0.5} />
          <gridHelper args={[30, 30, 30]} />
          <MovingSphere ref={sphere} direction="x" />
          <OrbitControls enableDamping dampingFactor={0.2} />
          <LocalCamera ref={camera} />
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

const LocalCamera = forwardRef((_, ref) => {
  useFrame(() => {
    // const mesh = scene.children.filter((c) => c.type === 'Mesh')[0]
    // console.log(
    //   'useFrame',
    //   mesh.position,
    //   camera.position,
    //   // mesh.getWorldPosition(new Vector3())
    //   mesh.worldToLocal(
    //     new Vector3(camera.position.x, camera.position.y, camera.position.z)
    //     // new Vector3(camera.position.x, 0, 0)
    //   )
    // )
  })
  return <perspectiveCamera ref={ref} />
})

export default Local
