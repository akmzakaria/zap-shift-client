import React, { useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router'
import { toast } from 'react-toastify'

import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix default icon paths
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const Coverage = () => {
  const position = [23.810332, 90.412518]
  const serviceCenters = useLoaderData()
  //   console.log(serviceCenters)

  const mapRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault()
    const location = e.target.location.value
    const cleanLocation = location.replace(/\s+/g, '')

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(cleanLocation.toLowerCase())
    )

    if (cleanLocation.length !== 0) {
      if (district) {
        const coordinate = [district.latitude, district.longitude]

        console.log(district, coordinate)

        //   go to the location
        mapRef.current.flyTo(coordinate, 14)
      } else {
        toast.info('Sorry! We do not have this coverage.')
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl md:text-5xl text-center font-bold my-5">
        We are available in 64 districts
      </h2>

      {/* search */}
      <div className="mb-3 w-11/12 mx-auto">
        <form onSubmit={handleSearch}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
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
            <input type="search" name="location" className="grow" placeholder="Search" />
          </label>
        </form>
      </div>

      {/*  */}
      <div className="mb-10">
        <MapContainer
          className="h-130 z-1 w-11/12 mx-auto rounded-lg"
          center={position}
          zoom={7}
          attributionControl={false}
          scrollWheelZoom={true}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>
                  {center.district} <br />
                  Service Area: {center.covered_area.join(', ')}
                </strong>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default Coverage
