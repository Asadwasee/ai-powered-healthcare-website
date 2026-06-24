import { Input } from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import { Button } from "../../components/ui/Button";
import {  useState } from "react";
import { Link } from "react-router-dom";
function Login(){


    const[formData, setFormData] = useState({
        email: "",
        password: "",
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
        <div className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-center mb-6 text-primary">Welcome Back</h1>

                <p className="text-gray-500 mt-2">
                    sign in to your account
                </p>

            </div>
           

           <form onSubmit={handleSubmit} className="space-y-4">
            <Input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={FormData.email}
            onChange={handleChange}
            label="Email"            />
            <PasswordInput
            name="password"
            placeholder="Enter Your Password"
            value={FormData.password}
            onChange={handleChange}
            label="Password"            />

         

          {/* forgot Password */} 
           <div className="text-right text-sm">
            <Link
           to= "/auth/forgotPassword"
           className="text-blue-500 hover:underline"
           >
            Forgot password? 
           </Link>
           </div>

           {/*LoginButton*/ }
           <Button type="submit" >Create account</Button>

           {/*Signup*/ }
           <p className="text-center text-sm mt-4">Don't Have an Account?{""}
            <Link 
            to="/auth/Signup"
            className="text-primary font-medium hover-underline"
            >Signup</Link>
           </p>
             </form>



           


        </div>
    )
}
export default Login;