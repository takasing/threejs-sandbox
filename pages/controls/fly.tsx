import { FlyControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import css from 'styled-jsx/css'
import Flex from '../../components/Flex'
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
      <Flex className={canvasStyle.className}>
        <Canvas camera={{ position: [-5, 5, 5] }}>
          <ambientLight args={[0xff0000]} intensity={0.5} />
          <Box args={[5, 5, 5]} />
          <FlyControls movementSpeed={10} dragToLook />
          <gridHelper args={[30, 30, 30]} />
        </Canvas>
        <section>
          <pre>w: go</pre>
          <pre>s: back</pre>
          <pre>r: ↑</pre>
          <pre>f: ↓aaaaf</pre>
          <pre>a: ←</pre>
          <pre>d: →</pre>
        </section>
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
export default Fly
