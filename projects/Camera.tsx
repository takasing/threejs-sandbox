import { PerspectiveCameraProps, useFrame } from '@react-three/fiber'
import { forwardRef } from 'react'
import { PerspectiveCamera, Vector3 } from 'three'

type Props = PerspectiveCameraProps & {
  position: Vector3
}
const Camera = forwardRef<PerspectiveCamera, Props>(({ position }, ref) => {
  useFrame(({ camera }) => {
    camera.position.lerp(position, 0.05)
    camera.lookAt(0, 0, 0)
  })
  return <perspectiveCamera ref={ref} />
})
export default Camera
