import { Link } from "react-router-dom";
import {
  Star,
  BriefcaseMedical,
  BadgeDollarSign,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../components/ui/Button";

function DoctorCard({ doctor }) {
  return (
    <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

      
      <div className="relative overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow">
          <Star
            size={16}
            className="text-yellow-500 fill-yellow-500"
          />
          <span className="text-sm font-semibold">
            {doctor.rating}
          </span>
        </div>
      </div>

      
      <div className="flex flex-col flex-grow p-6">

      
        <h3 className="text-2xl font-bold text-gray-900">
          {doctor.name}
        </h3>

        
        <p className="text-blue-600 font-medium mt-1">
          {doctor.specialization}
        </p>

        
        {doctor.qualification && (
          <p className="text-sm text-gray-500 mt-1">
            {doctor.qualification}
          </p>
        )}

        
        <div className="border-t border-gray-100 my-5"></div>

        
        <div className="space-y-3">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2 text-gray-700">
              <BriefcaseMedical
                size={18}
                className="text-blue-600"
              />
              <span className="text-sm">
                {doctor.experience} Years Experience
              </span>
            </div>

          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <BadgeDollarSign
              size={18}
              className="text-green-600"
            />
            <span className="text-sm">
              Consultation Fee
            </span>

            <span className="ml-auto font-semibold text-gray-900">
              Rs. {doctor.fee}
            </span>
          </div>

        </div>

        
        <div className="mt-auto pt-6">

          <Link
            to={`/doctors/${doctor.id}`}
            className="block"
          >
            <Button>
              <span>View Details</span>
              <ArrowRight size={18} />
            </Button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default DoctorCard;