import Head from 'next/head'
import { useRouter } from 'next/router'

/**
 * Simple component that renders a component based on the name given in the URL
 */
export default function Name() {
  const { query } = useRouter()
  const { name } = query
  const isLoading = name == null

  return (
    <div className="container">
      <Head>
        {isLoading ? <></> : <title>{isLoading ? 'Loading...' : name}</title>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{!isLoading ? <h1>{name}</h1> : <div>Loading</div>}</main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
