import React from 'react'
import ForbiddenAccess from '../Components/ForbiddenAccess/ForbiddenAccess'
import Loading from '../Components/Loading/Loading'
import useRole from '../Hooks/useRole'
import useAuth from '../Hooks/useAuth'

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const { role, roleLoading } = useRole()

  console.log(role, roleLoading)
  if (loading || roleLoading || !user) {
    return <Loading />
  }

  if (role !== 'rider') {
    return <ForbiddenAccess />
  }

  return children
}

export default RiderRoute
