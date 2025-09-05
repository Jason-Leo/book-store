import React from 'react'
import { Link } from 'react-router'
import type { newsType } from '../../types/new';
import { getImgUrl } from '../../utils/getImgUrl';

interface NewsCardProps {
    news: newsType
}

const BookCard : React.FC<NewsCardProps> = ({news}) => {
  return (
    <div className='rounded-lg transition-shadow duration-300'>
        <div className=' flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-between gap-4'>
            <div>
                <Link to="/">
                    <h3 className='text-xl font-semibold hover:text-blue-600 mb-3'>
                        { news.title }
                    </h3>
                </Link>
                <p className='text-gray-600 mb-5 max-w-[30em] break-all'>
                    { news.description }
                </p>
            </div>

            <div className='sm:h-72 sm:flex-shrink-0 rounded-md flex items-center'>
                <Link to={"/"}>
                    <img 
                    src={`${getImgUrl(news.image,0)}`} 
                    alt="Img" 
                    className='w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200'
                    />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default BookCard