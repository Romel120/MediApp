import React from "react";

export default function loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          {/* Loading Text */}
          <p className="text-primary text-lg font-semibold mt-4">Loading...</p>
        </div>
      </div>
    );
}