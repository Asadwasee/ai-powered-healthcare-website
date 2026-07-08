import { MapPin } from "lucide-react";
function GoogleMap(){
    return(
        <div className=" bg-white text-center rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
             
             <div className="flex items-center justify-center gap-1 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>Our Location</span> </div>
            <p className="text-gray-600 mb-4">Map will be integrated here</p>
        </div>
    )
}
export default GoogleMap;