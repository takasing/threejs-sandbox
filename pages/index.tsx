import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">Three.js SANDBOX</h1>
      <section>
        <h2>Camera</h2>
        <ul>
          <li>
            <Link href="/camera/switch">Camera:switch</Link>
          </li>
          <li>
            <Link href="/camera/auto-range">Camera:auto range</Link>
          </li>
          <li>
            <Link href="/camera/perspective">Camera:perspective</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>Controls</h2>
        <ul>
          <li>
            <Link href="/controls/fly">Controls:fly</Link>
          </li>
          <li>
            <Link href="/controls/orbit">Controls:orbit</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>Light</h2>
        <ul>
          <li>
            <Link href="/light/ambient">Light:ambient</Link>
          </li>
          <li>
            <Link href="/light/point">Light:point</Link>
          </li>
          <li>
            <Link href="/light/spot">Light:spot</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>Model</h2>
        <ul>
          <li>
            <Link href="/models/robot">Model:robot</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>Raycast</h2>
        <ul>
          <li>
            <Link href="/raycast">Raycast</Link>
          </li>
        </ul>
      </section>
    </main>

    <footer>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <Image src="/vercel.svg" alt="Vercel Logo" height={'32'} width={'64'} />
      </a>
    </footer>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #0070f3;
        text-decoration: none;
      }

      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
      }

      .title {
        text-align: center;
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default Home
