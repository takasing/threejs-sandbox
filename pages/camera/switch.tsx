import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useState } from 'react'
import css from 'styled-jsx/css'
import { Vector3 } from 'three'
import Flex from '../../components/Flex'
import Box from '../../projects/Box'

type Props = {
  className?: string
}
/**
 * @param param0
 * @returns
 */
const Switch: React.FC<Props> = () => {
  const [angle, setAngle] = useState<Angle>('horizontal')
  return (
    <article className="container">
      <Flex className={canvasStyle.className}>
        <Canvas>
          <Camera angle={angle} />
          <ambientLight args={[0xff0000]} intensity={0.5} />
          <Box args={[5, 5, 5]} />
          <gridHelper args={[30, 30, 30]} />
        </Canvas>
        <section>
          <button onClick={() => setAngle('vertical')}>vertical</button>
          <button onClick={() => setAngle('horizontal')}>horizontal</button>
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
type Angle = 'vertical' | 'horizontal'
type CameraProps = {
  angle: Angle
}
const Camera: React.FC<CameraProps> = ({ angle }) => {
  const vec = new Vector3()
  const { camera } = useThree()
  useFrame(() => {
    if (angle === 'vertical') {
      camera.position.lerp(vec.set(0, 10, 10), 0.05)
    }
    if (angle === 'horizontal') {
      camera.position.lerp(vec.set(0, 0, 10), 0.3)
    }
    camera.lookAt(0, 0, 0)
  })
  return <perspectiveCamera />
}
export default Switch
