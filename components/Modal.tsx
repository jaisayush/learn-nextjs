"use client";

import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={() => router.back()} // Dismiss on backdrop click
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent dismiss on content click
      >
        <div className="p-4 border-b border-gray-100 flex justify-end">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700 font-bold"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
