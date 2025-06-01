import React from 'react';

const JurnalDetailPageSkeleton = () => {
  return (
    <div className="w-full px-6 mt-[120px]">
      <div className='mx-auto items-center justify-center max-w-7xl flex mt-[120px]'>
        <div className='pb-4 lg:text-l w-full justify-between text-m'>
          <div className="h-5 w-32 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className='mx-auto items-center justify-center max-w-7xl flex py-3'>
        <div className='w-full lg:p-[32px] md:p-[16px] p-3 bg-gray-200 animate-pulse rounded-md h-10'></div>
      </div>

      <div className='max-w-5xl mx-auto px-4 mb-12 space-y-4'>
        <div className='rounded-xl overflow-hidden shadow-md'>
          <div className="w-full h-[400px] bg-gray-300 animate-pulse"></div>
        </div>

        <div className="flex justify-end">
          <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <div className="text-center">
          <div className="h-8 w-3/4 bg-gray-300 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Info rows */}
        {Array(5).fill(0).map((_, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-1 h-4 bg-gray-300 animate-pulse">:</div>
            <div className="flex-1 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JurnalDetailPageSkeleton;
