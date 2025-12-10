import React, { useState } from "react";

const UpdateModal = ({
  isOpen,
  onClose,
  title,
  fields,
  buttonText,
  buttonColor = "blue",
  onSubmit,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-4">
      <div className="bg-[#0d0d0d] border border-gray-600 text-white rounded-2xl p-6 md:p-8 w-full max-w-sm sm:max-w-md shadow-xl relative transition-all duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
        >
          ✕
        </button>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">
          {title}
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field, index) => (
            <div key={index}>
              <label className="text-sm font-medium text-gray-300">
                {field.label}
              </label>

              <input
                type="text"
                className="w-full h-11 rounded-lg px-4 mt-1 bg-[#1a1a1a] text-white border border-gray-700 transition"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                required={field.required !== false}
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 mt-2 rounded-lg text-white font-medium transition-all 
              disabled:cursor-not-allowed disabled:opacity-60
              ${
                buttonColor === "red"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {isLoading ? "Processing..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
