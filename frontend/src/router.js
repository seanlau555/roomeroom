import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './context/auth'
import RoomList from './pages/RoomList'
import RoomDetail from './pages/RoomDetail'
import LoginPage from './pages/login'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/room/:id"
          element={
            <ProtectedRoute>
              <RoomDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RoomList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
