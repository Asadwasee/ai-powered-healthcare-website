import { Input } from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import { Button } from "../../components/ui/Button";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import GlobalStateContext from "../../context/GlobalStateContext";

function Login(){
    const navigate = useNavigate();
    const { login } = useContext(GlobalStateContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await loginUser(formData);
            login(data);
            localStorage.setItem("healthcareToken", data.token);
            navigate("/doctors");
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }

    };

    return(
        <div className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-center mb-2 text-primary">Welcome Back</h1>

                <p className="text-gray-500 mt-2">
                    sign in to your account
                </p>

            </div>
           

           <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <p className="text-sm font-medium text-accent">{error}</p>
                        )}

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
                            placeholder="Enter Your Password"
                            value={formData.password}
                            onChange={handleChange}
                            label="Password"
                        />

         

          {/* forgot Password */} 
           <div className="text-right text-sm">
            <Link
           to= "/auth/forgot-password"
           className="text-blue-500 hover:underline"
           >
            Forgot password? 
           </Link>
           </div>

           {/*LoginButton*/ }
           <Button type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</Button>

           {/*Signup*/ }
           <p className="text-center text-sm mt-4">Don't Have an Account?{""}
            <Link 
            to="/auth/signup"
            className="text-primary font-medium hover:underline"
            >Signup</Link>
           </p>
             </form>



           


        </div>
    )
}
export default Login;