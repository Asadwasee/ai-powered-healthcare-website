import { useEffect, useState } from "react";
import localDoctors from "../../constants/doctors";
import DoctorCard from "../../components/cards/DoctorCard";
import { Input } from "../../components/ui/Input";
import { Search, Filter } from "lucide-react";
import { fetchDoctors } from "../../services/doctorService";

function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [doctors, setDoctors] = useState(localDoctors);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data);
      } catch {
        setDoctors(localDoctors);
      }
    };

    loadDoctors();
  }, []);

  const specializations = [
    "All",
    ...new Set(doctors.map((doctor) => doctor.specialization)),
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesSpecialization =
      specialization === "All" ||
      doctor.specialization === specialization;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      {/* Heading */}

      <div className="mb-10">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Find Your Doctor
        </h1>

        <p className="text-gray-600 text-lg mt-3 max-w-2xl leading-7">
          Search and connect with trusted healthcare professionals
          based on specialization, experience and ratings.
        </p>

      </div>

      {/* Search Area */}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-10">

        <div className="grid md:grid-cols-3 gap-5">

          {/* Search */}

          <div className="md:col-span-2">

            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Search size={18} />
              Search Doctor
            </label>

            <Input
              placeholder="Search by doctor name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>

          {/* Filter */}

          <div className="relative">

            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Filter size={18} />
              Specialization
            </label>

            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full h-[46px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            >
              {specializations.map((spec) => (
                <option
                  key={spec}
                  value={spec}
                >
                  {spec}
                </option>
              ))}
            </select>

          </div>

        </div>

      </div>

      {/* Results */}

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-gray-900">
          Available Doctors
        </h2>

        <span className="text-gray-500 font-medium">
          {filteredDoctors.length} Doctor
          {filteredDoctors.length !== 1 ? "s" : ""}
        </span>

      </div>

      {/* Cards */}

      {filteredDoctors.length === 0 ? (

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 text-center">

          <h3 className="text-2xl font-bold text-gray-800">
            No Doctors Found
          </h3>

          <p className="text-gray-500 mt-3">
            Try changing your search or specialization.
          </p>

        </div>

      ) : (

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
            />
          ))}

        </div>

      )}

    </section>
  );
}

export default Doctors;