import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({label, placeholder, value, onChange,  name, error}){
    const[showPassword, setShowpassword]= useState(false);
    return(

        <div className="w-full flex flex-col gap-1.5 mb-4 relative">
            {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
            <input
            type= {showPassword ? "text" : "password"}
            name= {name}
            placeholder= {placeholder}
            value={value}
            onChange={onChange}
            className={`w-full px-4  py-2.5 border rounded-lg transition-all duration-200 outline-none focus:ring-2 
          ${error ? 'border-accent focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-primary'}`}
    

            />
            <div>
                <button
  type="button"
  onClick={() => setShowpassword(!showPassword)}
  className="absolute right-3 top-[59%] -translate-y-1/2 text-sm text-primary"
>
  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</button>
             
            </div>
            {error && <span className="text-xs text-accent font-medium">{error}</span>}

        </div>
    )

}
export default PasswordInput;