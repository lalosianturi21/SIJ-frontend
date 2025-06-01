import Carousel from '../components/Carousel'
import ItemBody from '../components/ItemBody'
import MainLayout from '../components/MainLayout'
import { useState, useEffect } from 'react'

const images = [
  '/images/banner1.png',
  '/images/banner2.png',
  '/images/banner3.png'
]


function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }
  return (
    <>
      <MainLayout>
        <Carousel
          images={images}
          currentIndex={currentIndex}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
        />
        <ItemBody />
      </MainLayout>
    </>
  )
}

export default HomePage
