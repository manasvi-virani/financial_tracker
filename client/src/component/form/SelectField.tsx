/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FieldError, type UseFormRegister } from "react-hook-form";

interface SelectFieldProps {
  name: string;
  label?: string;
  options: string[];
  register: UseFormRegister<any>; 
  error?: FieldError;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const SelectField = ({
  name,
  label,
  options,
  register,
  error,
  placeholder = "Select an option",
  className = "",
  required = false,
}: SelectFieldProps) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 font-medium flex">{label}{required && <p className="text-red-500 ml-1">*</p>}</label>}
      <select
        {...register(name)}
        className={`border p-2 rounded ${className}`}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default SelectField;
