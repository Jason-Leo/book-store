import React from 'react'
import { Button, Card, Typography, Space, Divider } from 'antd';
import { UserOutlined, SafetyOutlined, GlobalOutlined } from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';

const { Title, Text, Paragraph } = Typography;

export const Login: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  return (
    <div className='h-[calc(100vh-120px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <Card 
        className='w-full max-w-md shadow-2xl border-0'
        bodyStyle={{ padding: '48px 40px' }}
      >
        <div className='text-center mb-8'>
          <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
            <UserOutlined className='text-2xl text-white' />
          </div>
          <Title level={2} className='mb-2'>欢迎回来</Title>
          <Text type='secondary'>请使用您的账户登录</Text>
        </div>

        {isAuthenticated ? (
          <div className='text-center'>
            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <UserOutlined className='text-3xl text-green-600' />
            </div>
            <Title level={4} className='mb-2'>登录成功</Title>
            <Text className='block mb-4'>欢迎，{user?.name}</Text>
            <Button 
              type='default' 
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className='w-full h-12'
            >
              退出登录
            </Button>
          </div>
        ) : (
          <div className='space-y-6'>
            <div className='text-center'>
              <Space direction='vertical' size='large' className='w-full'>
                <div className='space-y-2'>
                  <SafetyOutlined className='text-2xl text-primary' />
                  <Text strong>安全登录</Text>
                  <Paragraph type='secondary' className='text-sm mb-0'>
                    使用 Auth0 提供安全可靠的登录服务
                  </Paragraph>
                </div>
                
                <Divider>登录方式</Divider>
                
                <Button 
                  type='primary' 
                  size='large'
                  onClick={() => loginWithRedirect()}
                  className='w-full h-12 text-base font-medium'
                  icon={<GlobalOutlined />}
                >
                  使用 Auth0 登录
                </Button>
              </Space>
            </div>
            
            <div className='text-center'>
              <Text type='secondary' className='text-xs'>
                登录即表示您同意我们的服务条款和隐私政策
              </Text>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
