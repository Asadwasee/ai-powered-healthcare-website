import React from "react";
import {
  Star,
  BriefcaseMedical,
  BadgeDollarSign,
  CalendarDays,
  ShieldCheck,
  Clock3,
} from "lucide-react";

function DoctorSummaryCard({ doctor }) {
  return (
    <aside className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden xl:sticky xl:top-24">

      {/* Image */}

      <div className="relative">

        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-72 object-cover"
        />

        <div className="absolute top-4 left-4">

          <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-green-700 shadow">

            <ShieldCheck
              size={16}
              className="text-green-600"
            />

            Verified

          </span>

        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        <h2 className="text-2xl font-bold text-gray-900">
          {doctor.name}
        </h2>

        <p className="text-primary font-medium mt-1">
          {doctor.specialization}
        </p>

        {/* Stats */}

        <div className="space-y-4 mt-8">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="text-gray-600">
                Rating
              </span>

            </div>

            <span className="font-semibold">
              {doctor.rating}
            </span>

          </div>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <BriefcaseMedical
                size={18}
                className="text-primary"
              />

              <span className="text-gray-600">
                Experience
              </span>

            </div>

            <span className="font-semibold">
              {doctor.experience} Years
            </span>

          </div>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <BadgeDollarSign
                size={18}
                className="text-green-600"
              />

              <span className="text-gray-600">
                Fee
              </span>

            </div>

            <span className="font-semibold">
              Rs. {doctor.fee}
            </span>

          </div>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <Clock3
                size={18}
                className="text-primary"
              />

              <span className="text-gray-600">
                Duration
              </span>

            </div>

            <span className="font-semibold">
              30 Minutes
            </span>

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-gray-100 my-8"></div>

        {/* Availability */}

        <div>

          <div className="flex items-center gap-2 mb-4">

            <CalendarDays
              size={18}
              className="text-primary"
            />

            <h3 className="font-semibold text-gray-900">
              Available Days
            </h3>

          </div>

          <div className="flex flex-wrap gap-2">

            {doctor.availability.map((day) => (

              <span
                key={day}
                className="px-3 py-1.5 rounded-full bg-blue-50 text-primary text-sm font-medium"
              >
                {day}
              </span>

            ))}

          </div>

        </div>

        {/* Info Box */}

        <div className="mt-8 rounded-2xl bg-slate-50 border border-gray-100 p-5">

          <p className="text-sm text-gray-500 leading-6">
            Please arrive at least
            <span className="font-semibold text-gray-800">
              {" "}15 minutes{" "}
            </span>
            before your scheduled appointment and carry any previous medical
            reports if available.
          </p>

        </div>

      </div>

    </aside>
  );
}

export default DoctorSummaryCard;