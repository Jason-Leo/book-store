import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex } from 'antd';
import { Link } from 'react-router';

export const Register: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
      };
    
      return (
        <div className='h-[calc(100vh-120px)] flex items-center justify-center'>
            <div className='px-12 py-16 shadow-md bg-gray-50 rounded-xl'>
                <h2 className='text-2xl font-secondary font-semibold mb-6'>注册</h2>
                <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ width: 350 }}
                onFinish={onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input 
                    prefix={<UserOutlined />}
                    style={{ height: 35 }}
                    placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input 
                    prefix={<LockOutlined />} 
                    type="password" 
                    style={{ height: 35 }}
                    placeholder="请输入密码" />
                </Form.Item>
            
                <Form.Item>
                    <Flex justify='space-between' align='center'>
                        <Button  
                        type="primary" 
                        htmlType="submit"
                        style={{ width: 200 }}
                        >
                        注册
                        </Button>
                        <Link to='/login'>去登录</Link>
                    </Flex>
                </Form.Item>
                </Form>
            </div>
        </div>
      );
}
