import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  name?: string;
  label?: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

export default function TextArea({
  name,
  label,
  placeholder,
  register,
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>
      ) : null}
      <textarea
        {...register}
        rows={4}
        placeholder={placeholder}
        className="border-gary-300 mt-1 w-full rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
      />
    </div>
  );
}
