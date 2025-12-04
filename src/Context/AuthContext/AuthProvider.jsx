import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  ProviderId,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../../Firebase/Firebase.config'
import AuthContext from './AuthContext'
import { useEffect, useState } from 'react'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const googleProvider = new GoogleAuthProvider()

  const signinGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  //   sign out
  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  //   update user
  const updateUserProfile = (Profile) => {
    return updateProfile(auth.currentUser, Profile)
  }

  //   observe user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const authInfo = {
    registerUser,
    signInUser,
    signinGoogle,
    user,
    loading,
    logOut,
    updateUserProfile,
  }

  return <AuthContext value={authInfo}>{children}</AuthContext>
}

export default AuthProvider
