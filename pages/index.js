import Head from 'next/head';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';



export default function Home() {



  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <Head>
        <title>dvck</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-[98vh] place-items-center">

        <div className="grid gap-5 m-auto justify-center">

          <div className='text-9xl font-bold text-white tracking-tight'>
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
                .pauseFor(1000)
                .deleteAll(250)
                .start();
            }}
            />
          </div>
          <div className="flex items-center justify-center">
            <Link href='/work' className="relative btn btn-outline rounded-none hover:rounded-lg">Timetable</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
