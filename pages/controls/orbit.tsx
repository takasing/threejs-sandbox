import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Box from '../../projects/Box'

type Props = {
  className?: string
}
/**
 * orbit: 軌道
 * 周回軌道を描くようにカメラを配置する
 * 日本指ドラッグだと座標ごと動くというか、カメラの位置が変わっているだけ
 * @param param0
 * @returns
 */
const Orbits: React.FC<Props> = () => {
  return (
    <article className="container">
      <Canvas camera={{ position: [-5, 5, 5] }}>
        <ambientLight args={[0xff0000]} intensity={0.5} />
        <Box args={[5, 5, 5]} />
        <OrbitControls enableDamping dampingFactor={0.2} />
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
export default Orbits
