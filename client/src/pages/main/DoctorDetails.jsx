import React from 'react'
import { useParams, Link } from 'react-router-dom'
import doctors from '../../constants/doctors'

function DoctorDetails() {
    const {id} = useParams();

    const doctor = doctors.find(
        (doc) => doc.id === Number(id)
    );

    if (!doctor)
    {
        return (
        <div className='text-center py-20'>
            <h2 className='text-2xl font-bold'>
                Doctor not found.
            </h2>
        </div>
    );
    }
  return (
    <section className="max-w-5xl mx-auto py-10">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="grid md:grid-cols-2 gap-8 p-8">

          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-[450px] object-cover rounded-xl"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {doctor.name}
            </h1>

            <p className="text-blue-600 text-xl mt-2">
              {doctor.specialization}
            </p>

            <div className="mt-6 space-y-3">

              <p>
                ⭐ Rating:
                <span className="font-semibold ml-2">
                  {doctor.rating}
                </span>
              </p>

              <p>
                💼 Experience:
                <span className="font-semibold ml-2">
                  {doctor.experience} Years
                </span>
              </p>

              <p>
                💰 Consultation Fee:
                <span className="font-semibold ml-2">
                  Rs. {doctor.fee}
                </span>
              </p>

            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">
                About Doctor
              </h3>

              <p className="text-gray-600">
                {doctor.about}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">
                Available Days
              </h3>

              <div className="flex flex-wrap gap-2">
                {doctor.availability.map((day) => (
                  <span
                    key={day}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to="/book-appointment"
              className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Book Appointment
            </Link>

          </div>

        </div>
      </div>
    </section>
  )
}

export default DoctorDetails
