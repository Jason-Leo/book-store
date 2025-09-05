import React from 'react';
import { UnorderedListOutlined,SearchOutlined,UserOutlined,HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import avatarImg from '../assets/avatar.png';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useAppSelector } from '../redux/hook';

export const Navbar:React.FC = () => {
  const currentUser : boolean = false;
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/dashboard">
          仪表盘
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" href="/orders">
          菜单
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/cart">
          购物车
        </a>
      ),
    },
    {
        key: '4',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="/checkout">
            核对
          </a>
        ),
      },
  ];
  const cart = useAppSelector(state => state.cart)
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
       <nav className="flex justify-between items-center">
        <div className="flex items-center md:gap-16 gap-4"> 
           <Link to="/">
                <UnorderedListOutlined style={{ fontSize: '1.5em' }}/>
           </Link>
           <div className='relative sm:w-72 w-40 space-x-2'>
                <SearchOutlined className='absolute inline-block left-3 inset-y-2'/>
                <input className="bg-gray-200 w-full py-1 px-8 rounded-md focus:outline-none" type="text" placeholder="Search" />
           </div>
        </div>
        <div className='relative flex items-center sm:space-x-4 space-x-2'>
            { currentUser ? 
             <Dropdown menu={{ items }} placement="bottom">
                <button>
                    <img src={avatarImg} alt="user" className={`size-7 rounded-full ${ currentUser ? 'ring-blue-500 ring-2' : ''}`} />
                </button> 
            </Dropdown>
            : 
            <Link to="/login"><UserOutlined style={{ fontSize: '1.5em' }}/></Link>
            }
            <button className='hidden sm:block'>
                <HeartOutlined style={{ fontSize: '1.5em' }}/>
            </button>
            <Link to="/cart" className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
                <ShoppingCartOutlined/>
                <span className='text-sm font-semibold sm:ml-1'>{ cart.length }</span>
            </Link>
        </div>
       </nav>
    </header>
  )
}
