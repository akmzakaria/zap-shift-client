import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import useAuth from '../../Hooks/useAuth'
import { useLoaderData } from 'react-router'
import Swal from 'sweetalert2'

const Rider = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    // formState: { errors },
  } = useForm()

  const { user } = useAuth()

  const axiosSecure = useAxiosSecure()

  const serviceCenters = useLoaderData()

  const regionsDuplicate = serviceCenters.map((c) => c.region)
  const regions = [...new Set(regionsDuplicate)]

  //   for rider
  const riderRegion = useWatch({ control, name: 'riderRegion' })

  const districtsByRegion = (riderRegion) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === riderRegion)

    const districts = regionDistricts.map((d) => d.district)

    return districts
  }

  const handleBeRider = (data) => {
    console.log(data)

    axiosSecure.post('/riders', data).then((res) => {
      if (res.data.insertedId) {
        console.log('rider added')
        Swal.fire({
          title: 'Placed!',
          text: 'Your application has been submitted. We will reach out soon!',
          icon: 'success',
        })
      }
    })
  }

  return (
    <div>
      <h2 className="text-4xl text-primary">Be a Rider</h2>
      <div className="px-10">
        <h2 className="text-4xl text-center font-bold">Send A Parcel</h2>
        <form onSubmit={handleSubmit(handleBeRider)} className="mt-12 text-black">
          {/* two column */}
          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-12">
            <div className="flex-1">
              {/* rider info */}
              <h4 className="text-lg font-semibold">rider Details</h4>

              {/* rider name */}
              <fieldset className="fieldset">
                <label className="label">rider Name</label>
                <input
                  defaultValue={user.displayName}
                  type="text"
                  {...register('riderName')}
                  className="input w-full"
                  placeholder="rider name"
                />

                {/* rider email */}
                <label className="label">rider Email</label>
                <input
                  defaultValue={user.email}
                  type="text"
                  {...register('riderEmail')}
                  className="input w-full"
                  placeholder="rider email"
                />

                {/* rider region */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">rider Region</legend>
                  <select
                    {...register('riderRegion')}
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

                {/* rider district */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">rider District</legend>
                  <select
                    {...register('riderDistrict')}
                    defaultValue="Pick a district"
                    className="select"
                  >
                    <option disabled={true}>Pick a district</option>

                    {districtsByRegion(riderRegion).map((d, i) => (
                      <option value={d} key={i}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <span className="label">Optional</span>
                </fieldset>

                {/* rider address */}
                <label className="label mt-4">rider Address</label>
                <input
                  type="text"
                  {...register('riderAddress')}
                  className="input w-full"
                  placeholder="rider address"
                />
              </fieldset>

              {/* receiver info */}
            </div>

            <div className="flex-1">
              {/* receiver info */}
              <h4 className="text-lg font-semibold">More Details</h4>

              {/* driving license */}

              <label className="label">Driving License</label>
              <input
                type="text"
                {...register('license')}
                className="input w-full"
                placeholder="Driving License"
              />

              {/* rider nid */}
              <fieldset className="fieldset">
                <label className="label">NID</label>
                <input
                  type="text"
                  {...register('nid')}
                  className="input w-full"
                  placeholder="NID"
                />

                {/* bike */}
                <label className="label mt-4">Bike Info</label>
                <input
                  type="text"
                  {...register('bike')}
                  className="input w-full"
                  placeholder="Bike"
                />
              </fieldset>
            </div>
          </div>
          <input
            type="submit"
            name="Submit"
            id=""
            className="btn btn-primary text-black"
            value={'Apply as a Rider'}
          />
        </form>
      </div>
    </div>
  )
}

export default Rider
