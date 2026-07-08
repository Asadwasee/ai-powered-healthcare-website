import {Star} from 'lucide-react';
function TestinomialCard({image, name, role, review, rating}){
    return(
         <div className=" bg-white text-center rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
                    <img src={image} alt={name} className="w-24 h-24 rounded-full object-cover mx-auto"/>
                    
                    <h1 className="text-xl font-bold text-gray-900 mt-4">{name}</h1>
                    <h3 className='text-secondary font-bold mt-2'>{role}</h3>
                     <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span className='text-xl font-bold'>{rating}</span>
                    </div>
        
                    <p className="text-gray-600 mt-4">{review}</p>

                    
        
                </div>
    )
}
export default TestinomialCard;