interface TextAreaProps {
  name?: string;
  label?: string;
  required?: true;
  placeholder?: string;
}

export default function TextArea({ name, label, placeholder }: TextAreaProps) {
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
        rows={4}
        placeholder={placeholder}
        className="border-gary-300 mt-1 w-full rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
      />
    </div>
  );
}
