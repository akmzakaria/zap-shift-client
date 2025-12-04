import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { FaUserAltSlash, FaUserShield } from 'react-icons/fa'
import Swal from 'sweetalert2'

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure()
  const [searchText, setSearchText] = useState('')

  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`)
      return res.data
    },
  })

  const handleToggleAdmin = (user, role) => {
    const roleInfo = { role: role }
    Swal.fire({
      title: 'Are you sure?',
      text: `Make ${user.name} as an ${roleInfo.role} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch()

            Swal.fire({
              title: 'Updated Role!',
              text: `${user.name} marked as an ${roleInfo.role}`,
              icon: 'success',
            })
          }
        })
      }
    })
  }

  const handleMakeAdmin = (user) => {
    handleToggleAdmin(user, 'admin')
  }

  const handleRemoveAdmin = (user) => {
    handleToggleAdmin(user, 'user')
  }

  // const handleRemoveAdmin = (user) => {
  //   const roleInfo = { role: 'user' }
  //   axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
  //     if (res.data.modifiedCount) {
  //       refetch()
  //       Swal.fire({
  //         title: 'Updated Role!',
  //         text: `${user.name} marked as an User`,
  //         icon: 'success',
  //       })
  //     }
  //   })
  // }

  return (
    <div>
      <h2 className="text-4xl">Manage Users: {users.length}</h2>

      {/* search bar */}
      <label className="input ml-4">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          className="grow"
          placeholder="Search"
        />
      </label>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Other Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {users.map((user, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn bg-red-600 btn-sm"
                    >
                      <FaUserAltSlash />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-primary text-black btn-sm mr-2"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersManagement
