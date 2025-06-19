/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { type FieldError, type UseFormRegister,  } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>; 
  error?: FieldError;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  register,
  error,
  className = "",
  required = false,
  disabled = false,
  // defaultValue=""
}) => {
  const watch = register;
  console.log('watch', watch(name))

  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 font-medium flex">{label} {required && <p className="text-red-500 ml-1">*</p>} </label>}
      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        // value={defaultValue ? defaultValue : }
        {...register(name)}
        className={`border p-2 rounded ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
