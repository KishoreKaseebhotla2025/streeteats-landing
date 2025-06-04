// components/VendorCard.jsx
import React from 'react'

export default function VendorCard({ vendor }) {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full sm:w-80 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{vendor.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{vendor.location}</p>
        <p className="text-sm text-gray-700 mb-3">{vendor.summary}</p>
        <div className="text-xs text-white inline-block px-2 py-1 bg-orange-500 rounded-full">
          {vendor.cuisine}
        </div>
      </div>

      {vendor.videoUrl && (
        <a
          href={vendor.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm text-blue-600 underline hover:text-blue-800"
        >
          ▶ Watch Video
        </a>
      )}
    </div>
  )
}
