import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { FaTrashCan, FaUserCheck } from 'react-icons/fa6'
import { IoPersonRemoveSharp } from 'react-icons/io5'
import Swal from 'sweetalert2'

import { FaInfoCircle } from 'react-icons/fa'

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure()
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ['riders', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders')
      console.log(res.data)
      return res.data
    },
  })

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.riderEmail }
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          title: 'Updated Status!',
          text: `Rider status is set to ${status}!`,
          icon: 'success',
        })
      }
    })
  }

  const handleApproval = (rider) => {
    updateRiderStatus(rider, 'approved')
  }

  const handleReject = (rider) => {
    updateRiderStatus(rider, 'rejected')
  }

  return (
    <div>
      <h2 className="text-5xl">Riders Pending Approval: {riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, i) => (
              <tr key={rider._id}>
                <th>{i + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.riderDistrict}</td>
                <td>
                  <p
                    className={`${rider.status === 'approved' ? 'text-green-600' : 'text-red-500'}`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td>
                  <button className="btn btn-sm btn-info text-black mr-1">
                    <FaInfoCircle />
                  </button>

                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn btn-sm btn-primary text-black mr-1"
                  >
                    <FaUserCheck />
                  </button>
                  <button onClick={() => handleReject(rider)} className="btn btn-sm btn-error mr-1">
                    <IoPersonRemoveSharp />
                  </button>

                  <button className="btn btn-sm text-red-600">
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ApproveRiders
