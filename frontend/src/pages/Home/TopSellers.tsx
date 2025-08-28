import React, { useEffect, useState } from 'react'
import type { bookType } from '../../types/books';
import { Select } from 'antd';

export const TopSellers:React.FC = () => {
  const [books,setBooks] = useState<bookType[]>([]);
  const [selectBook,setSelectBook] = useState<bookType[]>([]);
  const options = [
    { value: 'Choose a genre', label: '选择一个体裁', disabled: true },
    { value: 'Business', label: '商业' },
    { value: 'Fiction', label: '小说' },
    { value: 'Horror', label: '恐怖' },
    { value: 'Adventure', label: '冒险' },
  ]
  const handleChange = (value:string)=>{
    const filtered = value === 'Choose a genre'
      ? books
      : books.filter(item => item.category === value.toLowerCase())
    setSelectBook(filtered);
  }
  useEffect(()=>{
    fetch("books.json")
    .then(res => res.json())
    .then(
        (data) => {
            setBooks(data);
            setSelectBook(data);
        }
    );
  },[]);

  return (
    <div className='py-10'>
        <h2 className='text-3xl font-secondary font-semibold mb-6'>畅销书榜单</h2>
        <Select
            placeholder="Choose"
            style={{ width: 140 }}
            onChange={handleChange}
            options={options}
        />
        {
            selectBook.map((item,index) =>(
                <div>{ item.title }</div>
            ))
        }
    </div>
  )
}
