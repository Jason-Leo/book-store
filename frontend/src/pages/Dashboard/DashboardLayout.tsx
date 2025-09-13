import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router';
import { useNavigate, useLocation } from 'react-router';
import  Logo  from '../../assets/fav-icon.png';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  
  // 根据当前路径获取选中的菜单项
  const getSelectedKey = () => {
    const p = location.pathname;
    if (p === '/dashboard') return '1';
    if (p.startsWith('/dashboard/add-new-book')) return '2';
    if (p.startsWith('/dashboard/manage-books') || p.startsWith('/dashboard/edit-book/')) return '3';
    return '1';
  };

  const handleMenuClick = (key: string) => {
    switch(key) {
      case '1':
        navigate('/dashboard');
        break;
      case '2':
        navigate('/dashboard/add-new-book');
        break;
      case '3':
        navigate('/dashboard/manage-books');
        break;
    }
  };

  return (
    <Layout style={{
        height: '100vh' 
    }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="px-5 py-4 flex items-center gap-2 justify-center">
            <img src={Logo} alt="Logo" />
            {
                collapsed ? false : <span className='text-white text-lg font-bold'>书店管理后台</span>
            }
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: '首页',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: '新增图书',
            },
            {
              key: '3',
              icon: <UploadOutlined />, 
              label: '管理图书',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="custom-scrollbar"
        >
          <div className='flex justify-between items-center'>
            <div className='flex-col items-center space-y-2'>
                <h1 className='text-2xl font-semibold font-primary'>仪表盘</h1>
                <p className='text-md text-gray-500'>书店库存</p>
            </div>
            <div className='flex items-center space-x-5'>
                <Button color="purple" variant="outlined" size='large' icon={<EditOutlined />}>
                    <Link to="/dashboard/manage-books">管理图书</Link>
                </Button>
                <Button color="purple" variant="solid" size='large'
                icon={<PlusOutlined />}
                >
                    <Link to="/dashboard/add-new-book">新增图书</Link>
                </Button>
            </div>
          </div>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;