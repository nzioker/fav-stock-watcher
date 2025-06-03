import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard({ onLogout }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch entries on mount
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/entries/', { withCredentials: true })
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    axios
      .post(
        'http://localhost:8000/api/auth/logout/',
        {},
        { withCredentials: true }
      )
      .then(() => onLogout())
      .catch((err) => console.error(err))
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>Your Entries</h1>
        <button
          onClick={handleLogout}
          className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p className='text-gray-500'>Loading...</p>
      ) : entries.length === 0 ? (
        <p className='text-gray-500'>No entries yet. Add some!</p>
      ) : (
        <ul className='space-y-6'>
          {entries.map((entry) => (
            <li
              key={entry.id}
              className='p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition'
            >
              <h2 className='text-xl font-semibold text-gray-800'>
                {entry.title}
              </h2>
              <p className='mt-2 text-gray-600 whitespace-pre-wrap'>
                {entry.description}
              </p>
              <p className='mt-4 text-sm text-gray-400'>
                Created at: {new Date(entry.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
