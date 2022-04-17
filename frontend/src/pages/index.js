import React from 'react'
import { Route, Switch } from 'react-router-dom'
import RoomList from './RoomList'
import RoomDetail from './RoomDetail'
import BookingDetail from './BookingDetail'

function HomePage() {
  return (
    <Switch>
      <Route path="/booking/:id" component={BookingDetail} />
      <Route path="/room/:id" component={RoomDetail} />
      <Route path="/" component={RoomList} />
    </Switch>
  )
}

export default HomePage
