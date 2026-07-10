import React from "react";
import { Button } from "../ui/Button";
import {
  MapPin,
  Phone,
  Star,
  Clock3,
  Navigation,
} from "lucide-react";

function HospitalCard({ hospital }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Hospital Image */}

      <div className="relative overflow-hidden">

        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Emergency Badge */}

        {hospital.emergency && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            24/7 Emergency
          </div>
        )}

      </div>

      {/* Card Body */}

      <div className="p-6">

        {/* Hospital Name */}

        <h3 className="text-2xl font-bold text-gray-900 leading-snug">
          {hospital.name}
        </h3>

        {/* Rating */}

        <div className="flex items-center gap-2 mt-3">

          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold text-gray-800">
            {hospital.rating}
          </span>

          <span className="text-sm text-gray-500">
            Rating
          </span>

        </div>

        {/* Address */}

        <div className="flex items-start gap-3 mt-5">

          <MapPin
            size={18}
            className="text-primary mt-1 shrink-0"
          />

          <div>

            <p className="font-medium text-gray-900">
              {hospital.city}
            </p>

            <p className="text-gray-500 text-sm leading-6">
              {hospital.address}
            </p>

          </div>

        </div>

        {/* Phone */}

        <div className="flex items-center gap-3 mt-5">

          <Phone
            size={18}
            className="text-primary"
          />

          <span className="text-gray-700 font-medium">
            {hospital.phone}
          </span>

        </div>

        {/* Availability */}

        <div className="flex items-center gap-3 mt-5">

          <Clock3
            size={18}
            className="text-green-600"
          />

          <span className="text-green-700 font-medium">
            Emergency Services Available
          </span>

        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3 mt-8">

          <a
            href={`tel:${hospital.phone}`}
            className="w-full"
          >
            <Button>
              Call
            </Button>
          </a>

          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              hospital.name
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
            <Button variant="secondary">
              <Navigation size={18} />
              Directions
            </Button>
          </a>

        </div>

      </div>

    </div>
  );
}

export default HospitalCard;