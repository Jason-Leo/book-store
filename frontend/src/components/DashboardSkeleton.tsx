import React from 'react';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className='py-4 gap-4'>
      <div className='grid grid-cols-4 gap-4 auto-rows-[150px]'>
        {/* 第一行：4个统计卡片 */}
        <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5 animate-pulse'>
          <div className='w-15 h-15 rounded-full bg-gray-300'></div>
          <div className='flex flex-col items-start justify-center space-y-1'>
            <div className='h-8 bg-gray-300 rounded w-16'></div>
            <div className='h-4 bg-gray-300 rounded w-20'></div>
          </div>
        </div>
        
        <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5 animate-pulse'>
          <div className='w-15 h-15 rounded-full bg-gray-300'></div>
          <div className='flex flex-col items-start justify-center space-y-1'>
            <div className='h-8 bg-gray-300 rounded w-20'></div>
            <div className='h-4 bg-gray-300 rounded w-16'></div>
          </div>
        </div>
        
        <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5 animate-pulse'>
          <div className='w-15 h-15 rounded-full bg-gray-300'></div>
          <div className='flex flex-col items-start justify-center space-y-1'>
            <div className='h-8 bg-gray-300 rounded w-12'></div>
            <div className='h-4 bg-gray-300 rounded w-20'></div>
          </div>
        </div>
        
        <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5 animate-pulse'>
          <div className='w-15 h-15 rounded-full bg-gray-300'></div>
          <div className='flex flex-col items-start justify-center space-y-1'>
            <div className='h-8 bg-gray-300 rounded w-14'></div>
            <div className='h-4 bg-gray-300 rounded w-16'></div>
          </div>
        </div>
        
        {/* 第二行：图表占2列 */}
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
        
        {/* 分类图表 */}
        <div className='row-span-4 shadow-xl rounder-xl flex-col items-center justify-center px-4 py-10 space-y-2 animate-pulse'>
          <div className='h-6 bg-gray-300 rounded w-32 mb-4'></div>
          <div className='h-px bg-gray-300 mb-4'></div>
          <div className='h-64 w-full bg-gray-300 rounded'></div>
        </div>
        
        {/* 最近订单 */}
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
        
        {/* 第三行：2个底部统计卡片 */}
        <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5 animate-pulse'>
          <div className='w-15 h-15 rounded-full bg-gray-300'></div>
          <div className='flex flex-col items-start justify-center space-y-1'>
            <div className='h-8 bg-gray-300 rounded w-12'></div>
            <div className='h-4 bg-gray-300 rounded w-16'></div>
          </div>
        </div>
        
        <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5 animate-pulse'>
          <div className='w-15 h-15 rounded-full bg-gray-300'></div>
          <div className='flex flex-col items-start justify-center space-y-1'>
            <div className='h-8 bg-gray-300 rounded w-12'></div>
            <div className='h-4 bg-gray-300 rounded w-16'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
