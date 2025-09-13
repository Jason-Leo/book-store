import React from 'react';

interface SkeletonLoaderProps {
  type?: 'banner' | 'card' | 'news' | 'text' | 'dashboard-stats' | 'dashboard-chart' | 'dashboard-list';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'banner':
        return (
          <div className='flex flex-col-reverse md:flex-row py-16 justify-between items-center gap-12 animate-pulse'>
            <div className='md:w-1/2 w-full'>
              <div className='h-8 bg-gray-300 rounded mb-7 w-3/4'></div>
              <div className='space-y-3 mb-10'>
                <div className='h-4 bg-gray-300 rounded w-full'></div>
                <div className='h-4 bg-gray-300 rounded w-5/6'></div>
                <div className='h-4 bg-gray-300 rounded w-4/5'></div>
              </div>
              <div className='h-10 bg-gray-300 rounded w-24'></div>
            </div>
            <div className='md:w-1/2 w-full flex items-center md:justify-end'>
              <div className='h-64 w-full bg-gray-300 rounded'></div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className='rounded-lg transition-shadow duration-300 animate-pulse'>
            <div className='bg-gray-300 h-48 w-full rounded-t-lg'></div>
            <div className='p-4 space-y-3'>
              <div className='h-4 bg-gray-300 rounded w-3/4'></div>
              <div className='h-3 bg-gray-300 rounded w-full'></div>
              <div className='h-3 bg-gray-300 rounded w-5/6'></div>
              <div className='flex justify-between items-center'>
                <div className='h-4 bg-gray-300 rounded w-16'></div>
                <div className='h-8 bg-gray-300 rounded w-20'></div>
              </div>
            </div>
          </div>
        );

      case 'news':
        return (
          <div className='bg-white rounded-lg shadow-md overflow-hidden animate-pulse'>
            <div className='h-48 bg-gray-300'></div>
            <div className='p-4 space-y-3'>
              <div className='h-4 bg-gray-300 rounded w-3/4'></div>
              <div className='h-3 bg-gray-300 rounded w-full'></div>
              <div className='h-3 bg-gray-300 rounded w-2/3'></div>
              <div className='flex justify-between items-center'>
                <div className='h-3 bg-gray-300 rounded w-20'></div>
                <div className='h-3 bg-gray-300 rounded w-16'></div>
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className='animate-pulse space-y-3'>
            <div className='h-6 bg-gray-300 rounded w-1/3'></div>
            <div className='h-4 bg-gray-300 rounded w-full'></div>
            <div className='h-4 bg-gray-300 rounded w-5/6'></div>
          </div>
        );

      case 'dashboard-stats':
        return (
          <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5 animate-pulse'>
            <div className='w-15 h-15 rounded-full bg-gray-300'></div>
            <div className='flex flex-col items-start justify-center space-y-1'>
              <div className='h-8 bg-gray-300 rounded w-16'></div>
              <div className='h-4 bg-gray-300 rounded w-20'></div>
            </div>
          </div>
        );

      case 'dashboard-chart':
        return (
          <div className='col-span-2 row-span-3 shadow-xl rounded-xl px-4 py-6 animate-pulse'>
            <div className='h-6 bg-gray-300 rounded w-48 mb-4'></div>
            <div className='h-px bg-gray-300 mb-4'></div>
            <div className='bg-[#f2f4f5] border-2 border-dashed border-gray-300 px-4 py-4 rounded-md h-90 mb-4'>
              <div className='bg-white rounded-xl flex-col flex items-center justify-center h-full'>
                <div className='h-6 bg-gray-300 rounded w-32 mb-4'></div>
                <div className='h-48 w-full bg-gray-300 rounded'></div>
              </div>
            </div>
          </div>
        );

      case 'dashboard-list':
        return (
          <div className='row-span-4 shadow-xl rounded-xl px-4 py-6 animate-pulse'>
            <div className='h-6 bg-gray-300 rounded w-24 mb-4'></div>
            <div className='h-px bg-gray-300 mb-4'></div>
            <div className='space-y-3'>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className='bg-gray-50 rounded-lg p-3'>
                  <div className='flex items-center justify-between mb-2'>
                    <div className='h-4 bg-gray-300 rounded w-24'></div>
                    <div className='h-4 bg-gray-300 rounded w-16'></div>
                  </div>
                  <div className='h-3 bg-gray-300 rounded w-32 mb-1'></div>
                  <div className='h-3 bg-gray-300 rounded w-40'></div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className='animate-pulse'>
            <div className='h-4 bg-gray-300 rounded w-full'></div>
          </div>
        );
    }
  };

  if (count > 1) {
    return (
      <div className='space-y-4'>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>
            {renderSkeleton()}
          </div>
        ))}
      </div>
    );
  }

  return renderSkeleton();
};
