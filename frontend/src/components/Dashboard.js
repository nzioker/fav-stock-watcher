import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Modal from './Modal'
import EntryForm from './EntryForm'

export default function Dashboard({ user, onLogout }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  // Fetch entries on mount
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/entries/', { withCredentials: true })
      .then((res) => {
        setEntries(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load entries')
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Navbar
        username={user.username}
        onLogout={onLogout}
        onOpenModal={openModal}
      />

      <main className='p-6 max-w-4xl mx-auto'>
        <h2 className='text-2xl font-semibold mb-4'>Entries</h2>

        {loading && <p>Loading entries...</p>}
        {error && <p className='text-red-600'>{error}</p>}

        {!loading && !error && entries.length === 0 && <p>No entries found.</p>}

        <ul className='space-y-4'>
          {entries.map((entry) => (
            <li key={entry.id} className='border rounded p-4 bg-white shadow'>
              <h3 className='font-semibold text-lg'>{entry.title}</h3>
              <p>{entry.description}</p>
            </li>
          ))}
        </ul>
      </main>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <EntryForm
          onSuccess={() => {
            closeModal()
            // Optionally refresh entries after new addition
            axios
              .get('http://localhost:8000/api/entries/', {
                withCredentials: true,
              })
              .then((res) => setEntries(res.data))
              .catch(() => setError('Failed to refresh entries'))
          }}
        />
      </Modal>
    </>
  )
}
