import { useState } from "react";
import {
  ShieldPlus,
  PhoneCall,
  Clock3,
  MapPinned,
  Search, 
  Building2
} from "lucide-react";

import { Input } from "../../components/ui/Input";
import emergencyServices from "../../constants/emergencyServices";
import EmergencyCard from "../../components/cards/EmergencyCard";
import HospitalCard from "../../components/cards/HospitalCard";
import hospitals from "../../constants/hospitals";

function Emergency() {
    
const [searchTerm, setSearchTerm] = useState("");
const [city, setCity] = useState("All");

const cities = [
  "All",
  ...new Set(hospitals.map((hospital) => hospital.city)),
];

const filteredHospitals = hospitals.filter((hospital) => {
  const matchesSearch =
  hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
  hospital.city.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCity =
    city === "All" ||
    hospital.city === city;

  return matchesSearch && matchesCity;
});

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      {/* Hero Section */}

      <div className="text-center mb-14">

        <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-5">

          <ShieldPlus size={18} />

          Emergency Support

        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">

          Emergency Healthcare
          <br />

          Services

        </h1>

        <p className="text-gray-600 text-lg leading-8 mt-5 max-w-3xl mx-auto">

          Access essential emergency services quickly whenever you need
          immediate medical assistance. Contact ambulance services,
          hospitals, blood banks, or police with a single click.

        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

        {emergencyServices.map((service) => (

          <EmergencyCard
            key={service.id}
            service={service}
          />

        ))}

      </div>


      {/* Search & Filter */}
{/* Hospitals */}

<div className="mt-20 mb-8">

  <div className="inline-flex items-center gap-2 text-primary font-semibold mb-3">

    <Building2 size={20} />

    Nearby Hospitals

  </div>

  <h2 className="text-3xl font-bold text-gray-900">
    Find Hospitals Near You
  </h2>

  <p className="text-gray-500 mt-2 max-w-2xl">
    Search hospitals by name, address or city to quickly locate nearby
    emergency medical facilities.
  </p>

</div>

<div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mt-10 mb-10">

  <div className="grid lg:grid-cols-3 gap-6">

    {/* Search */}

    <div className="lg:col-span-2">

      <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">

        <Search size={18} />

        Search Hospital

      </label>

      <Input
        placeholder="Search by hospital name or address..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    </div>

    {/* City Filter */}

    <div>

      <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">

        <Building2 size={18} />

        City

      </label>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full h-[46px] rounded-lg border border-gray-200 bg-white px-4
        focus:outline-none focus:ring-2 focus:ring-blue-100
        focus:border-primary transition"
      >

        {cities.map((city) => (

          <option
            key={city}
            value={city}
          >
            {city}
          </option>

        ))}

      </select>

    </div>

  </div>

</div>

{/* Result Counter */}

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">

  <h3 className="text-2xl font-bold text-gray-900">

    Available Hospitals

  </h3>

  <span className="text-gray-500 font-medium">

    {filteredHospitals.length} Hospital
    {filteredHospitals.length !== 1 ? "s" : ""} Available

  </span>

</div>

{/* Hospital Cards */}

{filteredHospitals.length === 0 ? (

  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 text-center">

    <h3 className="text-2xl font-bold text-gray-900">

      No Hospitals Found

    </h3>

    <p className="text-gray-500 mt-3">

      Try searching with another hospital name or city.

    </p>

  </div>

) : (

  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

    {filteredHospitals.map((hospital) => (

      <HospitalCard
        key={hospital.id}
        hospital={hospital}
      />

    ))}

  </div>

)}
      {/* Emergency Tips */}

      <div className="mt-20">

        <div className="text-center mb-10">

          <h2 className="text-3xl font-bold text-gray-900">
            Emergency Tips
          </h2>

          <p className="text-gray-500 mt-3">

            Follow these important guidelines during emergencies.

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Tip 1 */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">

              <PhoneCall
                className="text-primary"
                size={28}
              />

            </div>

            <h3 className="text-xl font-semibold text-gray-900">

              Call Immediately

            </h3>

            <p className="text-gray-600 leading-7 mt-3">

              Contact the appropriate emergency service as soon as the
              situation occurs.

            </p>

          </div>

          {/* Tip 2 */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-5">

              <MapPinned
                className="text-green-600"
                size={28}
              />

            </div>

            <h3 className="text-xl font-semibold text-gray-900">

              Share Your Location

            </h3>

            <p className="text-gray-600 leading-7 mt-3">

              Clearly communicate your current location so emergency teams
              can reach you without delay.

            </p>

          </div>

          {/* Tip 3 */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

            <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center mb-5">

              <Clock3
                className="text-yellow-600"
                size={28}
              />

            </div>

            <h3 className="text-xl font-semibold text-gray-900">

              Stay Calm

            </h3>

            <p className="text-gray-600 leading-7 mt-3">

              Remain calm while waiting for assistance and follow the
              instructions provided by emergency responders.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Emergency;