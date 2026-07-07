import { Button } from "../../ui/Button";

function ServiceCard({icon, title, description}){
    return(
        <div className=" bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 min-h-80 justify-between flex flex-col">
            <div className=" flex items-center justify-center w-14 h-14 rounded-full  p-2 text-primary bg-primary/10 mx-auto ">{icon}</div>
            
            <h1 className="text-xl font-bold text-gray-900 mt-4">{title}</h1>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="mt-5 flex items-center justify-center">
                <Button variant="secondary">Learn More</Button>
            </div>

        </div>
    )
}
export default ServiceCard;