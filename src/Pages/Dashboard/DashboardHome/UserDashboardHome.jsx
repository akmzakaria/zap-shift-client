import React from 'react'
import useRole from '../../../Hooks/useRole'
import Loading from '../../../Components/Loading/Loading'
import AdminDashboardHome from './AdminDashboardHome'
import RiderDashboardHome from './RiderDashboardHome'

const UserDashboardHome = () => {
  const { role, roleLoading } = useRole()

  if (roleLoading) {
    return Loading
  }

  if (role === 'admin') {
    return <AdminDashboardHome></AdminDashboardHome>
  } else if (role === 'rider') {
    return <RiderDashboardHome></RiderDashboardHome>
  } else {
    return (
      <div>
        <h2>User</h2>
      </div>
    )
  }
}

export default UserDashboardHome
