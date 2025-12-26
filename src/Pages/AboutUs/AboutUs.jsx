import React from 'react'
import { Users, Globe, Heart } from 'lucide-react'
import img from '../../assets/live-tracking.png'

const AboutUs = () => {
  return (
    <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
      {/* Hero / Introduction */}
      <div className="text-center mb-16">
        <p className="text-primary font-semibold tracking-widest mb-3">WHO WE ARE</p>
        <h1 className="text-3xl md:text-5xl font-extrabold">About ZapShift</h1>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          ZapShift is your trusted delivery platform, committed to fast, safe, and reliable
          deliveries for individuals and businesses. Our mission is to simplify the way goods move
          across cities.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-5 items-center mb-20">
        <img src={img} alt="Our story" className="size-80 " />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            ZapShift started with a simple idea — to make deliveries faster, easier, and more
            reliable. We started small, connecting local riders with people who needed quick
            deliveries. Today, we serve multiple cities with a growing network of trusted delivery
            partners.
          </p>
          <p className="text-gray-600">
            Every package matters to us, whether it’s a personal parcel or a business shipment. Our
            focus on technology, transparency, and customer satisfaction has made us a platform
            people trust.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="text-center mb-20">
        <p className="text-primary font-semibold tracking-widest mb-3">OUR VALUES</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">What We Believe In</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Users className="w-10 h-10 text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-center">Community</h3>
            <p className="text-gray-600 text-center">
              We value the community of riders, businesses, and customers that make ZapShift
              possible.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Globe className="w-10 h-10 text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-center">Innovation</h3>
            <p className="text-gray-600 text-center">
              Constantly improving our technology and services to make deliveries smarter and
              faster.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Heart className="w-10 h-10 text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-center">Trust & Safety</h3>
            <p className="text-gray-600 text-center">
              Ensuring packages are delivered safely and customers feel confident using our
              platform.
            </p>
          </div>
        </div>
      </div>

      {/* Team / CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Team</h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto">
          We are always looking for passionate individuals to join our mission. Whether you’re a
          rider, developer, or business partner, ZapShift offers opportunities to grow and make an
          impact.
        </p>
        <button className="px-8 py-3 rounded-full bg-primary font-semibold hover:opacity-90 transition">
          Become a Partner
        </button>
      </div>
    </section>
  )
}

export default AboutUs
