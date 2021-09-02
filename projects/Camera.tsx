import { PerspectiveCameraProps, useFrame } from '@react-three/fiber'
import { forwardRef, useRef } from 'react'
import { PerspectiveCamera, Vector3 } from 'three'
import * as Drei from '@react-three/drei'

export type CameraProps = PerspectiveCameraProps & {
  position?: Vector3
  alpha?: number
  look?: Vector3
}
const Camera = forwardRef<PerspectiveCamera, CameraProps>((props, ref) => {
  const local = useRef<PerspectiveCamera>(null)
  const { position, look = new Vector3(0, 0, 0), fov, near, far } = props
  useFrame(() => {
    if (typeof ref === 'function') {
      ref(local.current)
    } else if (ref) {
      ref.current.lookAt(look)
      // ref.current.fov = fov
      // ref.current.near = near
      // ref.current.far = far
    }
  })

  return (
    <Drei.PerspectiveCamera
      ref={ref}
      makeDefault
      position={position}
      fov={fov}
      aspect={window.innerWidth / window.innerHeight}
      far={far}
      near={near}
    />
  )
})
export default Camera
