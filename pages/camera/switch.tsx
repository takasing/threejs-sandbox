import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import css from 'styled-jsx/css'
import { Vector3 } from 'three'
import Flex from '../../components/Flex'
import Box from '../../projects/Box'
import Camera from '../../projects/Camera'

const farPosition = new Vector3(0, 10, 0)
const nearPosition = new Vector3(0, 0, 10)
type Props = {
  className?: string
}
/**
 * @param param0
 * @returns
 */
const Switch: React.FC<Props> = () => {
  const [position, setPosition] = useState(farPosition)
  const [isFar, setFar] = useState(true)
  const handlePosition = () => {
    setFar(!isFar)
  }
  useEffect(() => {
    isFar ? setPosition(farPosition) : setPosition(nearPosition)
  }, [isFar])
  return (
    <article className="container">
      <Flex className={canvasStyle.className}>
        <Canvas>
          <Camera position={position} />
          <ambientLight args={[0xff0000]} intensity={0.5} />
          <Box size={[5, 5, 5]} />
          <gridHelper args={[30, 30, 30]} />
        </Canvas>
        <section>
          <button onClick={handlePosition}>vertical</button>
          <button onClick={handlePosition}>horizontal</button>
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
export default Switch
