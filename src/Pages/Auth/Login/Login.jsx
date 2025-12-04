import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../../Hooks/useAuth'
import { Link, useLocation, useNavigate } from 'react-router'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'

const Login = () => {
  const { signInUser, signinGoogle } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleLogin = (data) => {
    console.log(data)
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user)
        navigate(location?.state || '/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleGoogleSignin = () => {
    signinGoogle()
      .then((result) => {
        console.log(result.user)
        // create user in the database
        const userInfo = {
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
        }

        axiosSecure.post('/users', userInfo).then((res) => {
          console.log('user data has been stored', res.data)
          navigate(location?.state || '/')
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h3 className="font-bold text-4xl">Welcome Back</h3>
      <p className="">Login with ZapShift</p>

      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            {...register('email', { required: true })}
            type="email"
            name="email"
            className="input w-90"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && <p className="text-error">Email is required!</p>}

          {/* password */}
          <label className="label">Password</label>
          <input
            {...register('password', {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
            })}
            type="password"
            name="password"
            className="input w-90"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && (
            <p className="text-error">Password is required!</p>
          )}

          {errors.password?.type === 'minLength' && (
            <p className="text-error">Password must be at least 6 characters long</p>
          )}

          {errors.password?.type === 'pattern' && (
            <p className="text-error">
              Must include uppercase, lowercase, number, and special character
            </p>
          )}

          {/* forgot pass */}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary text-black w-90 mt-4">Login</button>
          <p className="text-[#71717a]">
            Don't have an account?{' '}
            <Link state={location.state} className="text-primary underline" to={'/register'}>
              Register
            </Link>
          </p>
        </fieldset>
      </form>
      {/* google btn */}
      <button
        onClick={handleGoogleSignin}
        className="btn w-90 bg-white text-black border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  )
}

export default Login
