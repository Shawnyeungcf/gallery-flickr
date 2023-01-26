import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import PhotoContextProvider from '@/context/PhotoContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PhotoContextProvider>
      <Component {...pageProps} />
    </PhotoContextProvider>
  )
}
