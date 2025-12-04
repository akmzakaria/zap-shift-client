import React from 'react'
import Logo from '../Components/Logo/Logo'
import { Outlet } from 'react-router'
import authImg from '../assets/authImage.png'

const AuthLayout = () => {
  return (
    <div className="relative">
      <div className="absolute top-5 md:top-0 left-10">
        <Logo></Logo>
      </div>

      <div className="flex-1 flex  min-h-screen justify-center items-center  ">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1 hidden md:flex min-h-screen justify-center items-center bg-[#fafdf0]">
          <img src={authImg} alt="" />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
