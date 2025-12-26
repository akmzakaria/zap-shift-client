import React from 'react'
import useAuth from '../../../Hooks/useAuth'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const CompletedDeliveries = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels', user.email, 'rider_assigned'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`
      )
      return res.data
    },
  })

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8
    } else {
      return parcel.cost * 0.6
    }
  }

  return (
    <div>
      <h2 className="text-4xl">Completed Deliveries {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Created At</th>
              <th>Pickedup District</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.cost}</td>
                <td>{calculatePayout(parcel)}</td>
                {/* <td>
                  {parcel.deliveryStatus === 'rider_assigned' ? (
                    <>
                      <button className="btn btn-primary text-black  btn-sm">Accept</button>
                      <button className="btn btn-warning text-black btn-sm ms-2">Reject</button>
                    </>
                  ) : (
                    <span className="text-green-600">Accepted</span>
                  )}
                </td> */}
                <td>
                  <button className="btn btn-primary text-black btn-sm">Cash Out</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CompletedDeliveries
