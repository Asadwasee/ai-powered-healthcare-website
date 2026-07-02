import React from "react";
import { ShieldCheck, Stethoscope } from "lucide-react";

function DiseaseCard({ disease }) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-gray-100
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
      p-7
      h-full
      "
    >
      {/* Heading */}

      <div className="flex items-center gap-3 mb-5">

        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">

          <Stethoscope
            className="text-red-500"
            size={28}
          />

        </div>

        <h3 className="text-2xl font-bold text-gray-900">
          {disease.name}
        </h3>

      </div>

      {/* Description */}

      <p className="text-gray-600 leading-7 mb-6">
        {disease.description}
      </p>

      {/* Symptoms */}

      <div className="mb-6">

        <h4 className="font-semibold text-gray-900 mb-3">
          Common Symptoms
        </h4>

        <ul className="space-y-2">

          {disease.symptoms.map((item) => (

            <li
              key={item}
              className="flex items-start gap-2 text-gray-600"
            >
              <span className="text-red-500 mt-1">•</span>

              {item}
            </li>

          ))}

        </ul>

      </div>

      {/* Prevention */}

      <div>

        <div className="flex items-center gap-2 mb-3">

          <ShieldCheck
            size={18}
            className="text-green-600"
          />

          <h4 className="font-semibold text-gray-900">
            Prevention
          </h4>

        </div>

        <ul className="space-y-2">

          {disease.prevention.map((item) => (

            <li
              key={item}
              className="flex items-start gap-2 text-gray-600"
            >
              <span className="text-green-600 mt-1">✓</span>

              {item}
            </li>

          ))}

        </ul>

      </div>

    </div>
  );
}

export default DiseaseCard;