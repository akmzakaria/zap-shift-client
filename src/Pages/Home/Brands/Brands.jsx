import React from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import amazon from '../../../assets/brands/amazon.png'
import amazon_vec from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands//star.png'
import start_people from '../../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules'

const brandsLogo = [amazon, amazon_vec, casio, moonstar, randstad, star, start_people]

const Brands = () => {
  return (
    <div className="my-15 px-10 md:pl-25">
      <h3 className="text-2xl font-bold text-center text-secondary">
        We've helped thousands of sales teams
      </h3>
      <Swiper
        className="my-10"
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={20}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {brandsLogo.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Brands
