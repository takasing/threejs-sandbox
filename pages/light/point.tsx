import { OrbitControls, useHelper } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import css from 'styled-jsx/css'
import { BoxHelper, Group, Mesh, PointLightHelper } from 'three'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'

function Scene() {
  const group = useRef({} as Group)
  const mesh = useRef({} as Mesh)
  const pointLight = useRef()
  const pointLight2 = useRef()

  useFrame(({ clock }) => {
    mesh.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.y = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.position.x = Math.sin(clock.elapsedTime)
    mesh.current.position.z = Math.sin(clock.elapsedTime)
    group.current.rotation.y += 0.02
  })

  useHelper(mesh, BoxHelper, '#272740')
  useHelper(mesh, VertexNormalsHelper, 1, '#272740')
  useHelper(pointLight, PointLightHelper, 0.5, 'red')
  useHelper(pointLight2, PointLightHelper, 0.5, 'blue')

  return (
    <>
      <pointLight
        ref={pointLight2}
        position={[-10, 0, -20]}
        color="blue"
        intensity={2.5}
      />
      <group ref={group}>
        <pointLight
          ref={pointLight}
          color="red"
          position={[3, 4, 0]}
          intensity={5}
        />
      </group>
      <mesh ref={mesh} position={[0, 2, 0]} castShadow>
        <boxGeometry attach="geometry" />
        <meshStandardMaterial attach="material" color="lightblue" />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeBufferGeometry args={[100, 100]} attach="geometry" />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}
const PointLightPage: React.FC = () => {
  return (
    <article className="container">
      <Canvas camera={{ position: [-5, 5, 5] }}>
        {/* カメラからの開始距離と終点距離を設定することで、その間に存在するオブジェクトが指定した色によって霞んで表示される */}
        <fog attach="fog" args={['floralwhite', 0, 20]} />
        <Scene />
        <OrbitControls enableDamping dampingFactor={0.2} />
      </Canvas>
      <style jsx>{`
        .container {
          height: 100vh;
        }
      `}</style>
      {viewerStyle.styles}
    </article>
  )
}

const viewerStyle = css.resolve`
  background-color: gray;
`
export default PointLightPage
