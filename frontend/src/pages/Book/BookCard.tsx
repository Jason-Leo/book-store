import React from 'react'
import { Link } from 'react-router'
import { ShoppingCartOutlined } from '@ant-design/icons';
import type { bookType } from '../../types/books';
import { getImgUrl } from '../../utils/getImgUrl';
import { useAppSelector, useAppDispatch } from '../../redux/hook'
import { addToCart } from '../../redux/features/cart/cartSlice';
import { message } from 'antd';


interface BookCardProps {
    book: bookType
}

const BookCard : React.FC<BookCardProps> = ({book}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
      messageApi.open({
        type: 'success',
        content: '加入购物车成功',
      });
    };
  
    const error = () => {
      messageApi.open({
        type: 'error',
        content: '加入购物车失败',
      });
    };
  
  const cart = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()
  const handleAddToCart = (product: bookType) =>{
    try {
        const exists = cart.some(item => item._id === product._id)
        if (exists) {
          messageApi.open({ type: 'warning', content: '已在购物车中' })
          return
        }
        dispatch(addToCart(product))
        success()
      } catch {
        error()
      }
  }
  return (
   <>
        {contextHolder}
         <div className='rounded-lg transition-shadow duration-300'>
        <div className=' flex flex-col sm:flex-row sm:items-center sm:h-72 gap-4'>
            <div className='sm:h-72 sm:flex-shrink-0 border border-gray-400 rounded-md'>
                <Link to={`/book/${book._id}`}>
                    <img 
                    src={`${getImgUrl(book.coverImage,1)}`} 
                    alt="Img" 
                    className='w-48 h-64 object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200'
                    />
                </Link>
            </div>

            <div>
                <Link to={`/book/${book._id}`}>
                    <h3 className='text-xl font-semibold hover:text-blue-600 mb-3'>
                        { book.title }
                    </h3>
                </Link>
                <p className='text-gray-600 mb-5 max-w-[15em] break-all'>
                    { book.description.length > 40 ? `${book.description.slice(0,40)}...` : book.description }
                </p>
                <p className='font-medium mb-5'>
                    ${ (Number(book.newPrice) || 0).toFixed(2) }
                    <span className='line-through font-normal ml-2'>
                        ${ (Number(book.oldPrice) || 0).toFixed(2) }
                    </span>
                </p>
                <button className='bg-primary  px-6 py-2 rounded-md text-base font-secondary font-bold hover:bg-secondary hover:text-white transition-all duration-200 cursor-pointer space-x-1 flex items-center gap-1'
                onClick={()=>handleAddToCart(book)}
                >
                    <ShoppingCartOutlined/>
                    <span className='font-medium'>添加到购物车</span>
                </button>
            </div>
        </div>
    </div>
   </>
  )
}

export default BookCard