"use client";

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition ${className}`}
    >
      {children}
    </button>
  );
}
