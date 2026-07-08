import ServiceCard from "./ServiceCard";

function Services(){
    const services = [
        {
            id:1,
            icon: "..",
            title: "Doctor consultion",
            description: "Book appointments with experienced healthcare professionals.",
        },
        {
            id:2,
            icon: "..",
            title: "Medicines",
            description: "Search and order medicines with convenient doorstep delivery.",
        },
        {
            id:3,
            icon: "..",
            title: "Lab Tests",
            description: "Book diagnostic tests and access your reports online.",
        }
    ]
    return(
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-secondary text-center">Services</h1>
                 <p className=" text-gray-600 text-center mt-4 max-w-2xl mx-auto">Our platform brings all essential healthcare services together, making it easy to manage your health anytime, anywhere with confidence.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 ">
                    {
                        services.map((service)=>(
                            <ServiceCard
                            key= {service.id}
                            icon = {service.icon}
                            title={service.title}
                            description= {service.description}
                            />
                        ))
                    }

                 </div>


            </div>

        </section>
    )
}
export default Services;