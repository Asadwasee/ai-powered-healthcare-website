import DoctorCard from "./DoctorCard";

function FeaturedDoctors(){
    const doctors = [
  {
    id: 1,
    image: "...",
    name: "Ali",
    specialization: "Cardiologist",
    rating: "4.8",
    experience: "6+",
    location: "karachi"
  },
   {
    id: 2,
    image: "...",
    name: "Raza",
    specialization: "Cardiologist",
    rating: "4.8",
    experience: "6+",
    location: "karachi"
  },
   {
    id: 3,
    image: "...",
    name: "Hamza",
    specialization: "Cardiologist",
    rating: "4.8",
    experience: "6+",
    location: "karachi"
  },
   {
    id: 4,
    image: "...",
    name: "Asia",
    specialization: "Cardiologist",
    rating: "4.8",
    experience: "6+",
    location: "karachi"
  },

]
    return(
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-secondary text-center"> Featured Doctors</h1>
            <p className=" text-gray-600 text-center mt-4 max-w-2xl mx-auto">Meet our experienced and trusted healthcare professionals. Book appointments with qualified specialists and receive quality medical care tailored to your needs.</p>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {
                doctors.map((doctor) => (
                <DoctorCard
                key = {doctor.id}
                image= {doctor.image}
                name= {doctor.name}
                specialization={doctor.specialization}
                rating={doctor.rating}
                experience={doctor.experience}
                location={doctor.location}
                />

                ))

            }
            </div>
            </div>
            

        </section>
    )
}
export default FeaturedDoctors;