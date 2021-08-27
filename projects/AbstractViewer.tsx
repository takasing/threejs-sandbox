import { OrbitControls } from '@react-three/drei'
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
