import Link from 'next/link'

type Props = {
  href: string
  className?: string
}
const LinkText: React.FC<Props> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}
export default LinkText
