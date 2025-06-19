/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FieldError, type UseFormRegister } from "react-hook-form";

interface SelectFieldProps<T = any> {
  name: string;
  label?: string;
  options: T[];
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  className?: string;
  required?: boolean;
  getLabel: (option: T) => string; // to display
  disabled?: boolean;
}

const SelectField = <T extends object | string>({
  name,
  label,
  options,
  register,
  error,
  placeholder = "Select an option",
  className = "",
  required = false,
  getLabel,
  disabled = false,
}: SelectFieldProps<T>) => {
  console.log('getLabel', getLabel)
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 font-medium flex">
          {label}
          {required && <p className="text-red-500 ml-1">*</p>}
        </label>
      )}
      <select
        {...register(name)}
        className={`border p-2 rounded ${className}`}
        defaultValue=""
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => {
            console.log('getLabel(option)', getLabel(option))
          return(
                      <option key={`${getLabel(option)}- ${index}`} value={JSON.stringify(option)}>
            {getLabel(option)
          
            }
          </option>
          )
        }

        )}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

// export default SelectField;


export default SelectField;
