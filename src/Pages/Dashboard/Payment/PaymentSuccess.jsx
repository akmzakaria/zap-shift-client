import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState({})
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  console.log(sessionId)
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`).then((res) => {
        console.log(res.data)
        setPaymentInfo({
          transectionId: res.data.transectionId,
          trackingId: res.data.trackingId,
        })
      })
    }
  }, [sessionId, axiosSecure])

  return (
    <div>
      <h2 className="text-4xl">Payment Successful</h2>
      <p>Your Transection ID: {paymentInfo.transectionId}</p>
      <p>Your Parcel Tracking ID: {paymentInfo.trackingId}</p>
    </div>
  )
}

export default PaymentSuccess
