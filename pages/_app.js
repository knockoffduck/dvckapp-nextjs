import Link from 'next/link'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<div>
    <header className='flex items-center absolute w-screen h-20 p-4'>
      <Link href="/" className='font-bold text-4xl z-10' >dvck</Link>

    </header>
    <Component {...pageProps} />
  </div>
  )
}

export default MyApp
