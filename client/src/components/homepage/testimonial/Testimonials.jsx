import TestinomialCard from "./TestimonialCard";

function Testinomials(){
    const reviews = [
        {
            id: 1,
            image: "...",
            name :"name",
            role : "patient",
            rating : 4,
            review:"good services"

        },
          {
            id: 2,
            image: "...",
            name :"name",
            role : "patient",
            rating : 4,
            review:"good services"

        },
          {
            id: 3,
            image: "...",
            name :"name",
            role : "patient",
            rating : 4,
            review:"good services"

        },
          {
            id: 4,
            image: "...",
            name :"name",
            role : "patient",
            rating : 4,
            review:"good services"

        },
          {
            id: 5,
            image: "...",
            name :"name",
            role : "patient",
            rating : 4,
            review:"good services"

        },
    ]
    return(
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6"> 
                 <h1 className="text-4xl font-bold text-secondary text-center">Testinomials</h1>
                 <p className=" text-gray-600 text-center mt-4 max-w-2xl mx-auto">See what our patients say about their experience with our healthcare services and trusted medical professionals.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {
                        reviews.map((review)=>(
                            <TestinomialCard
                            key={review.id}
                            image= {review.image}
                            name = {review.name}
                            role = {review.role}
                            rating= {review.rating}
                            review = {review.review}

                            />
                        ))
                        
                    }
                 </div>
            </div>

        </section>
    )
}
export default Testinomials;