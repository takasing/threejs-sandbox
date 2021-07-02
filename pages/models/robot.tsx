import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import css from 'styled-jsx/css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Flex from '../../components/Flex'
import RobotExpressive, { ActionName } from '../../model/RobotExpressive'

const Robot = () => {
  const [action, setAction] = useState<ActionName>()
  const handleJump = () => {
    setAction('Jump')
  }
  return (
    <article className="container">
      <Flex className={wrapperStyle.className}>
        <section className={canvasStyle.className}>
          <Canvas camera={{ position: [-5, 5, 5] }}>
            <fog attach="fog" args={['floralwhite', 0, 20]} />
            <Scene action={action} />
            <OrbitControls enableDamping dampingFactor={0.2} />
          </Canvas>
        </section>
        <section className={controlStyle.className}>
          <Flex direction="column">
            <button onClick={handleJump}>jump</button>
            <button onClick={() => setAction('Punch')}>punch</button>
          </Flex>
        </section>
      </Flex>

      <style jsx>{`
        .container {
          height: 100vh;
        }
      `}</style>
      {wrapperStyle.styles}
      {canvasStyle.styles}
      {controlStyle.styles}
    </article>
  )
}

const wrapperStyle = css.resolve`
  height: 100%;
`
const canvasStyle = css.resolve`
  flex: 4;
`
const controlStyle = css.resolve`
  flex: 1;
`

type SceneProps = {
  action?: ActionName
}
const Scene: React.FC<SceneProps> = ({ action }) => {
  return (
    <>
      <hemisphereLight position={[0, 20, 0]} args={[0xffffff, 0x444444]} />
      <directionalLight position={[0, 20, 10]} args={[0xffffff]} />
      <Suspense fallback={null}>
        <RobotExpressive action={action} />
      </Suspense>
      {/* <mesh ref={mesh} position={[0, 2, 0]} castShadow>
        <meshStandardMaterial attach="material" color="red" />
      </mesh> */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeBufferGeometry args={[100, 100]} attach="geometry" />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

export type ObjectMap = {
  nodes: { [name: string]: THREE.Object3D }
  materials: { [name: string]: THREE.Material }
}

function buildGraph(object: THREE.Object3D) {
  const data: ObjectMap = { nodes: {}, materials: {} }
  if (object) {
    object.traverse((obj: any) => {
      if (obj.name) {
        data.nodes[obj.name] = obj
      }
      if (obj.material && !data.materials[obj.material.name]) {
        data.materials[obj.material.name] = obj.material
      }
    })
  }
  return data
}
export const fetchGLTF = async (url: string) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(
      url,
      (data: any) => {
        if (data.scene) Object.assign(data, buildGraph(data.scene))
        resolve(data)
      },
      () => {},
      (error) => reject(`Could not load ${url}: ${error.message}`)
    )
  })
}
export default Robot
