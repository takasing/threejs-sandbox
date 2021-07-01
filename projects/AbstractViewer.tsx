import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'
import css from 'styled-jsx/css'
type Props = {
  className?: string
}
// TODO: 名前は仮
const AbstractViewer: React.FC<Props> = ({ className, children }) => {
  return (
    <section className={clsx(containerStyle.className, className)}>
      <Canvas>
        {children}
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -2, 0]}
          opacity={1}
          width={20}
          height={20}
          blur={2}
          far={4.5}
        />
        <OrbitControls enableDamping dampingFactor={0.2} />
      </Canvas>
      {containerStyle.styles}
    </section>
  )
}

const containerStyle = css.resolve`
  width: 100%;
  height: 100%;
`
export default AbstractViewer
