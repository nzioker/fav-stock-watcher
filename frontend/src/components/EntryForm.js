import React, { useState } from 'react'
import axios from 'axios'
import { getCookie } from '../utils/csrf'

export default function EntryForm({ onSuccess }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const csrftoken = getCookie('csrftoken')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(
        'http://localhost:8000/api/submit-entry/',
        { title, description },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrftoken,
          },
        }
      )
      setTitle('')
      setDescription('')
      onSuccess()
    } catch (err) {
      alert('Failed to submit entry.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>Add New Entry</h2>

      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
      />

      <textarea
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={4}
        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
      />

      <button
        type='submit'
        disabled={loading}
        className='w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition'
      >
        {loading ? 'Saving...' : 'Save Entry'}
      </button>
    </form>
  )
}
