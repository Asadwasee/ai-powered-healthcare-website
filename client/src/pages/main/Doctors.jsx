import React , {useState} from 'react'
import doctors from '../../constants/doctors'
import DoctorCard from '../../components/cards/DoctorCard'

function Doctors() {
    const [searchTerm, setSearchTerm] = useState("");
    const [specialization, setSpecialization] = useState("All");

    const specializations = [
        "All",
        ...new Set(doctors.map((doctor) => doctor.specialization)),
    ] ;

    const filteredDoctors = doctors.filter((doctor) => {
        const matchesSearch = 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecialization = 
        specialization === "All" ||
        doctor.specialization === specialization;

        return matchesSearch && matchesSpecialization;
    })
  return (
    <section className='py-10'>
        <div className='mb-10'>
            <h1 className='text-4xl font-bold'>
                Find Your Doctor
            </h1>

            <p className='text-gray-600 mt-2'>
                Search and connect with healthcare specialists
            </p>
        </div>

        <div className='flex flex-col md:flex-row gap-4 mb-8'>
            <input 
            type="text"
            placeholder='Search doctor...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border border-gray-300 rounded-lg px-4 py-3 flex-1'
             />

             <select 
             value={specialization}
             onChange={(e) => setSpecialization(e.target.value)}
             className='border border-gray-300 rounded-lg px-4 py-3'>
                {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                        {spec}
                    </option>
                ))}
             </select>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredDoctors.length === 0 && (
                <div className='col-span-full text-center py-10'>
                    <h3 className='text-xl font-semibold text-gray-500'>
                        No doctors found.
                    </h3>
                </div>
            )}
            {filteredDoctors.map((doctor) => (
                <DoctorCard 
                key={doctor.id}
                doctor={doctor}
                />
            ))}
        </div>
    </section>
  )
}

export default Doctors
