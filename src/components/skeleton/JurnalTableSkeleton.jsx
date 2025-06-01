import React from "react";

const JurnalTableSkeleton = ({ count = 5 }) => {
  const skeletonRows = Array.from({ length: count });

  return (
    <>
      {skeletonRows.map((_, index) => (
        <tr key={index} className="animate-pulse text-s font-medium text-gray-400">
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </td>
          <td className="px-2 py-4">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          </td>
          <td className="px-2 py-4">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </td>
          <td className="px-2 py-4">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </td>
          <td className="px-2 py-4">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </td>
          <td className="px-2 py-4">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </td>
          <td className="px-2 py-4">
            <div className="h-8 w-16 bg-gray-300 rounded"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default JurnalTableSkeleton;
