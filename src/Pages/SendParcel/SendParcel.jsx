import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { SiMaxplanckgesellschaft } from 'react-icons/si'
import { useLoaderData, useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import useAuth from '../../Hooks/useAuth'

const SendParcel = () => {
  const serviceCenters = useLoaderData()

  const {
    register,
    handleSubmit,
    watch,
    control,
    // formState: { errors },
  } = useForm()

  const { user } = useAuth()

  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

  const regionsDuplicate = serviceCenters.map((c) => c.region)
  const regions = [...new Set(regionsDuplicate)]
  //   explore useMemo, useCasllback
  //   const senderRegion = watch('senderRegion')

  //   for sender
  const senderRegion = useWatch({ control, name: 'senderRegion' })

  const districtsByRegion = (senderRegion) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === senderRegion)

    const districts = regionDistricts.map((d) => d.district)

    return districts
  }

  //   for receiver

  const receiverRegion = useWatch({ name: 'receiverRegion', control })

  const districtsByRegionReceiver = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region)

    const districts = regionDistricts.map((d) => d.district)
    return districts
  }

  const handleSendParcel = (data) => {
    console.log(data)

    const isDocument = data.parcelType === 'document'
    const isSameDistrict = data.senderDistrict === data.receiverDistrict
    const parcelWeight = parseFloat(data.parcelWeight)

    let cost = 0
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150
      } else {
        const minCharge = isSameDistrict ? 110 : 150
        const extraWeight = parcelWeight - 3
        const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40
        cost = minCharge + extraCharge
      }
    }

    // console.log(cost)
    data.cost = cost

    Swal.fire({
      title: 'Agree with the cost?',
      text: `You will be charged ${cost} BDT`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm and Continue Payment!',
    }).then((result) => {
      // save the percel info to the database

      axiosSecure.post('/parcels', data).then((res) => {
        console.log('after saving parcel', res.data)
        if (res.data.insertedId) {
          if (result.isConfirmed) {
            navigate('/dashboard/my-parcels')
            Swal.fire({
              title: 'Placed!',
              text: 'Your parcel has been created. Please pay!',
              icon: 'success',
            })
          }
        }
      })
    })
  }

  return (
    <div className="px-10">
      <h2 className="text-4xl text-center font-bold">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)} className="mt-12 text-black">
        {/* parcel type*/}
        <div>
          <label className="label mx-4">
            <input
              type="radio"
              {...register('parcelType')}
              value="document"
              className="radio"
              defaultChecked
            />{' '}
            Document
          </label>

          <label className="label">
            <input
              type="radio"
              {...register('parcelType')}
              value="non-document"
              className="radio"
            />{' '}
            Non-document
          </label>
        </div>

        {/* parcel info, name, weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register('parcelName')}
              className="input w-full"
              placeholder="parcel name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Parcel Weight</label>
            <input
              type="number"
              {...register('parcelWeight')}
              className="input w-full"
              placeholder="parcel weight"
            />
          </fieldset>
        </div>

        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-12">
          <div className="flex-1">
            {/* sender info */}
            <h4 className="text-lg font-semibold">Sender Details</h4>

            {/* sender name */}
            <fieldset className="fieldset">
              <label className="label">Sender Name</label>
              <input
                defaultValue={user.displayName}
                type="text"
                {...register('senderName')}
                className="input w-full"
                placeholder="Sender name"
              />

              {/* sender email */}
              <label className="label">Sender Email</label>
              <input
                defaultValue={user.email}
                type="text"
                {...register('senderEmail')}
                className="input w-full"
                placeholder="Sender email"
              />

              {/* sender region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender Region</legend>
                <select
                  {...register('senderRegion')}
                  defaultValue="Pick a region"
                  className="select"
                >
                  <option disabled={true}>Pick a region</option>

                  {regions.map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
                <span className="label">Optional</span>
              </fieldset>

              {/* sender district */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender District</legend>
                <select
                  {...register('senderDistrict')}
                  defaultValue="Pick a district"
                  className="select"
                >
                  <option disabled={true}>Pick a district</option>

                  {districtsByRegion(senderRegion).map((d, i) => (
                    <option value={d} key={i}>
                      {d}
                    </option>
                  ))}
                </select>
                <span className="label">Optional</span>
              </fieldset>

              {/* sender address */}
              <label className="label mt-4">Sender Address</label>
              <input
                type="text"
                {...register('senderAddress')}
                className="input w-full"
                placeholder="Sender address"
              />
            </fieldset>

            {/* receiver info */}
          </div>

          <div className="flex-1">
            {/* receiver info */}
            <h4 className="text-lg font-semibold">receiver Details</h4>

            {/* receiver name */}

            <label className="label">receiver Name</label>
            <input
              type="text"
              {...register('receiverName')}
              className="input w-full"
              placeholder="receiver name"
            />

            {/* receiver email */}
            <fieldset className="fieldset">
              <label className="label">receiver Email</label>
              <input
                type="text"
                {...register('receiverEmail')}
                className="input w-full"
                placeholder="receiver email"
              />

              {/* receiver region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Region</legend>
                <select
                  {...register('receiverRegion')}
                  defaultValue="Pick a region"
                  className="select"
                >
                  <option disabled={true}>Pick a region</option>

                  {regions.map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
                <span className="label">Optional</span>
              </fieldset>

              {/* receiver district */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver District</legend>
                <select
                  {...register('receiverDistrict')}
                  defaultValue="Pick a district"
                  className="select"
                >
                  <option disabled={true}>Pick a district</option>

                  {districtsByRegionReceiver(receiverRegion).map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
                <span className="label">Optional</span>
              </fieldset>

              {/* receiver address */}
              <label className="label mt-4">receiver Address</label>
              <input
                type="text"
                {...register('receiverAddress')}
                className="input w-full"
                placeholder="receiver address"
              />
            </fieldset>

            {/* receiver info */}
          </div>
        </div>
        <input type="submit" name="Submit" id="" className="btn btn-primary text-black" />
      </form>
    </div>
  )
}

export default SendParcel
