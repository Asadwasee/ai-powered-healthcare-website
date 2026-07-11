import { Input } from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import { Button } from "../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { registerUser } from "../../services/authService";
import GlobalStateContext from "../../context/GlobalStateContext";

function Signup(){
    const navigate = useNavigate();
    const { login } = useContext(GlobalStateContext);
    const[formData, setFormData]= useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const data = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            

            login(data.user);
            localStorage.setItem("healthcareToken", data.token);
            navigate("/doctors");
        } catch (err) {
            setError(err?.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
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
                                {error && (
                                    <p className="text-sm font-medium text-accent">{error}</p>
                                )}
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
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                label="Confirm Password"
                />

                {/* Signup button */}
                <Button type="submit" disabled={loading}>{loading ? "Creating account..." : "Create account"}</Button>

                <p className="text-center text-sm mt-4">Already have an account? {""}
                    <Link 
                    to="/login"
                    className="text-primary font-medium hover:underline">
                        Login</Link>
                </p>


                
            </form>
        </div>
    )
}
export default Signup;