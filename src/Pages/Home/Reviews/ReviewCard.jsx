import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa6'

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review

  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-lg p-6 rounded-xl">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-2xl text-primary mb-3 opacity-60" />

      {/* Description */}
      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{testimonial}</p>

      {/* Divider */}
      <div className="border-t border-dashed mt-4 mb-3"></div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="">
          <img className="rounded-full w-10" src={user_photoURL} alt="" />
        </div>

        <div>
          <h3 className="font-semibold text-sm">{userName}</h3>
          <p className="text-xs text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
