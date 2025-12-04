import React from 'react'
import Logo from '../../../Components/Logo/Logo'
import { Link, NavLink } from 'react-router'
import { FaCircleArrowRight } from 'react-icons/fa6'
import { useScrollDirection } from './useScrollDirection'
import useAuth from '../../../Hooks/useAuth'

const Navbar = () => {
  const { user, logOut } = useAuth()

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // console.log(result.user)
      })
      .catch(() => {
        // console.log(err)
      })
  }

  const direction = useScrollDirection()

  const links = (
    <>
      <li>
        <NavLink to={'/services'}>Services</NavLink>
      </li>

      <li>
        <NavLink to={'/aboutus'}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={'/send-parcel'}>Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to={'/coverage'}>Coverage</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to={'/dashboard/my-parcels'}>Dashboard</NavLink>
          </li>
        </>
      )}
    </>
  )

  return (
    <div
      className={`navbar bg-base-100 shadow sticky top-0 z-50
      transition-transform duration-300 ${
        direction === 'down' ? '-translate-y-full' : 'translate-y-0'
      } `}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <span className="btn btn-ghost text-xl">
          <Logo></Logo>
        </span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user && <img className="w-10 h-10 object-cover mr-2 rounded-full" src={user?.photoURL} />}
        {user ? (
          <button
            onClick={handleLogOut}
            className="btn text-[.8rem] md:text-[1rem] btn-sm md:btn-md rounded-lg mr-2 md:mr-3"
          >
            Sign Out
          </button>
        ) : (
          <Link
            to={'/login'}
            className="btn text-[.8rem] md:text-[1rem] btn-sm md:btn-md rounded-lg mr-2 md:mr-3"
          >
            Sign In
          </Link>
        )}

        <Link
          to={'/rider'}
          className="btn text-[.8rem] md:text-[1rem] btn-sm md:btn-md rounded-lg font-bold bg-primary"
        >
          Be a rider
        </Link>

        <FaCircleArrowRight className="text-2xl md:text-4xl -rotate-45 bg-primary rounded-full" />
      </div>
    </div>
  )
}

export default Navbar
