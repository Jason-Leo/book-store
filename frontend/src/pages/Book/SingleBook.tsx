import React from 'react'
import { useParams } from 'react-router'
import { useFetchBookByIdQuery } from '../../redux/features/cart/booksApi'
import { Skeleton } from 'antd';
import { getImgUrl } from '../../utils/getImgUrl';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppDispatch,useAppSelector } from '../../redux/hook';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { message } from 'antd';
import type { bookType } from '../../types/books';
import { fommatDate } from '../../utils/fommatDate';

const SingleBook:React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: book, isLoading } = useFetchBookByIdQuery(id || '');
    const item = book?.book;
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
      } catch (e) {
        error()
      }
  }
    return (
        <div>
            {contextHolder}
            {isLoading ? (
                <div className='space-y-4'>
                    <Skeleton.Image active style={{ width: 300, height: 400 }}/>
                   
                    <Skeleton.Input active block style={{ width: 300}}/>
                    <Skeleton.Input active block style={{ width: 300}}/>
                </div>
            ) : (
                <div className='w-md rounded bg-white shadow-md px-4 py-6'>
                    <h1 className='md:text-2xl text-xl font-semibold mb-4 font-primary'>{ item?.title }</h1>
                    <img src={`${getImgUrl(item?.coverImage,1)}`} alt="Img" />
                    <div className='mt-6 space-x-2'>
                        <span className='text-lg font-primary'>创建时间:</span>
                        <span className='text-md font-mono'>
                          { fommatDate(item?.createdAt) }
                        </span>
                    </div>
                    <div className='mt-4 space-x-2'>
                        <span className='text-lg font-primary'>种类:</span>
                        <span className='text-md font-mono'>
                            { item?.category }
                        </span>
                    </div>
                    <div className='my-4 space-x-2'>
                        <span className='text-lg font-primary'>描述:</span>
                        <span className='text-md font-primary'>
                            { item?.description }
                        </span>
                    </div>
                    <button className='bg-primary  px-6 py-2 rounded-md text-base font-secondary font-bold hover:bg-secondary hover:text-white transition-all duration-200 cursor-pointer space-x-1 flex items-center gap-1'
                    onClick={()=> item && handleAddToCart(item)}
                    >
                        <ShoppingCartOutlined/>
                        <span className='font-medium'>添加到购物车</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default SingleBook