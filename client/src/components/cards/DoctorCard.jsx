import React from 'react'
import { Link } from 'react-router-dom'

function DoctorCard({doctor}) {
  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
      <img 
      src={doctor.image} 
      alt={doctor.name}
      className='w-full h-56 object-contain'
      />

      <div className='p-5'>
        <h3 className='text-xl font-semibold'>
            {doctor.name}
        </h3>

        <p className='text-blue-600 mt-2'>
            {doctor.specialization}
        </p>
        <p className='text-sm text-gray-500 mt-1'>
            {doctor.qualification}
        </p>

        <div className='flex justify-between mt-3 text-gray-600'>
            <span>{doctor.experience}+ Years Exp.</span>
            <span>⭐ {doctor.rating}</span>
        </div>

        <Link
        to={`/doctors/${doctor.id}`} 
        className='block text-center mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>
            View Details
        </Link>
      </div>
    </div>
  )
}

export default DoctorCard
