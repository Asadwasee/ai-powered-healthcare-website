import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchDoctorById } from "../../services/doctorService";

import {
  CalendarDays,
  BadgeDollarSign,
  BriefcaseMedical,
  Star,
  Stethoscope,
  CircleCheck,
} from "lucide-react";

import { Button } from "../../components/ui/Button";

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const loadDoctor = async () => {
    try {
      setLoading(true);

      const data = await fetchDoctorById(id);

      setDoctor(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load doctor.");
    } finally {
      setLoading(false);
    }
  };

  loadDoctor();
}, [id]);

if (loading) {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      Loading...
    </div>
  );
}

if (error) {
  return (
    <div className="flex justify-center items-center min-h-[60vh] text-red-500">
      {error}
    </div>
  );
}

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Doctor not found
          </h2>

          <p className="text-gray-500 mt-3">
            The doctor you are looking for doesn't exist.
          </p>

          <Link to="/doctors" className="inline-block mt-6">
            <Button>Back to Doctors</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="grid md:grid-cols-2">

            {/* Image */}

            <div className="bg-slate-50 flex items-center justify-center p-8">

              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full max-h-[480px] object-contain"
              />

            </div>

            {/* Doctor Information */}

            <div className="p-8">

              <div className="flex items-center gap-2 text-blue-600 font-semibold">

                <Stethoscope size={20} />

                <span>{doctor.specialization}</span>

              </div>

              <h1 className="text-4xl font-bold text-gray-900 mt-3">
                {doctor.name}
              </h1>

              {doctor.qualification && (
                <p className="text-gray-500 mt-2">
                  {doctor.qualification}
                </p>
              )}

              {/* Stats */}

              <div className="grid grid-cols-2 gap-4 mt-8">

                <div className="rounded-2xl bg-slate-50 p-5">

                  <div className="flex items-center gap-2 text-yellow-500">

                    <Star
                      size={18}
                      className="fill-yellow-500"
                    />

                    <span className="font-semibold">
                      Rating
                    </span>

                  </div>

                  <p className="text-2xl font-bold mt-2">
                    {doctor.rating}
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-5">

                  <div className="flex items-center gap-2 text-blue-600">

                    <BriefcaseMedical size={18} />

                    <span className="font-semibold">
                      Experience
                    </span>

                  </div>

                  <p className="text-2xl font-bold mt-2">
                    {doctor.experience} Years
                  </p>

                </div>

              </div>

              {/* About */}

              <div className="mt-10">

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About Doctor
                </h2>

                <p className="text-gray-600 leading-8">
                  {doctor.about}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}

        <div className="space-y-6">

          {/* Appointment Card */}

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            <h2 className="text-2xl font-bold text-gray-900">
              Appointment
            </h2>

            <div className="border-t my-6"></div>

            {/* Fee */}

            <div className="flex justify-between items-center mb-5">

              <div className="flex items-center gap-2">

                <BadgeDollarSign
                  size={20}
                  className="text-green-600"
                />

                <span className="text-gray-600">
                  Consultation Fee
                </span>

              </div>

              <span className="font-bold text-xl">
                Rs. {doctor.fee}
              </span>

            </div>

            {/* Availability */}

            <div>

              <div className="flex items-center gap-2 mb-4">

                <CalendarDays
                  size={20}
                  className="text-blue-600"
                />

                <span className="font-semibold">
                  Available Days
                </span>

              </div>

              <div className="flex flex-wrap gap-3">

                {doctor.availability.map((day) => (

                  <span
                    key={day}
                    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {day}
                  </span>

                ))}

              </div>

            </div>

            <Link
              to={`/book-appointment/${doctor.id}`}
              className="block mt-8"
            >
              <Button>
                Book Appointment
              </Button>
            </Link>

          </div>

          {/* Why Choose */}

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            <h2 className="text-xl font-bold mb-5">
              Why Choose This Doctor?
            </h2>

            <div className="space-y-4">

              <div className="flex gap-3">

                <CircleCheck
                  className="text-green-600 mt-1"
                  size={20}
                />

                <span className="text-gray-600">
                  Highly experienced healthcare specialist.
                </span>

              </div>

              <div className="flex gap-3">

                <CircleCheck
                  className="text-green-600 mt-1"
                  size={20}
                />

                <span className="text-gray-600">
                  Excellent patient satisfaction and reviews.
                </span>

              </div>

              <div className="flex gap-3">

                <CircleCheck
                  className="text-green-600 mt-1"
                  size={20}
                />

                <span className="text-gray-600">
                  Easy online appointment booking.
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DoctorDetails;