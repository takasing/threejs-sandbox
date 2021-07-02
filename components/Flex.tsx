import clsx from 'clsx'
import css from 'styled-jsx/css'

type Direction = 'row' | 'column'
type Justification = 'center' | 'space-between'
type Alignment = 'flex-start' | 'flex-end' | 'center'
type Props = {
  direction?: Direction
  justify?: Justification
  align?: Alignment
  className?: string
}
const Flex: React.FC<Props> = ({
  direction,
  justify,
  align,
  children,
  className,
}) => {
  const { className: cls, styles } = getFlexStyle({ justify, align, direction })
  return (
    <div className={clsx(cls, className)}>
      {children}
      {styles}
    </div>
  )
}
export const getFlexStyle = ({ justify, align, direction }) => css.resolve`
  display: flex;
  ${justify ? `justify-content: ${justify}` : ''};
  ${align ? `align-items: ${align}` : ''};
  ${direction ? `flex-direction: ${direction}` : ''};
`
type ClassNameType = {
  className?: string
}
export const Center: React.FC<ClassNameType> = ({ className, children }) => (
  <Flex className={className} justify="center" align="center">
    {children}
  </Flex>
)
export default Flex
