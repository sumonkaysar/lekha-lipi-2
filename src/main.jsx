import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './contexts/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import BlogsProvider from './contexts/BlogsProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BlogsProvider>
          <App />
          <Toaster />
        </BlogsProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
