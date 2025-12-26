import { createBrowserRouter } from 'react-router'
import RootLayout from '../Layouts/RootLayout'
import Home from '../Pages/Home/Home'
import Coverage from '../Pages/Coverage/Coverage'
import AuthLayout from '../Layouts/AuthLayout'
import Login from '../Pages/Auth/Login/Login'
import Register from '../Pages/Auth/Register/Register'
import Rider from '../Pages/Rider/Rider'
import PrivateRoute from './PrivateRoute'
import SendParcel from '../Pages/SendParcel/SendParcel'
import DashboardLayout from '../Layouts/DashboardLayout'
import MyParcels from '../Pages/Dashboard/MyParcels/MyParcels'
import Payment from '../Pages/Dashboard/Payment/Payment'
import PaymentSuccess from '../Pages/Dashboard/Payment/PaymentSuccess'
import PaymentCancelled from '../Pages/Dashboard/Payment/PaymentCancelled'
import PaymentHistory from '../Pages/Dashboard/PaymentHistory/PaymentHistory'
import ApproveRiders from '../Pages/Dashboard/ApproveRiders/ApproveRiders'
import UsersManagement from '../Pages/Dashboard/UsersManagement/UsersManagement'
import AdminRoute from './AdminRoute'
import AssignRiders from '../Pages/Dashboard/AssignRiders/AssignRiders'
import RiderRoute from './RiderRoute'
import AssignedDeliveries from '../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries'
import CompletedDeliveries from '../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries'
import ParcelTrack from '../Pages/ParcelTrack/ParcelTrack'
import DashboardHome from '../Pages/Dashboard/DashboardHome/DashboardHome'
import Services from '../Pages/Services/Services'
import AboutUs from '../Pages/AboutUs/AboutUs'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'rider',
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
      },
      {
        path: 'send-parcel',
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenters.json').then((res) => res.json()),
      },
      {
        path: 'parcel-track/:trackingId',
        Component: ParcelTrack,
      },
      {
        path: 'services',
        Component: Services,
      },
      {
        path: 'about-us',
        Component: AboutUs,
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: 'my-parcels',
        Component: MyParcels,
      },
      {
        path: 'payment/:parcelId',
        Component: Payment,
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled,
      },
      {
        path: 'payment-history',
        Component: PaymentHistory,
      },

      // rider only routes
      {
        path: 'assigned-deliveries',
        element: (
          <RiderRoute>
            <AssignedDeliveries></AssignedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: 'completed-deliveries',
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },

      // admin only routes
      {
        path: 'approve-riders',
        element: (
          <AdminRoute>
            <ApproveRiders />
          </AdminRoute>
        ),
      },
      {
        path: 'assign-riders',
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
      {
        path: 'users-management',
        // element: <UsersManagement />,

        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
    ],
  },
])
