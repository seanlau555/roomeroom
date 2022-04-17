import axios from 'axios'
import { useQuery, useMutation } from 'react-query'
import { message } from 'antd'

export function useRoomList(token) {
  return useQuery(
    ['rooms'],
    async () => {
      const { data } = await axios.get('http://localhost:8000/rooms/', {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      return data
    },
    {
      refetchOnWindowFocus: false,
      onError: (err) => {
        message.error(err.message, 5)
      },
    },
  )
}
