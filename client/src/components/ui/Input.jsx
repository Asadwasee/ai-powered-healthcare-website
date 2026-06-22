export const Input = ({ label, type = 'text', placeholder, value, onChange, name, error }) => {
  return (
    <div className="w-full flex flex-col gap-1.5 mb-4">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 outline-none focus:ring-2 
          ${error ? 'border-accent focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-primary'}`}
      />
      {error && <span className="text-xs text-accent font-medium">{error}</span>}
    </div>
  );
};