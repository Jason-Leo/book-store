import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import BookCard from '../Book/BookCard';
import type { bookType } from '../../types/books';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/cart/booksApi';
import { SkeletonLoader } from '../../components/SkeletonLoader';

export const Recommend:React.FC = () => {
  const {data: books = {book: []}, isLoading} = useFetchAllBooksQuery([]);
  
  if (isLoading) {
    return (
      <div className='py-10'>
        <SkeletonLoader type="text" />
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <SkeletonLoader type="card" count={4} />
        </div>
      </div>
    );
  }

  return (
    <div className='py-10'>
        <h2 className='text-3xl font-secondary font-semibold mb-6'>热门推荐</h2>
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
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}  
        >
            {
              books.book &&
              books.book.slice(8,18).map((item:bookType,index:number) =>(
                  <SwiperSlide>
                      <BookCard key={index} book={item}/>
                  </SwiperSlide>
              ))
            }
        </Swiper>
    </div>
  )
}
