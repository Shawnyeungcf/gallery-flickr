type IProps = {
  images: any[]
}

const Gallery = (props: IProps) => {

  console.log('>>> images', props.images)

  return (
    <div>
      <ul>test</ul>
    </div>
  )
}

export default Gallery
