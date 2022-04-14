import axios from 'axios'
import { useMutation } from 'react-query'
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

export function useAuthRefresh({ onSuccess, onQueryError }) {
  return {
    mutate: () => {},
  }
  // return useMutation(
  //   async (variables) => {
  //     const response = await client.request(USER_AUTH_REFRESH, variables)
  //     return response.login
  //   },
  //   {
  //     initialData: null,
  //     refetchOnWindowFocus: false,
  //     onSuccess,
  //     onError: (err) => {
  //       message.error('The access has been expired.', 5)
  //       onQueryError(err)
  //     },
  //   },
  // )
}
