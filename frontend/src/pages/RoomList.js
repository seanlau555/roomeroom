import React from 'react'
import { useAuth } from '../context/auth'

function RoomList() {
  const { user } = useAuth()
  console.log(111, user)

  return <div>RoomList</div>
}

export default RoomList
