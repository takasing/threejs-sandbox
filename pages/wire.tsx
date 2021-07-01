import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  BoxHelper,
  SpotLightHelper,
  PointLightHelper,
  Mesh,
  SpotLight,
} from 'three'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'
// import { FaceNormalsHelper } from 'three/examples/jsm/helpers/FaceNormalsHelper'
import { OrbitControls, useHelper } from '@react-three/drei'

function Scene() {
  const { scene } = useThree()
  // const group = useRef({} as Group)
  const mesh = useRef({} as Mesh)
  const spotLight = useRef({} as SpotLight)
  const pointLight = useRef()

  useFrame(({ clock }) => {
    mesh.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.y = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.position.x = Math.sin(clock.elapsedTime)
    mesh.current.position.z = Math.sin(clock.elapsedTime)
    // group.current.rotation.y += 0.02
  })

  useEffect(() => void (spotLight.current.target = mesh.current), [scene])
  useHelper(mesh, BoxHelper, '#272740')
  useHelper(mesh, VertexNormalsHelper, 1, '#272740')
  // useHelper(mesh, FaceNormalsHelper, 0.5, '#272740')
  useHelper(spotLight, SpotLightHelper, 'teal')
  useHelper(pointLight, PointLightHelper, 0.5, 'hotpink')

  return (
    <>
      {/* <pointLight position={[-10, 0, -20]} color="lightblue" intensity={2.5} />
      <group ref={group}>
        <pointLight
          ref={pointLight}
          color="red"
          position={[4, 4, 0]}
          intensity={5}
        />
      </group> */}
      <spotLight
        castShadow
        position={[2, 5, 2]}
        ref={spotLight}
        angle={0.5}
        distance={20}
      />
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

export default function App() {
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
