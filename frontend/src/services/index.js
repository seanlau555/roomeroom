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

export function useRoomDetail(id, token) {
  return useQuery(
    ['rooms', id],
    async () => {
      const { data } = await axios.get(`http://localhost:8000/rooms/${id}/`, {
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

export function useBookingList(token) {
  return useQuery(
    ['booking'],
    async () => {
      const { data } = await axios.get('http://localhost:8000/rooms/booking/', {
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

export function useBookingSubmit(token, { onSuccess }) {
  return useMutation(
    async (variables) => {
      const { data } = await axios.post(
        `http://localhost:8000/rooms/booking/create/`,
        variables,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return data
    },
    {
      refetchOnWindowFocus: false,
      onSuccess,
      onError: (err) => {
        message.error(err.response.data, 5)
      },
    },
  )
}

export function useBookingRemove(token, { onSuccess }) {
  return useMutation(
    async (variables) => {
      const { data } = await axios.post(
        `http://localhost:8000/rooms/booking/delete/`,
        variables,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return data
    },
    {
      refetchOnWindowFocus: false,
      onSuccess,
      onError: (err) => {
        message.error(err.message, 5)
      },
    },
  )
}
