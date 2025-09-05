import { Button, Form, Input } from 'antd'
import { useAppSelector } from '../../redux/hook'
import React from 'react'

const CheckoutPage:React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };
  const cart = useAppSelector(state => state.cart)
  const totalPrice = cart.reduce((acc, item) => acc + item.newPrice, 0)
  return (
   <>
        <div className='h-[calc(100vh-120px)] bg-gray-200 shadow-xl rounded-xl'>
          <div className='max-w-4xl mx-auto pt-10 px-4'>
            <h1 className='text-2xl font-semibold mb-4'>货到付款</h1>
            <div className='mb-4'>总价:${ totalPrice }</div>
            <div className='mb-6'>商品总数:{ cart.length }</div>
            <div className='bg-white shadow-lg rounded-lg px-6 py-8 flex flex-col md:flex-row'>
              <div className='flex-4'>
                <div className='text-lg font-semibold mb-4'>个人详情</div>
                <div className='text-sm text-gray-500'>请填写个人详情,方便我们与您联系</div>
              </div>
              <div className='flex-6'>
        
                <Form name="layout-multiple-horizontal" layout="horizontal" onFinish={onFinish}>
                  <Form.Item layout="vertical" label="全名" name="fullName" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item layout="vertical" label="电子邮箱" name="email" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item layout="vertical" label="手机号码" name="phoneNumber" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Form.Item label="地址" name="address" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="flex-1">
                      <Form.Item label="城市" name="city" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                  <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                      提交订单
                    </Button>
                  </Form.Item>
                </Form>

              </div>
            </div>
          </div>
        </div>
   </>
  )
}

export default CheckoutPage