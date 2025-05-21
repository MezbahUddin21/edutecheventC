// components/InputField.jsx
"use client";

export default function InputField({
  label,
  type = "text",
  required = false,
}) {
  const id = label.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        required={required}
        className="border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
