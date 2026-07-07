import ContactForm from "../../components/contact/ContactForm";
import ContactInfo from "../../components/contact/ContactInfo";
import GoogleMap from "../../components/contact/GoogleMap";

function Contact(){

    return(
        <section className="bg-gradient-to-r from-primary/10 via-white to-secondary/10 min-h-[90vh] flex items-center">
            <div className='max-w-5xl mx-auto px-6 text-center animate-fade-in'>
                <div>
                     <h1 className="text-4xl font-bold text-secondary text-center">Contact Us</h1>
                 <p className=" text-gray-600 text-center mt-4 max-w-2xl mx-auto">We're here to help with your healthcare needs. Have a question or need assistance? Get in touch with us through the contact form or using the contact information below.</p>
                
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                  
                        <ContactForm/>
                        <ContactInfo/>
                    
                </div>
               
              <div className="mt-12">
                 <GoogleMap/>

              </div>
               

            </div>
            

        </section>
    )
}
export default Contact;