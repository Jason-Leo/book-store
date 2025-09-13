import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import type { bookType } from '../../types/books'
import { Button, Form, Input, Radio, Select, message, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../redux/features/cart/booksApi';
import { http } from '../../utils/request';
import { getImgUrl } from '../../utils/getImgUrl';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  // 获取图书数据
  const { data: bookData, isLoading: isBookLoading } = useFetchBookByIdQuery(id || '');
  const book = bookData?.book;
  
  // 更新图书的mutation
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  
  // 状态管理
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [trending, setTrending] = useState(false);
  const [hasNewImage, setHasNewImage] = useState(false);

  // 当图书数据加载完成时，填充表单
  useEffect(() => {
    if (book) {
      form.setFieldsValue({
        title: book.title,
        description: book.description,
        category: book.category,
        oldPrice: book.oldPrice,
        newPrice: book.newPrice,
      });
      setTrending(book.trending);
      
      // 设置现有图片
      if (book.coverImage) {
        const imageUrl = getImgUrl(book.coverImage, 1);
        setFileList([{
          uid: '-1',
          name: 'cover.jpg',
          status: 'done',
          url: typeof imageUrl === 'string' ? imageUrl : imageUrl.toString(),
        }]);
      }
    }
  }, [book, form]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setHasNewImage(newFileList.length > 0 && Boolean(newFileList[0].originFileObj));
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传新封面照片</div>
    </button>
  );

  const onFinish = async (values: Partial<bookType>) => {
    try {
      let coverImage = book?.coverImage || '';

      // 如果有新图片，先上传
      if (hasNewImage && fileList.length > 0 && fileList[0].originFileObj) {
        const formData = new FormData();
        formData.append('image', fileList[0].originFileObj);
        
        const uploadResult = await http.post('/api/upload/single', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        if (uploadResult.data.code === 200) {
          coverImage = uploadResult.data.file.path;
        } else {
          message.error('图片上传失败');
          return;
        }
      }

      // 准备更新数据
      const updateData: Partial<bookType> = {
        title: values.title,
        description: values.description,
        category: values.category,
        trending: trending,
        oldPrice: Number(values.oldPrice),
        newPrice: Number(values.newPrice),
        coverImage: coverImage,
      };

      // 提交更新
      await updateBook({ id: id!, ...updateData }).unwrap();
      
      // 显示成功toast
      notification.success({
        message: '更新成功！',
        description: `图书"${values.title}"已成功更新`,
        placement: 'topRight',
        duration: 3,
      });
      
      // 延迟跳转，让用户看到toast
      setTimeout(() => {
        navigate('/dashboard/manage-books');
      }, 1000);
    } catch (error) {
      console.error('更新图书失败:', error);
      message.error('更新图书失败');
    }
  };

  const options = [
    { value: 'Choose a genre', label: '选择一个体裁', disabled: true },
    { value: 'Business', label: '商业' },
    { value: 'Fiction', label: '小说' },
    { value: 'Horror', label: '恐怖' },
    { value: 'Adventure', label: '冒险' },
  ];

  if (isBookLoading) {
    return <div className='bg-[#f2f4f5] rounded-lg w-xl mx-auto shadow-md px-4 py-6'>加载中...</div>;
  }

  if (!book) {
    return <div className='bg-[#f2f4f5] rounded-lg w-xl mx-auto shadow-md px-4 py-6'>图书不存在</div>;
  }

  return (
    <div className='bg-[#f2f4f5] rounded-lg w-xl mx-auto shadow-md px-4 py-6'>
      <h1 className='text-2xl font-semibold font-primary mb-3'>编辑图书</h1>
      <Form 
        form={form}
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item name="title" label="标题" rules={[{ required: true }]}>
          <Input placeholder='请输入图书标题' />
        </Form.Item>
        <Form.Item name="description" label="描述" rules={[{ required: true }]}>
          <Input placeholder='请输入图书描述' />
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
          <Input placeholder='请输入旧价格' />
        </Form.Item>
        <Form.Item name="newPrice" label="新价格" rules={[{ required: true }]}>
          <Input placeholder='请输入新价格' />
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
          <Button type="primary" htmlType="submit" loading={isUpdating} style={{ width: '100%' }}>
            更新图书
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditBook;