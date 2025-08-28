import React from 'react'
import bannerImg from '../../assets/banner.png'

export const Banner: React.FC = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row py-16 justify-between items-center gap-12'>
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-4xl text-2xl font-semibold mb-7 font-primary'>这周最新发布的书籍</h1>
            <p className='mb-10'>是时候用文学界最新、最精彩的出版物更新你的阅读清单啦。从扣人心弦的惊悚小说，到引人入胜的回忆录，本周的新上架作品，能满足每个人的阅读喜好 。</p>
            <button className='bg-primary  px-12 py-2 rounded-md text-base font-secondary font-bold hover:bg-secondary hover:text-white transition-all duration-200 cursor-pointer'>订阅</button>
        </div>
        <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt="Img" />
        </div>
    </div>
  )
}
