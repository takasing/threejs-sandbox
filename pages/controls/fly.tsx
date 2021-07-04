import { FlyControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Box from '../../projects/Box'

type Props = {
  className?: string
}
/**
 * @param param0
 * @returns
 */
const Fly: React.FC<Props> = () => {
  return (
    <article className="container">
      <Canvas camera={{ position: [-5, 5, 5] }}>
        <ambientLight args={[0xff0000]} intensity={0.5} />
        <Box args={[5, 5, 5]} />
        <FlyControls />
        <gridHelper args={[30, 30, 30]} />
      </Canvas>
      <style jsx>{`
        .container {
          height: 100vh;
        }
      `}</style>
    </article>
  )
}
export default Fly
