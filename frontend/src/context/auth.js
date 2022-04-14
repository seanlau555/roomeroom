import React, { createContext, useState, useContext, useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useLogin, useAuthRefresh } from './service'

// const cookieIdName = 'userId'
// const cookieIdUsername = 'username'
const cookieIdToken = 'jwt_token'
const cookieRefreshToken = 'refresh_token'

// api here is an axios instance

const AuthContext = createContext({})

const initialUser = {
  contact: null,
  id: '',
  name: '',
  username: '',
  token: '',
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  const setToken = (name, token) => {
    Cookies.set(name, token)
  }

  const { mutate: userLogin, isLoading } = useLogin({
    onSuccess: (login) => {
      const { access_token, refresh_token, user } = login
      console.log(access_token)
      setToken(cookieIdToken, access_token)
      setToken(cookieRefreshToken, refresh_token)
      setUser(user)
    },
  })

  // const {
  //   mutate: queryUser,
  //   isLoading: authLoading,
  //   data: authUser,
  //   isSuccess: called,
  // } = useAuthRefresh({
  //   onSuccess: ({ access_token, refresh_token }) => {
  //     setToken(cookieIdToken, access_token)
  //     setToken(cookieRefreshToken, refresh_token)
  //   },
  //   onQueryError: () => {
  //     logout()
  //   },
  // })

  useEffect(() => {
    setInitializing(false)
    // async function loadUserFromStorage() {
    //   const token = Cookies.get(cookieIdToken)
    //   if (token) {
    //     queryUser({
    //       token,
    //     })
    //   } else {
    //     setInitializing(false)
    //   }
    // }
    // loadUserFromStorage()
  }, [])

  // useEffect(() => {
  //   if (called && !authLoading) {
  //     if (authUser) {
  //       setUser(authUser)
  //       setInitializing(false)
  //     } else {
  //       setInitializing(false)
  //     }
  //   }
  // }, [authUser, called, authLoading])

  const login = async ({ username, password }) => {
    userLogin({ username, password })
  }

  const logout = () => {
    Cookies.remove(cookieIdToken)
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        initializing,
        loading: isLoading,
        user: isAuthenticated ? user : initialUser,
        login,
        logout,
      }}
    >
      {!initializing ? children : null}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}

// route HOC
export function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated, initializing } = useAuth()
  console.log(3, isAuthenticated, initializing)
  const history = useHistory()
  const location = {
    pathname: '/login',
    state: { from: 'home' },
  }

  useEffect(() => {
    if (!isAuthenticated && !initializing) history.push(location)
  }, [initializing, isAuthenticated])

  return <Route {...rest} render={(props) => <Component {...props} />} />
}
