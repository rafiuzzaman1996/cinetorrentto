"use client";
import React from "react";

const SkeletonGrid = () => {
  return (
    <div className="my-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonGrid;
