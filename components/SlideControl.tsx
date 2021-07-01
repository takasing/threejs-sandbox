import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
type Props = {
  title: string
  initialValue: number
  onChange: (v: number) => void
  className?: string
}
const SlideControl: React.FC<Props> = ({
  title,
  initialValue,
  onChange,
  className,
}) => {
  return (
    <section className={className}>
      <p>{title}</p>
      <Slider defaultValue={initialValue} onChange={onChange} />
    </section>
  )
}
export default SlideControl
