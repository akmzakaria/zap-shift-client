import { useQuery } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null)
  const axiosSecure = useAxiosSecure()
  const riderModalRef = useRef()

  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ['parcels', 'parcel_paid'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels?deliveryStatus=parcel_paid')
      return res.data
    },
  })

  // todo: invalidate query after assigning a rider
  const { data: riders = [], refetch: riderRefetch } = useQuery({
    queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&riderDistrict=${selectedParcel.senderDistrict}&workStatus=available`
      )
      return res.data
    },
  })

  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel)
    riderModalRef.current.showModal()
  }

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.riderEmail,
      riderName: rider.riderName,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    }
    axiosSecure.patch(`parcels/${selectedParcel._id}`, riderAssignInfo).then((res) => {
      riderModalRef.current.close()
      parcelsRefetch()
      riderRefetch()
      console.log(res.data)
      if (res.data.modifiedCount) {
        Swal.fire({
          title: 'Rider Assigned!',
          text: `Rider status is set to in_delivery!`,
          icon: 'success',
        })
      }
    })
  }

  return (
    <div>
      <h2 className="text-5xl">Assign Riders: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-primary text-black btn-sm"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}
      <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders: {riders.length}</h3>

          {/* table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, i) => (
                  <tr key={rider._id}>
                    <th>{i + 1}</th>
                    <td>{rider.riderName}</td>
                    <td>{rider.riderEmail}</td>
                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn btn-primary text-black"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default AssignRiders
