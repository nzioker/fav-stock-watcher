import React, { useState } from 'react'
import axios from 'axios'

export default function SignupForm({ onSignup }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        'http://localhost:8000/api/auth/signup/',
        { username, password },
        { withCredentials: true }
      )
      onSignup()
    } catch (error) {
      alert('Signup failed')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='p-6 bg-white rounded-2xl shadow-xl w-80'
    >
      <h2 className='text-xl font-bold mb-4 text-gray-800'>Sign Up</h2>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none'
      />
      <button
        type='submit'
        className='w-full py-2 bg-green-600 text-white rounded-xl hover:bg-green-700'
      >
        Sign Up
      </button>
    </form>
  )
}
