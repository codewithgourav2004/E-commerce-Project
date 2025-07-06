import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';

import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';

const sliderData = [
  { image: 'image.png', text: 'Welcome to All in One Store' },
  { image: 'banner2.jpg', text: 'Grab the Best Deals Today' },
  { image: 'banner3.jpg', text: 'Shop Smart, Live Better' },
  { image: 'banner4.jpg', text: 'Top Brands, Low Prices' },
  { image: 'banner5.jpg', text: 'Fashion | Electronics | Grocery' },
  { image: 'banner6.jpg', text: 'Your One-Stop Shopping Destination' },
  { image: 'banner7.jpg', text: 'Hurry! Limited Time Offers' },
  { image: 'banner8.jpg', text: 'Fast Delivery Nationwide' },
  { image: 'banner9.jpeg', text: 'Secure Payment & Easy Returns' },
];

export default function Slider() {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1}
        grabCursor={true}
        keyboard={{ enabled: true }}
        breakpoints={{
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
        scrollbar={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className="mySwiper"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={`/Banner/${slide.image}`}
                alt={`Slide ${index + 1}`}
                className="w-full h-[400px] object-cover rounded-md"
              />
              <div className="absolute bottom-6 left-6 bg-black bg-opacity-50 text-white px-6 py-3 rounded-lg shadow-md text-xl font-bold backdrop-blur-sm">
                {slide.text}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
