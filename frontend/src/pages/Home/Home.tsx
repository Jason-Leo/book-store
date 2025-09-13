import React, { useState, useEffect } from 'react'
import { Banner } from './Banner'
import { TopSellers } from './TopSellers'
import { Recommend } from './Recommend'
import News from './News'
import { FloatButton } from 'antd';
import { SkeletonLoader } from '../../components/SkeletonLoader';

export const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载时间
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className='space-y-8'>
        {/* Banner 骨架屏 */}
        <SkeletonLoader type="banner" />
        
        {/* 畅销书榜单骨架屏 */}
        <div className='py-10'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-300 rounded w-48 mb-6'></div>
            <div className='h-8 bg-gray-300 rounded w-32 mb-6'></div>
          </div>
          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <SkeletonLoader type="card" count={3} />
          </div>
        </div>
        
        {/* 热门推荐骨架屏 */}
        <div className='py-10'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-300 rounded w-32 mb-6'></div>
          </div>
          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <SkeletonLoader type="card" count={4} />
          </div>
        </div>
        
        {/* 新闻骨架屏 */}
        <div className='py-10'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-300 rounded w-16 mb-6'></div>
          </div>
          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <SkeletonLoader type="news" count={3} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
        <Banner/>
        <TopSellers/>
        <Recommend/>
        <News/>
        <FloatButton.BackTop />
    </>
  )
}
