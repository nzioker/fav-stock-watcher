import React, { useState } from 'react'
import axios from 'axios'
import { getCookie } from '../utils/csrf'

export default function ModalForm({ toggleModal }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
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

      setSuccessMessage('Entry added successfully!')
      setTitle('')
      setDescription('')

      setTimeout(() => {
        setSuccessMessage('')
        toggleModal()
        setLoading(false)
      }, 1500)
    } catch (error) {
      alert('Failed to save entry')
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-2xl p-8 shadow-2xl w-96'
      >
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>New Entry</h2>

        {successMessage && (
          <div className='mb-4 text-green-600 font-semibold'>
            {successMessage}
          </div>
        )}

        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none'
          disabled={loading}
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none h-24'
          disabled={loading}
        />
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={toggleModal}
            className='text-gray-600 hover:underline'
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className={`bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
