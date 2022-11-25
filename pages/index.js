import Head from 'next/head';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';



export default function Home() {



  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-300">
      <Head>
        <title>dvck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-[98vh] place-items-center">

        <div className="grid gap-5 m-auto place-items-center">

          <div className='tablet:text-9xl mobile:text-7xl font-bold text-white tracking-tight'>
            <Typewriter options={{ loop: true, autoStart: true }} onInit={(typewriter) => {
              typewriter
                .typeString('Hello')
                .pauseFor(300)
                .deleteAll(250)
                .typeString('Hi!')
                .deleteAll(250)
                .typeString('Welcome')
                .pauseFor(300)
                .deleteAll(250)
                .typeString('Enjoy.')
                .pauseFor(5000)
                .deleteAll(250)
                .start();
            }}
            />
          </div>
          <div className="flex items-center gap-5">
            <Link href='/work' className="relative btn btn-outline rounded-none hover:rounded-lg">Timetable</Link>
            <Link href='/UpBank' className="relative btn btn-outline rounded-none hover:rounded-lg">Bank</Link>
            <Link href='/Test' className="relative btn btn-outline rounded-none hover:rounded-lg">Test</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
