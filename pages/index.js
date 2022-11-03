import Head from 'next/head'
import Link from 'next/link'



export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>dvck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-[98vh] place-items-center">
        <div className="grid gap-5 m-auto justify-center ">
          <h1 className="text-9xl text-white font-bold tracking-tight ">Hello.</h1>
          <div className="flex items-center justify-center">
            <Link href='/work' className="relative btn btn-outline rounded-none">Timetable</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
