import Head from 'next/head'
import Link from 'next/link'



export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>dvck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-[98vh] place-items-center">
        <div className="m-auto">
          <div className="flex justify-center m-auto">
            <h1 className="text-9xl text-white font-bold tracking-tight ">Hello.</h1>
          </div>
          <div className="flex justify-center gap-2 ">
            <Link href='/work' className="btn">Work</Link>
            <Link href='/finances' className="btn">Finances</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
