import axios from 'axios'
import { useQuery, useMutation } from 'react-query'
import { message } from 'antd'

export function useLogin({ onSuccess }) {
  return useMutation(
    async (variables) => {
      const { data } = await axios.post('http://localhost:8000/auth/login/', {
        username: variables.username,
        password: variables.password,
      })
      return data
    },
    {
      refetchOnWindowFocus: false,
      onSuccess,
      onError: () => {
        message.error('Username or password is incorrect.', 5)
      },
    },
  )
}

export function useGetUser({ onSuccess, onQueryError }) {
  return useMutation(
    async (variables) => {
      const { data } = await axios.get('http://localhost:8000/auth/user/', {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${variables.token}`,
        },
      })
      return data
    },
    {
      refetchOnWindowFocus: false,
      onSuccess,
      onError: (err) => {
        message.error('The access has been expired.', 5)
        onQueryError(err)
      },
    },
  )
}
