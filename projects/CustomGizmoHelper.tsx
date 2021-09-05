import { GizmoHelper, GizmoViewport } from '@react-three/drei'
type Props = {
  className?: string
}
const CustomGizmoHelper: React.FC<Props> = () => {
  return (
    <GizmoHelper
      alignment="bottom-right" // widget alignment within scene
      margin={[80, 80]} // widget margins (X, Y)
      onUpdate={() => {}}
      // onTarget={/* return current camera target (e.g. from orbit controls) to center animation */}
    >
      <GizmoViewport
        axisColors={['red', 'green', 'skyblue']}
        labelColor="black"
      />
    </GizmoHelper>
  )
}
export default CustomGizmoHelper
