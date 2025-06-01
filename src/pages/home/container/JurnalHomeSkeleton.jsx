import React from 'react'

const JurnalHomeSkeleton = () => {
    return (
        <div className="p-5 bg-white rounded-2xl shadow-shadow-2 animate-pulse hover:translate-y-[-8px] transition-all">
            {/* Gambar cover */}
            <div className="bg-gray-300 h-[180px] w-full rounded-sm mb-4"></div>

            {/* Nama jurnal */}
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            {/* Institusi */}
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>

            {/* Rating bintang */}
            <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-5 w-5 bg-gray-300 rounded"></div>
                ))}
            </div>

            {/* Tombol detail */}
            <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
    )
}

export default JurnalHomeSkeleton
