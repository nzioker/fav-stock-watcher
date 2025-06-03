import React from 'react'

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative'
        onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'
          aria-label='Close modal'
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  )
}
