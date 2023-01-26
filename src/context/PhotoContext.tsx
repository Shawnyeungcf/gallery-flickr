import { createContext, ReactNode, useState } from 'react'
import axios from "axios"
import { flikrAPIKey } from '../../config/app'
import { ImageDTO, Image } from '@/typings/image'

interface IPhotoContext {
  images: Image[]
  loading: boolean
  runSearch: (query: string) => void
}
export const PhotoContext = createContext<IPhotoContext>({
  images: [],
  loading: false,
  runSearch: () => {}
})

type Props = {
  children: ReactNode
}

const PhotoContextProvider = (props: Props) => {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)

  const runSearch = async (query: string) => {
    const api = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flikrAPIKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
    try {
      const response = await axios.get(api)
      const data: ImageDTO[] = response.data.photos.photo
      let image: Image[] = []

      if ( data.length > 0 ) {
        image = data.map(({id, title, secret, server}) => {
          return {
            id,
            title,
            secret,
            server,
          }
        })
      }

      setImages(image)
      setLoading(false)
    } catch (e) {
      console.warn('failed to search', e)
    }
  }

  return (
    <PhotoContext.Provider value={{images, loading, runSearch}}>
      {props.children}
    </PhotoContext.Provider>
  )
}

export default PhotoContextProvider
