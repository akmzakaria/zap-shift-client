import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router'

const Logo = () => {
  return (
    <Link to={'/'}>
      <div className="flex items-end">
        <img className="w-6 md:w-9" src={logo} alt="" />
        <h3 className="text-xl -ms-1 md:-ms-2.5 font-bold">ZapShift</h3>
      </div>
    </Link>
  )
}

export default Logo
