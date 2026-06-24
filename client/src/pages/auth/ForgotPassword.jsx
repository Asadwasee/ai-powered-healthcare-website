import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import {Link} from "react-router-dom";
function ForgotPassword(){
    const [formData, setFormData]= useState({
        email: "",
    });

    const handleChange= (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(formData);
    }
    return(
        <div className="space-y-6 animate-fade-in">
            <div className="text-center">
  <h1 className="text-3xl font-bold text-center text-primary mb-2">Forgot Password</h1>
  <p className="text-sm text-gray-500">
    Enter your email and we'll send you a reset link.
  </p>
</div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                label= "Email"
                />
                 {/*reset link*/ }
                           <Button type="submit">Send Reset Link</Button>

                           <Link
                           to="/login" className="text-center text-sm text-primary hover:underline">
                            Back to Login </Link>
            </form>

        </div>
    )
}
export default ForgotPassword;