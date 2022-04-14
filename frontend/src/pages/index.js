import React from 'react'
import { Route, Switch } from 'react-router-dom'
import RoomList from './RoomList'
import RoomDetail from './RoomDetail'
import BookingDetail from './BookingDetail'
import { useAuth } from '../context/auth'

function HomePage() {
  const { user } = useAuth()

  console.log(111, user)

  return (
    <Switch>
      <Route path="/booking/${id}" component={BookingDetail} />
      <Route path="/rooms/${id}" component={RoomDetail} />
      <Route path="/" component={RoomList} />
    </Switch>
  )
}

export default HomePage