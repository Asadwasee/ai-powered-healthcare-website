import { useEffect, useState } from "react";
import DoctorCard from "../../components/cards/DoctorCard";
import { Input } from "../../components/ui/Input";
import { Search, Filter } from "lucide-react";
import { fetchDoctors } from "../../services/doctorService";

function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        setError("");

        // Backend khud 'All' check handle karta hai, isliye direct states pass karein
        const data = await fetchDoctors({
          search: searchTerm,
          specialization: specialization,
        });

        // Backend direct array bhej raha hai res.json(doctors) ke roop mein
        if (Array.isArray(data)) {
          setDoctors(data);
        } else if (data && Array.isArray(data.data)) {
          setDoctors(data.data);
        } else {
          setDoctors([]);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [searchTerm, specialization]);

  // Dropdown list fallback taake zero results aane par UI crash ya blank na ho
  const defaultSpecializations = ["All", "Cardiologist", "Dermatologist", "Neurologist", "Pediatrician", "General Physician"];
  
  const specializations = doctors.length > 0 
    ? ["All", ...new Set(doctors.map((doctor) => doctor.specialization).filter(Boolean))]
    : defaultSpecializations;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Find Your Doctor</h1>
        <p className="text-gray-600 text-lg mt-3 max-w-2xl leading-7">
          Search and connect with trusted healthcare professionals based on specialization, experience and ratings.
        </p>
      </div>

      {/* Search Area */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-10">
        <div className="grid md:grid-cols-3 gap-5">
          
          {/* Search Input */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Search size={18} /> Search Doctor
            </label>
            <Input
              placeholder="Search by doctor name, specialization or hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Filter size={18} /> Specialization
            </label>
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full h-[46px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-sm font-medium text-gray-700"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-16">
          <p className="text-gray-500 animate-pulse font-medium">Loading medical professionals...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      {/* Available Results Label */}
      {!loading && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Available Doctors</h2>
          <span className="text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full text-sm">
            {doctors.length} Doctor{doctors.length !== 1 ? "s" : ""} found
          </span>
        </div>
      )}

      {/* Dynamic Grid Rendering */}
      {!loading && doctors.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 text-center">
          <h3 className="text-2xl font-bold text-gray-800">No Doctors Found</h3>
          <p className="text-gray-500 mt-3">Try checking your database seeding or clearing search filters.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            // Mongoose model mapping supports both standard custom number id and mongo ObjectId
            <DoctorCard key={doctor._id || doctor.id} doctor={doctor} />
          ))}
        </div>
      )}

    </section>
  );
}

export default Doctors;