import React from 'react'
import useAuth from '../Hooks/useAuth'
import Loading from '../Components/Loading/Loading'
import useRole from '../Hooks/useRole'
import ForbiddenAccess from '../Components/ForbiddenAccess/ForbiddenAccess'

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const { role, roleLoading } = useRole()

  console.log(role, roleLoading)
  if (loading || roleLoading) {
    return <Loading />
  }

  if (role !== 'admin') {
    return <ForbiddenAccess />
  }

  return children
}

export default AdminRoute
