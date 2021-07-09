import { OrbitControls, useCamera, useHelper } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import css from 'styled-jsx/css'
import {
  CameraHelper,
  Mesh,
  PerspectiveCamera,
  Raycaster,
  Vector3,
} from 'three'
import Flex from '../../components/Flex'
import Box from '../../projects/Box'

type Props = {
  className?: string
}
/**
 * @param param0
 * @returns
 */
const Raycast: React.FC<Props> = () => {
  return (
    <article className="container">
      <Flex className={canvasStyle.className}>
        <Canvas camera={{ position: [3, 5, 10] }}>
          <ambientLight args={[0xff0000]} intensity={0.5} />
          <Box size={[5, 5, 5]} />
          <Box size={[3, 3, 3]} position={new Vector3(5, 5, 7)} />
          <Box size={[2, 2, 2]} position={new Vector3(-5, 3, 5)} />
          <Box size={[2, 2, 2]} position={new Vector3(0, 3, 5)} />
          <Box size={[2, 2, 2]} position={new Vector3(0, 6, 0)} />
          <gridHelper args={[30, 30, 30]} />
          <CustomRaycaster />
          <OrbitControls enableDamping dampingFactor={0.2} />
        </Canvas>
      </Flex>
      <style jsx>{`
        .container {
          height: 100vh;
        }
        .information {
          flex: 1;
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
const CustomRaycaster = () => {
  const ref = useRef(new PerspectiveCamera(45, 2, 1, 1000))
  const raycaster = useRef<Raycaster>(new Raycaster())
  useHelper(ref, CameraHelper, 1, 'hotpink')
  useFrame(({ scene, raycaster, camera, mouse }) => {
    const meshList = scene.children.filter((c) => c.type === 'Mesh')
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children)
    meshList.map((mesh) => {
      if (intersects.length > 0 && mesh === intersects[0].object) {
        ;(mesh as Mesh).material.color.set(0x000000)
      } else {
        ;(mesh as Mesh).material.color.set(0xff0000)
      }
    })
    // TODO: ライトが接触したやつに色つけたい！
    // ref.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 5
  })
  return (
    <perspectiveCamera
      ref={ref}
      raycast={useCamera(ref, raycaster.current)}
      position={[0, 10, 10]}
    >
      {/* materialが必要 */}
      <meshBasicMaterial attach="material" />
    </perspectiveCamera>
  )
}
export default Raycast
