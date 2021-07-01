import css from 'styled-jsx/css'
import AbstractViewer from '../../projects/AbstractViewer'
import Box from '../../projects/Box'

const AmbientLight: React.FC = () => {
  return (
    <article className="container">
      <AbstractViewer className={viewerStyle.className}>
        {/* 環境光源で、空間全体に均等に光を当てる。一律明るくしたい場合に使う。 */}
        <ambientLight args={[0xff0000]} intensity={0.5} />
        <Box />
      </AbstractViewer>
      <style jsx>{`
        .container {
          height: 100vh;
        }
      `}</style>
      {viewerStyle.styles}
    </article>
  )
}
const viewerStyle = css.resolve`
  background-color: gray;
`
export default AmbientLight
