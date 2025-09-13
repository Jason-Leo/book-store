import React, { useEffect, useState } from 'react'
import type { bookType } from '../../types/books';
import { Select } from 'antd';
import BookCard from '../Book/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/cart/booksApi';
import { SkeletonLoader } from '../../components/SkeletonLoader';


export const TopSellers:React.FC = () => {
  
  const [selectBook,setSelectBook] = useState<bookType[]>([]);
  const {data: books = {book: []}, isLoading} = useFetchAllBooksQuery([]);
  console.log(books);
  
  useEffect(() => {
    if (books && books.book && books.book.length > 0) {
      setSelectBook(books.book);
    }
  }, [books]);
  
  const options = [
    { value: 'Choose a genre', label: '选择一个体裁', disabled: true },
    { value: 'Business', label: '商业' },
    { value: 'Fiction', label: '小说' },
    { value: 'Horror', label: '恐怖' },
    { value: 'Adventure', label: '冒险' },
  ]
  const handleChange = (value:string)=>{
    const filtered = value === 'Choose a genre'
      ? books.book
      : books.book.filter((item: bookType) => item.category === value.toLowerCase())
    setSelectBook(filtered);
  }

  if (isLoading) {
    return (
      <div className='py-10'>
        <SkeletonLoader type="text" />
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <SkeletonLoader type="card" count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className='py-10'>
        <h2 className='text-3xl font-secondary font-semibold mb-6'>畅销书榜单</h2>
        <Select
            placeholder="Choose"
            style={{ width: 140 }}
            onChange={handleChange}
            options={options}
        />
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
              selectBook &&
              selectBook.map((item,index) =>(
                  <SwiperSlide key={index}>
                      <BookCard book={item}/>
                  </SwiperSlide>
              ))
            }
        </Swiper>
    </div>
  )
}
