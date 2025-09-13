import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/order/orderApi'
import { useAuth0 } from '@auth0/auth0-react';
import type { orderType } from '../../types/orders';
import { Divider } from 'antd';

const OrderPage:React.FC = () => {
    const { user } = useAuth0();
    const email = user?.email ?? '';
    const { data: orders = [], isLoading } = useGetOrderByEmailQuery(email);
    if (isLoading) return <div>Loading...</div>;
    return (
        <div>
            <h1 className='md:text-2xl text-xl font-semibold mb-4 font-primary '>你的订单</h1>
            {
                orders.order.length === 0 ? (<div>Not Found</div>) : (
                    orders.order.map((item : orderType, index : string) =>(
                         <div className='space-y-1'>
                            <div className='bg-gray-600 text-white w-fit py-1 px-2 rounded'># {index+1}</div>
                            <h3 className='text-md font-mono font-semibold'>
                                订单id: {item._id}
                            </h3>
                            <h3 className='text-md font-mono'>
                                姓名: {item.name}
                            </h3>
                            <h3 className='text-md font-mono'>
                                电子邮件: {item.email}
                            </h3>
                            <h3 className='text-md font-mono'>
                                总价: ${item.totalPrice}
                            </h3>
                            <div className='text-md font-mono'>
                                <h1 className='text-lg font-semibold text-gray-600'>地址:</h1>
                                <div>{ item.address}</div>
                            </div>
                            <div className='text-md font-mono'>
                                <h1 className='text-lg font-semibold text-gray-600'>产品id:</h1>
                                <div>{ item.productIds.map((id,_)=>(
                                    <div>{ id }</div>
                                )) }</div>
                            </div>
                            <Divider />
                         </div>
                    ))
                )
            }
        </div>
    );
}

export default OrderPage