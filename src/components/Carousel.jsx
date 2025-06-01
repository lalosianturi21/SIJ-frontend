export default function Carousel({ images, currentIndex, prevSlide, nextSlide }) {
  return (
   <div className="slide-wrapper relative w-full overflow-hidden h-[400px] md:h-[500px]">
      <div
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full flex-shrink-0 object-cover h-[500px]"
          />
        ))}
      </div>

       <button
          onClick={prevSlide}
          className="next-previous absolute left-4 top-1/2 transform -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full z-10 !bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={4}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="next-previous absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full z-10 !bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={4}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
    </div>
  )
}
