import { Button } from "../../ui/Button";
import { Star, MapPin } from "lucide-react";
function DoctorCard({image, name, specialization, rating, experience, location}){
    return(
        <div className="bg-white text-center rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
           <img src={image} alt={name} className="w-24 h-24 rounded-full object-cover mx-auto"/>
            <h1 className="text-xl font-bold text-gray-900 mt-6">{name}</h1>
            <h3 className="text-gray-600 mt-1">{specialization}</h3>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span>{rating}</span>
                    </div>
                    <span>•</span>
                    <span>{experience} Years</span> 
                </div>
            <div className="flex items-center justify-center gap-1 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
            </div>
            <div className="mt-5 flex items-center justify-center">
                <Button variant="secondary">Book an appointment</Button>
            </div>
            


        </div>
    )
}
export default DoctorCard;