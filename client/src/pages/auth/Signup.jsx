import { Input } from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import { Button } from "../../components/ui/Button";
import {Link} from "react-router-dom";
import { useState } from "react";

function Signup(){
    const[formData, setFormData]= useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleChange = (e)=>{
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
  <h1 className="text-3xl font-bold mb-6 text-primary">Create Account</h1>
  <p className="text-gray-500 text-sm">
    Sign up to get started
  </p>
</div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                label="Name"
                />
                <Input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
                />
                <PasswordInput
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
                />
                <PasswordInput
                name="confirmpassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                label="Confirm Password"
                />

                {/* Signup button */}
                <Button type="submit" >Create account</Button>

                <p className="text-center text-sm mt-4">Already have an account? {""}
                    <Link 
                    to="/auth/login"
                    className="text-primary font-medium hover-underline">
                        Login</Link>
                </p>


                
            </form>
        </div>
    )
}
export default Signup;