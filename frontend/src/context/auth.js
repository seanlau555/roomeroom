import React, { createContext, useState, useContext, useEffect } from 'react'
import { Route, useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useLogin, useGetUser } from './service'

const cookieIdToken = 'jwt_token'
// const cookieRefreshToken = 'refresh_token'

// api here is an axios instance

const AuthContext = createContext({})

const initialUser = {
  pk: '',
  name: '',
  email: '',
  first_name: '',
  last_name: '',
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')
  const [initializing, setInitializing] = useState(true)

  const setTokenValue = (name, token) => {
    Cookies.set(name, token)
  }

  const { mutate: userLogin, isLoading } = useLogin({
    onSuccess: (login) => {
      const { access_token, user } = login
      setTokenValue(cookieIdToken, access_token)
      setToken(access_token)
      setUser(user)
    },
  })

  const { mutate: queryUser } = useGetUser({
    onSuccess: (user) => {
      setUser(user)
      const accessToken = Cookies.get(cookieIdToken)
      setToken(accessToken)
      setInitializing(false)
    },
    onQueryError: () => {
      logout()
    },
  })

  useEffect(() => {
    async function loadUserFromStorage() {
      const token = Cookies.get(cookieIdToken)
      if (token) {
        queryUser({
          token,
        })
      } else {
        setInitializing(false)
      }
    }
    loadUserFromStorage()
  }, [])

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
        token,
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

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initializing } = useAuth()
  if (!isAuthenticated && !initializing) {
    return <Navigate to="/login" replace />
  }
  return children
}
