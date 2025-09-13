import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex } from 'antd';
import { http } from '../utils/request';
import { useNavigate } from 'react-router';


const AdminLogin:React.FC = () => {
    type loginData = {
      "username" : string,
      "password" : string
    }
    const navigate = useNavigate();
    
    const onFinish = async (values: loginData) => {
        console.log('Received values of form: ', values);
        try{
          const res = await http.post('/api/auth/admin',values);
          if(res.data.code === 200){
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
            setTimeout(() => {
              localStorage.removeItem('token');
              navigate('/');
            }, 3600*1000);
          }
        }catch(error){
          console.log(error);
        }
    };
  return (
    <div className='h-[calc(100vh-120px)] flex items-center justify-center'>
    <div className='px-12 py-14 shadow-md bg-gray-50 rounded-xl'>
      <h2 className='text-2xl font-secondary font-semibold mb-6'>登录</h2>
      <Form name='login' initialValues={{ remember: true }} style={{ width: 350 }} onFinish={onFinish}>
        <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
          <Input prefix={<UserOutlined />} style={{ height: 35 }} placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
          <Input prefix={<LockOutlined />} type='password' style={{ height: 35 }} placeholder='请输入密码' />
        </Form.Item>
        <Form.Item>
          <Flex justify='space-between' align='center'>
            <Button type='primary' htmlType='submit' style={{ width: 350 }}>
              登录
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  </div>
  )
}

export default AdminLogin