import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import { getCookie } from '../src/utils/csrf'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Fetch CSRF cookie on app load
    axios
      .get('http://localhost:8000/api/csrf/', { withCredentials: true })
      .then(() => {
        console.log('CSRF cookie set')
      })
      .catch((err) => {
        console.error('Failed to get CSRF cookie:', err)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/auth/user/', { withCredentials: true })
      .then((res) => {
        setUser(res.data)
        setIsAuthenticated(true)
      })
      .catch(() => {
        setUser(null)
        setIsAuthenticated(false)
      })
  }, [])

  const handleLogout = () => {
    axios
      .post(
        'http://localhost:8000/api/auth/logout/',
        {},
        {
          withCredentials: true,
          headers: { 'X-CSRFToken': getCookie('csrftoken') },
        }
      )
      .then(() => {
        setUser(null)
        setIsAuthenticated(false)
      })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200'>
      {isAuthenticated && user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <div className='flex flex-col items-center justify-center h-screen space-y-8'>
          <LoginForm
            onLogin={(user) => {
              setUser(user)
              setIsAuthenticated(true)
            }}
          />
        </div>
      )}
    </div>
  )
}
