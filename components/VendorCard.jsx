import React from 'react';

const VendorCard = ({ vendor }) => {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{vendor.name}</h2>
      <p className="text-sm text-gray-600 mb-1">{vendor.location}</p>
      <p className="text-sm mb-2">{vendor.summary}</p>
      <a
        href={vendor.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        Watch on YouTube
      </a>
    </div>
  );
};

export default VendorCard;
