import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './context/auth'
import HomePage from './pages'
import LoginPage from './pages/login'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
