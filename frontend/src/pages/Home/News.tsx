import { useEffect, useState } from 'react'
import NewsCard from '../Book/NewsCard';
import type { newsType } from '../../types/new';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { SkeletonLoader } from '../../components/SkeletonLoader';


const News = () => {
    const [news,setNews] = useState<newsType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        fetch("news.json")
        .then(res => res.json())
        .then(
            (data) => {
               console.log(data);
               setNews(data);
               setIsLoading(false);
            }
        )
        .catch(() => {
            setIsLoading(false);
        });
    },[]);
  if (isLoading) {
    return (
      <div className='py-10'>
        <SkeletonLoader type="text" />
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <SkeletonLoader type="news" count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className='py-10'>
      <h2 className='text-3xl font-secondary font-semibold mb-6'>新闻</h2>
        <Swiper
          className='mt-6'
          modules={[Pagination,Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          scrollbar={{ draggable: true }}
          breakpoints={{
            640:{
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768:{
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024:{
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180:{
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}  
        >
             {   news &&
                news.map((item,index)=>(
                   <SwiperSlide key={index}>
                        <NewsCard news={item}/>
                   </SwiperSlide>
                ))
             }
        </Swiper>
    </div>
  )
}

export default News