import React from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import { TbTruckDelivery } from 'react-icons/tb'

const Work = () => {
  return (
    <div className="px-10">
      <h3 className="text-2xl font-bold">How It Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex flex-col gap-3 border rounded-2xl p-5">
          <div className="relative">
            <TbTruckDelivery strokeWidth={1} className="text-5xl " />
            <IoLocationOutline className="text-2xl absolute -top-3 left-1.5" />
          </div>
          <h4 className="text-xl font-bold">Booking Pick & Drop</h4>
          <p>From personal packages to business shipments — we deliver on time, every time.</p>
        </div>
        <div className="flex flex-col gap-3 border rounded-2xl p-5 ">
          <div className="relative">
            <TbTruckDelivery strokeWidth={1} className="text-5xl " />
            <IoLocationOutline className="text-2xl absolute -top-3 left-1.5  " />
          </div>
          <h4 className="text-xl font-bold">Cash On Delivery</h4>
          <p>From personal packages to business shipments — we deliver on time, every time.</p>
        </div>
        <div className="flex flex-col gap-3 border rounded-2xl p-5 ">
          <div className="relative">
            <TbTruckDelivery strokeWidth={1} className="text-5xl " />
            <IoLocationOutline className="text-2xl absolute -top-3 left-1.5  " />
          </div>
          <h4 className="text-xl font-bold">Delivery Hub</h4>
          <p>From personal packages to business shipments — we deliver on time, every time.</p>
        </div>
        <div className="flex flex-col gap-3 border rounded-2xl p-5 ">
          <div className="relative">
            <TbTruckDelivery strokeWidth={1} className="text-5xl " />
            <IoLocationOutline className="text-2xl absolute -top-3 left-1.5  " />
          </div>
          <h4 className="text-xl font-bold">Booking SME & Corporate</h4>
          <p>From personal packages to business shipments — we deliver on time, every time.</p>
        </div>
      </div>
    </div>
  )
}

export default Work
