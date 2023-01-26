import Head from 'next/head'
import { Inter } from '@next/font/google'
import { FormEvent, SetStateAction, useContext, useEffect, useState } from 'react'
import { PhotoContext } from '@/context/PhotoContext'
import Loader from '@/components/Loader'
import Gallery from '@/components/Gallery'
import styles from '@/styles/Home.module.scss'
import { debounce } from '@/utils/helper'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('>>> form submit')
  }

  const debouncedTest = debounce((input: string) => {
    setSearchEntry(input)
  }, 1000)

  const [searchEntry, setSearchEntry] = useState('')
  const updateSearchInputEntryState = (e: FormEvent<HTMLInputElement>) => {
    debouncedTest(e.currentTarget.value)
  }

  const { images, loading, runSearch } = useContext(PhotoContext)
  useEffect(() => {
    runSearch(searchEntry)
  }, [searchEntry])

  return (
    <>
      <Head>
        <title>Gallery Flickr</title>
        <meta name="description" content="Gallery Flickr" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1 className={inter.className}>Gallery Flickr</h1>
        <section>
          <form className="search-form" onSubmit={handleSubmit}>
            <input type="text" name="search" placeholder="Search..." onChange={updateSearchInputEntryState}/>
          </form>
        </section>
        <section className="search-results">
          <h2>{searchEntry} Images</h2>
          <div className="photo-container">
            { loading ? <Loader /> : <Gallery images={images} /> }
          </div>
        </section>
      </main>
    </>
  )
}
