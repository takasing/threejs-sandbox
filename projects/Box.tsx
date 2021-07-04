import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

type Props = {
  args?: [number, number, number]
}
const Box: React.FC<Props> = ({ args }) => {
  const mesh = useRef({} as Mesh)
  useFrame(() => (mesh.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh position={[0, 0, 0]} ref={mesh} scale={1}>
      {/* あくまで形状のみ */}
      <boxGeometry args={args || [1, 1, 1]} />
      {/* materialがないとライティングが機能せず透明のまま */}
      {/* ライティングを無視 */}
      {/* <meshBasicMaterial /> */}
      {/* ライティング必要としないマテリアル */}
      {/* <meshNormalMaterial /> */}
      {/* <meshLambertMaterial /> */}
      <meshPhongMaterial />
    </mesh>
  )
}

export default Box
