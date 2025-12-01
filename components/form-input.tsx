import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  registration,
  error,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      <input
        {...registration}
        type={type}
        placeholder={placeholder}
        className={`border p-2 rounded outline-none 
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />

      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
}
