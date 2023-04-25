import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import { NotificationProvider } from './NotificationContext'

const queryCLient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <QueryClientProvider client={queryCLient}>
      <App />
    </QueryClientProvider>
  </NotificationProvider>
)
