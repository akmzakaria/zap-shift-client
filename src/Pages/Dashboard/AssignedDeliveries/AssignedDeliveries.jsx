import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from '../../../Hooks/useAuth'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { SiPanasonic } from 'react-icons/si'

const AssignedDeliveries = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels', user.email, 'rider_assigned'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=rider_assigned`
      )
      return res.data
    },
  })

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    }

    let message = `Parcel Status is updated with ${status.split('_').join(' ')}`

    axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          title: 'Parcel Accepted!',
          text: message,
          icon: 'success',
        })
      }
    })
  }

  return (
    <div>
      <h2 className="text-4xl">Parcel Pending Pickup: {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.deliveryStatus === 'rider_assigned' ? (
                    <>
                      <button
                        onClick={() => handleDeliveryStatusUpdate(parcel, 'rider_arriving')}
                        className="btn btn-primary text-black  btn-sm"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning text-black btn-sm ms-2">Reject</button>
                    </>
                  ) : (
                    <span className="text-green-600">Accepted</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_picked_up')}
                    className="btn btn-primary text-black btn-sm"
                  >
                    Marked as picked up
                  </button>

                  <button
                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_delivered')}
                    className="btn btn-primary text-black btn-sm mx-2"
                  >
                    Marked as delivered
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

export default AssignedDeliveries
