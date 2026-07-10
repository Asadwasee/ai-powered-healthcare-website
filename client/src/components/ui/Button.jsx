export const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false , className = "",}) => {
  const base = "relative overflow-hidden px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform active:scale-98 cursor-pointer focus:outline-none flex items-center justify-center gap-2";
  
  const styles = {
    primary: "bg-primary text-white hover:bg-blue-800 shadow-md hover:shadow-lg",
    secondary: "bg-secondary text-white hover:bg-teal-700 shadow-md",
    danger: "bg-accent text-white hover:bg-red-700 shadow-md",
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      {children}
    </button>
  );
};