import { useState, useEffect } from "react";

export default function Input({ label, placeholder, type, error, ...props}) {
  const [inputClasses, setInputClasses] = useState("bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
  const [labelClasses, setLabelClasses] = useState("text-gray-500 text-sm font-semibold");
  useEffect(() => {
    if (error) {
      setInputClasses("bg-red-50 border border-red-300 text-red-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-700 dark:border-red-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500");
      setLabelClasses("text-red-500 text-sm font-semibold");
    }
  }, [error]);

  return (
    <>
      <label className={labelClasses}>
        {label}
      </label>
      <input
        {...props}
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        required
      />
</>  )
}