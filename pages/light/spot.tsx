import { OrbitControls, useHelper } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Mesh, SpotLight, SpotLightHelper } from 'three'

const Scene = () => {
  const { scene } = useThree()
  const mesh = useRef({} as Mesh)
  const spotLight = useRef({} as SpotLight)

  useFrame(({ clock }) => {
    mesh.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.y = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.position.x = Math.sin(clock.elapsedTime)
    mesh.current.position.z = Math.sin(clock.elapsedTime)
  })

  useEffect(() => void (spotLight.current.target = mesh.current), [scene])
  useHelper(spotLight, SpotLightHelper, 'teal')

  return (
    <>
      <spotLight
        castShadow
        position={[2, 6, 2]}
        ref={spotLight}
        angle={0.5}
        distance={10}
      />
      <mesh ref={mesh} position={[0, 2, 0]} castShadow>
        <boxGeometry attach="geometry" />
        <meshStandardMaterial attach="material" color="red" />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeBufferGeometry args={[100, 100]} attach="geometry" />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}
const SpotLightPage: React.FC = () => {
  return (
    <article className="container">
      <Canvas camera={{ position: [-5, 5, 5] }}>
        <fog attach="fog" args={['floralwhite', 0, 20]} />
        <Scene />
        <OrbitControls enableDamping dampingFactor={0.2} />
      </Canvas>
      <style jsx>{`
        .container {
          height: 100vh;
        }
      `}</style>
    </article>
  )
}
export default SpotLightPage
