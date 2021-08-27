import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import Flex from '../../components/Flex'
import css from 'styled-jsx/css'
import { useRef } from 'react'
import { Mesh } from 'three'

type Props = {
  className?: string
}
const AutoRange: React.FC<Props> = () => {
  return (
    <article className="container">
      <Flex className={canvasStyle.className}>
        <Canvas camera={{ position: [3, 5, 10] }}>
          <ambientLight args={[0xff0000]} intensity={0.5} />
          <gridHelper args={[30, 30, 30]} />
          <MovingSphere direction="x" />
          <MovingSphere direction="z" />
          <MovingSphere direction="y" />
          <OrbitControls enableDamping dampingFactor={0.2} />
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

type MovingSphereProps = Partial<Mesh> & {
  direction: 'x' | 'y' | 'z'
}
const MovingSphere = ({ direction }: MovingSphereProps) => {
  const ref = useRef({} as Mesh)
  useFrame(({ clock }) => {
    if (direction === 'x') {
      ref.current.position.x += Math.cos(clock.getElapsedTime()) / 10
    } else if (direction === 'z') {
      ref.current.position.z += Math.cos(clock.getElapsedTime()) / 5
    } else if (direction === 'y') {
      ref.current.position.y += Math.sin(clock.getElapsedTime()) / 10
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 16]} />
      <meshPhongMaterial color={0xffff00} />
    </mesh>
  )
}
export default AutoRange
