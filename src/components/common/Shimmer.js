// Shimmer.js
import React from 'react';

const Shimmer = ({ type }) => {
  if (type === "dish") {
    return (
        <div className="relative max-w-full mx-auto">
        <div className="flex justify-between space-x-4">
          {Array(5).fill().map((_, index) => (
            <div key={index} className="w-full sm:w-1/5">
              <div className="bg-[#31363F] p-2 sm:p-4 rounded-lg shadow-lg cursor-pointer h-72 sm:h-80 flex flex-col justify-between animate-pulse">
                <div className="relative">
                  <div className="bg-gray-700 w-full h-36 rounded-lg mb-2"></div>
                </div>
                <div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if(type==="explore"){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(9).fill().map((_, index) => (
            <div key={index} className="bg-[#31363F] p-2 sm:p-4 rounded-lg shadow-lg cursor-pointer h-72 sm:h-80 flex flex-col justify-between w-full sm:w-auto animate-pulse">
              <div className="bg-gray-700 w-full h-36 rounded-lg mb-4"></div>
              <div className="flex-grow">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      );
  }
  if (type === "canteen") {
    return (
      <div className="flex space-x-4">
        {Array(3).fill().map((_, index) => (
          <div key={index} className="bg-[#31363F] p-4 rounded-lg shadow-lg cursor-pointer h-80 flex flex-col justify-between w-full animate-pulse">
            <div className="bg-gray-700 w-full h-36 rounded-lg mb-4"></div>
            <div className="space-y-4 flex-grow">
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-700 rounded w-1/2"></div>
              <div className="h-6 bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default Shimmer;
