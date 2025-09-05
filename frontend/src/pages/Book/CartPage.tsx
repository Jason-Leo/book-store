import React, { useEffect, useState } from 'react';
import { Avatar,  Divider, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppSelector,useAppDispatch } from '../../redux/hook';
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart,removeToCart } from '../../redux/features/cart/cartSlice';
import type { bookType } from '../../types/books';
import { Link } from 'react-router';

interface DataType {
  gender?: string;
  name?: string;
  email?: string;
  avatar?: string;
  id?: string;
}

const CartPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const [page, setPage] = useState(1);
    const cart = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const totolPrice = cart.reduce((acc,item)=>acc+item.newPrice,0);
    const handleClear = ()=>{
      dispatch(clearCart());
    }

    const handleRemove = (product:bookType)=>{
      try {
        dispatch(removeToCart(product))
      } catch (e) {
        throw new Error();
      }
    }

  
    const loadMoreData = () => {
      if (loading) {
        return;
      }
      setLoading(true);
      fetch(`https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=10`)
        .then((res) => res.json())
        .then((res) => {
          const results = Array.isArray(res) ? res : [];
          setData([...data, ...results]);
          setLoading(false);
          setPage(page + 1);
        })
        .catch(() => {
          setLoading(false);
        });
    };
  
    useEffect(() => {
      loadMoreData();
    }, []);
  
    return (
      <div
        id="scrollableDiv"
        className='max-h-[calc(100vh-100px)] px-6  shadow-lg overflow-auto rounded-2xl'
      >
        <div className='flex justify-between items-center sticky top-0 bg-white z-10 py-4'>
          <h1 className='md:text-2xl text-xl font-semibold font-primary'>购物车</h1>
          <button className='bg-red-600 px-12 py-2 rounded-md text-base font-secondary text-white font-bold hover:bg-red-400 transition-all duration-200 cursor-pointer'
          onClick={handleClear}
          >
            清空购物车
          </button>
        </div>
        <InfiniteScroll
          dataLength={cart.length}
          next={loadMoreData}
          hasMore={cart.length < 50}
        //   loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={cart}
            renderItem={(item) => (
              <List.Item 
              key={item._id}
              style={{
                height: 150
              }}
              >
                <List.Item.Meta
                  avatar={
                  <Avatar 
                    src={`${getImgUrl(item.coverImage,1)}`}
                    shape="square"
                    size={96}
                  />}
                  title={<div className='md:text-xl text-xl font-semibold mb-4 font-primary'>{item.title}</div>}
                  description={
                    <>
                       <div>图书种类: {item.category}</div>
                      <div>{item.description}</div>
                    </>
                  }
                />
                <div className='h-full flex flex-col justify-around items-end'>
                  <div className='font-semibold'>${item.newPrice}</div>
                  <div className='text-purple-500 font-bold text-md hover:text-purple-300 cursor-pointer'
                  onClick={()=>handleRemove(item)}
                  >从购物车中移除</div>
                </div>
              </List.Item>
            )}
          />
          
        </InfiniteScroll>
        <div className='sticky bottom-0 py-6 bg-white z-10'>
          <div className='flex items-center justify-between mb-3'>
            <span className='font-semibold'>总计</span>
            <span>${ totolPrice.toFixed(2) }</span>
          </div>
         <Link to="/checkout">
              <button className='w-full bg-[#5046e6] py-3 rounded text-white cursor-pointer hover:bg-purple-600'>去结算</button>
         </Link>
        </div>
      </div>
    );
}

export default CartPage