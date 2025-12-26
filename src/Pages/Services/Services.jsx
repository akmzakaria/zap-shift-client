import React from 'react'
import { Truck, Package, Clock, MapPin, Store, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'

const services = [
  {
    title: 'Fast Local Delivery',
    description:
      'Quick and reliable same-day delivery within the city for parcels, documents, and essentials.',
    icon: <Clock className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Intercity Shipping',
    description:
      'Send packages safely between cities with real-time tracking and trusted delivery partners.',
    icon: <Truck className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Parcel & Document Delivery',
    description: 'Secure handling of parcels and important documents with proof of delivery.',
    icon: <Package className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Live Tracking',
    description:
      'Track your delivery in real-time from pickup to doorstep using GPS-based tracking.',
    icon: <MapPin className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Business & Merchant Support',
    description:
      'Dedicated delivery solutions for shops, e-commerce sellers, and small businesses.',
    icon: <Store className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Safe & Reliable',
    description: 'Verified riders, secure packaging, and customer support to ensure peace of mind.',
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
  },
]

const Services = () => {
  return (
    <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-primary font-semibold tracking-widest mb-3">WHAT WE OFFER</p>
        <h1 className="text-3xl md:text-5xl font-extrabold">ZapShift Services</h1>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          ZapShift is built to make deliveries faster, safer, and smarter — whether you’re an
          individual or a growing business.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to deliver with ZapShift?</h2>
        <p className="text-gray-500 mb-6">
          Join ZapShift today and experience hassle-free deliveries.
        </p>
        <Link
          to={'/send-parcel'}
          className="px-8 py-3 rounded-full bg-primary font-semibold hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  )
}

export default Services
