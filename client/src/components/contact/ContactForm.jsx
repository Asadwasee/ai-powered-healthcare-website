import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useState } from "react";
function ContactForm(){
     const[formData, setFormData] = useState({
            name: "",
            email: "",
            number: "",
            subject: "",
            textarea: "",

        });
    
        const handleChange = (e)=>{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };
        const handleSubmit = (e)=>{
            e.preventDefault();
            console.log(formData);
    
        };
    return(
         <div className="space-y-6 animate-fade-in border border-gray-200 rounded-xl p-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-center mb-2 text-primary">Contact Form</h1>
        
                        <p className="text-gray-500 mt-2">
                            send your Queries
                        </p>
        
                    </div>
                   
        
                   <form onSubmit={handleSubmit} className="space-y-4">
                     <Input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    label="Name"            />
                    <Input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    label="Email"            />
                     <Input
                    type="tel"
                    name="number"
                    placeholder="Enter Your Phone Number"
                    value={formData.number}
                    onChange={handleChange}
                    label="Phone Number"            />
                     <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    label="Subject"        />
                    <label className="block text-sm font-medium text-gray-700 mb-2"> Message </label>
                   <textarea
                   name="textarea"
                   value={formData.textarea}
                   onChange={handleChange}
                   placeholder="Enter your message"
                   rows={5}
                   className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                   />
                   <div className="flex justify-center pt-2">
                    <Button type="submit">Send Message </Button>

                   </div>


                    
                    </form>
                    </div>
    )
}
export default ContactForm;