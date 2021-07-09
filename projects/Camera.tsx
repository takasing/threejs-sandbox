import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

export type Angle = 'vertical' | 'horizontal'
type Props = {
  angle: Angle
}
const Camera: React.FC<Props> = ({ angle }) => {
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
export default Camera
