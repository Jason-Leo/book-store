import React, { useState } from 'react'
import type { bookType } from '../../types/books'
import { Button, Form, Input, Radio, Select, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useAddBookMutation } from '../../redux/features/cart/booksApi';
import { useNavigate } from 'react-router';
import { http } from '../../utils/request';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AddBook:React.FC = () => {
    
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [trending, setTrending] = useState(false);
    const [addBook, { isLoading }] = useAddBookMutation();
    const navigate = useNavigate();
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }
    
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
      };
    
      const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    
      const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>上传封面照片</div>
        </button>
      );

      const onFinish = async (values : Partial<bookType>)=>{
        try {
          // 上传图片
          let coverImage = '';
          if (fileList.length > 0 && fileList[0].originFileObj) {
            const formData = new FormData();
            formData.append('image', fileList[0].originFileObj);
            
            const uploadResult = await http.post('/api/upload/single', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            
            if (uploadResult.data.code === 200) {
              coverImage = uploadResult.data.file.path;
              message.success('图片上传成功')
            } else {
              message.error('图片上传失败');
              return;
            }
          }

          // 准备书籍数据
          const bookData: Omit<bookType, '_id'> = {
            title: values.title!,
            description: values.description!,
            category: values.category!,
            trending: trending,
            oldPrice: Number(values.oldPrice),
            newPrice: Number(values.newPrice),
            coverImage: coverImage,
          };

          console.log(bookData);

          // 提交书籍数据
          await addBook(bookData).unwrap();
          
          // 显示成功toast
          notification.success({
            message: '添加成功！',
            description: `图书"${values.title}"已成功添加`,
            placement: 'topRight',
            duration: 3,
          });
          
          // 延迟跳转，让用户看到toast
          setTimeout(() => {
            navigate('/dashboard/manage-books');
          }, 1000);
        } catch (error) {
          console.error('添加图书失败:', error);
          message.error('添加图书失败');
        }
      }

    const options = [
        { value: 'Choose a genre', label: '选择一个体裁', disabled: true },
        { value: 'Business', label: '商业' },
        { value: 'Fiction', label: '小说' },
        { value: 'Horror', label: '恐怖' },
        { value: 'Adventure', label: '冒险' },
      ];
  return (
    <div className='bg-[#f2f4f5] rounded-lg w-xl mx-auto shadow-md px-4 py-6'>
        <h1 className='text-2xl font-semibold font-primary mb-3'>添加新图书</h1>
        <Form 
        layout='vertical'
        onFinish={onFinish}
        >
            <Form.Item name="title" label="标题" rules={[{ required: true }]}>
                <Input placeholder='请输入图书标题'></Input>
            </Form.Item>
            <Form.Item name="description" label="描述" rules={[{ required: true }]}>
                <Input placeholder='请输入图书描述'></Input>
            </Form.Item>
            <Form.Item name="category" label="种类" rules={[{ required: true }]}>
                <Select
                placeholder="Choose"
                options={options}
                className='white-select'
                />
            </Form.Item>
            <Form.Item name="Trending">
            <Radio checked={trending} onClick={() => setTrending(!trending)}>是否流行</Radio>
            </Form.Item>
            <Form.Item name="oldPrice" label="旧价格" rules={[{ required: true }]}>
                <Input placeholder='请输入旧价格'></Input>
            </Form.Item>
            <Form.Item name="newPrice" label="新价格" rules={[{ required: true }]}>
                <Input placeholder='请输入新价格'></Input>
            </Form.Item>
           <Form.Item name="coverImage" label="封面照片">
           <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false} // 阻止自动上传
                customRequest={() => {}} // 自定义上传请求（空函数）
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
                />
            )}
           </Form.Item>
           <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100%'}}>
                添加图书
                </Button>
           </Form.Item>
        </Form>
    </div>
  )
}

export default AddBook