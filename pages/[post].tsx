import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'
import { ParsedUrlQuery } from 'querystring'

/**
 * Pre-renders all blog post paths determined by file names at /posts folder
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = fs.readdirSync(path.join(process.cwd(), 'posts'))
  const posts = filenames.map(filename => ({
    params: {
      post: filename.replace('.md', '')
    }
  }))

  return { paths: posts, fallback: false }
}

interface Params extends ParsedUrlQuery {
  post: string
}

/**
 * Supplies posts
 */
export const getStaticProps: GetStaticProps = async ({
  params: { post }
}: {
  params: Params
}) => {
  const fileContent = fs.readFileSync(
    path.join(process.cwd(), 'posts', `${post}.md`)
  )

  const parsedMd = matter(fileContent)
  const htmlString = marked(parsedMd.content)

  return {
    props: {
      data: parsedMd.data,
      htmlString
    }
  }
}

interface Data {
  title: string
  desc: string
}

interface Props {
  data: Data
  htmlString: string
}

/**
 * Component that renders the page using the HTML string params given by the props
 */
export default function Name({ data, htmlString }: Props) {
  return (
    <div className="container">
      <Head>
        <title>data.title</title>
        <meta title="description" content={data.desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
      </main>
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
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
