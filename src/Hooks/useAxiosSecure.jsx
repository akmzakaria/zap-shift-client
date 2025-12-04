import axios, { AxiosError } from 'axios'
import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { registerVersion } from 'firebase/app'
import { useNavigate } from 'react-router'
import { SiNativescript } from 'react-icons/si'

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
})

const useAxiosSecure = () => {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Beared ${user?.accessToken}`
      return config
    })

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        console.log(error)

        const statusCode = error.status
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate('/login')
          })
        }

        return Promise.reject(error)
      }
    )

    // request interceptor
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor)
      axiosSecure.interceptors.response.eject(resInterceptor)
    }
  }, [user, logOut, navigate])

  return axiosSecure
}

export default useAxiosSecure
