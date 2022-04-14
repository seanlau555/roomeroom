import React from 'react'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './context/auth'
import { QueryClient, QueryClientProvider } from 'react-query'

import Router from './router'
import './App.css'

const queryClient = new QueryClient()
const theme = {
  colors: {
    border: '#FFFDF9',
  },
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default App
