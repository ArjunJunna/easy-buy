import { useState } from 'react';

const ImageSlider = () => {
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1628926379972-9843ad139a8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },

    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideNumber: number) => {
    setCurrentIndex(slideNumber);
  };

  return (
    <div className="max-w-[1400px] h-[400px] w-full relative p-1 mt-1 group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="h-full w-full bg-cover bg-center rounded-2xl duration-500"
      ></div>
      <div className="absolute top-[50%] cursor-pointer left-5 hidden -translate-x-0 translate-y-[-50%] group-hover:block bg-black/20 rounded-full px-1">
        <i
          className="bi bi-caret-left text-2xl text-white"
          onClick={prevSlide}
        ></i>
      </div>
      <div className="absolute top-[50%] cursor-pointer right-5 hidden -translate-x-0 translate-y-[-50%] group-hover:block bg-black/20 rounded-full px-1">
        <i
          className="bi bi-caret-right text-2xl text-white"
          onClick={nextSlide}
        ></i>
      </div>
      <div className="flex justify-center ">
        {slides.map((_, slideIndex) => (
          <div key={slideIndex}>
            <i
              className="bi bi-dot px-0.5 text-2xl cursor-pointer text-slate-300 hover:text-slate-700"
              onClick={() => goToSlide(slideIndex)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
