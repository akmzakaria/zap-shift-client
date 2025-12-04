import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import banner1 from '../../../assets/banner/banner1.png'
import banner2 from '../../../assets/banner/banner2.png'
import banner3 from '../../../assets/banner/banner3.png'
import { Link } from 'react-router'
import { FaCircleArrowRight } from 'react-icons/fa6'

const Banner = () => {
  return (
    <div className="mx-2 my-10 relative">
      <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false} showStatus={false}>
        <div>
          <img src={banner1} />
        </div>
        <div>
          <img src={banner2} />
        </div>
        <div>
          <img src={banner3} />
        </div>
      </Carousel>

      <div className="flex gap-2 items-center absolute bottom-6 left-15 hidden md:flex">
        <div className="flex items-center">
          <Link className="btn rounded-full bg-primary font-bold">Track your parcel</Link>
          <FaCircleArrowRight className="text-4xl -rotate-45 bg-primary rounded-full" />
        </div>
        <Link className="btn font-bold rounded-lg">Be a rider</Link>
      </div>

      <div className="flex w-full pr-5 justify-start absolute bottom-2 md:hidden">
        <div className="flex pl-1 items-center">
          <Link className="btn btn-sm rounded-full bg-primary font-bold">Track your parcel</Link>
          <FaCircleArrowRight className="text-2xl -rotate-45 bg-primary rounded-full" />
        </div>
      </div>

      <div className=" flex justify-end w-full pr-1 absolute bottom-2 md:hidden">
        <Link className="btn btn-sm font-bold rounded-lg">Be a rider</Link>
      </div>
    </div>
  )
}

export default Banner
