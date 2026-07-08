import FeaturedDoctors from "../../components/homepage/featureddoctor/FeaturedDoctors";
import Hero from "../../components/homepage/Hero";
import Services from "../../components/homepage/services/Services";
import Statistics from "../../components/homepage/statistics/Statistics";
import Testimonials from "../../components/homepage/testimonial/Testimonials";

function Home(){
    return(
        <div>
            <Hero/>
            <FeaturedDoctors/>
            <Services/>
            <Testimonials/>
            <Statistics/>
        </div>
    )
}
export default Home;