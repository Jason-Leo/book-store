import React, { useState } from 'react';
import { Space, Table, Button, Image, Tag, Modal, message } from 'antd';
import type { TableProps } from 'antd';
import { Link } from 'react-router';
import { useFetchAllBooksQuery, useDeleteBookMutation } from '../../redux/features/cart/booksApi';
import type { bookType } from '../../types/books';
import { getImgUrl } from '../../utils/getImgUrl';


const ManageBook: React.FC = () => {
    const { data, isLoading } = useFetchAllBooksQuery(undefined);
    const books: bookType[] = data?.book ?? [];
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState<RowType | null>(null);

    // 处理删除确认
    const handleDeleteClick = (record: RowType) => {
        setBookToDelete(record);
        setDeleteModalOpen(true);
    };

    // 执行删除操作
    const handleDeleteConfirm = async () => {
        if (!bookToDelete?._id) return;

        try {
            await deleteBook(bookToDelete._id).unwrap();
            messageApi.success('书籍删除成功');
            setDeleteModalOpen(false);
            setBookToDelete(null);
        } catch (error) {
            messageApi.error('删除失败，请重试');
            console.error('Delete error:', error);
        }
    };

    // 取消删除
    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setBookToDelete(null);
    };

    type RowType = {
        key: string;
        title: string;
        category: string;
        price: number;
        coverImage?: string;
        _id?: string;
    }

    const columns: TableProps<RowType>['columns'] = [
        {
            title: '封面',
            dataIndex: 'coverImage',
            key: 'coverImage',
            width: 90,
            render: (src?: string) => src ? <Image src={`${getImgUrl(src,1)}`} width={56} height={56} style={{ objectFit: 'cover' }} /> : '-'
        },
        {
            title: '图书名称',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
        },
        {
            title: '图书种类',
            dataIndex: 'category',
            key: 'category',
            render: (c: string) => <Tag>{c}</Tag>
        },
        {
            title: '图书价格',
            dataIndex: 'price',
            key: 'price',
            render: (p: number) => `￥${(Number(p) || 0).toFixed(2)}`,
            width: 120,
        },
        {
            title: '操作',
            key: 'action',
            width: 160,
            render: (_: unknown, record: RowType) => (
                <Space size="middle">
                    <Link to={`/dashboard/edit-book/${record._id}`}>
                        <span className='text-[#4c4a70] font-semibold font-primary'>编辑</span>
                    </Link>
                    <Button 
                        color="danger" 
                        variant="solid" 
                        shape="round"
                        onClick={() => handleDeleteClick(record)}
                        loading={isDeleting}
                    >
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    const dataSource: RowType[] = books.map((b) => ({
        key: b._id ?? b.title,
        _id: b._id,
        title: b.title,
        category: b.category,
        price: b.newPrice ?? b.oldPrice ?? 0,
        coverImage: b.coverImage,
    }));

    return (
        <>
            {contextHolder}
            <div className='mt-6'>
                <Table<RowType>
                    columns={columns}
                    dataSource={dataSource}
                    loading={isLoading}
                    rowKey={(row) => row.key}
                    pagination={{ pageSize: 5, showSizeChanger: false }}
                />
            </div>
            
            <Modal
                title="确认删除"
                open={deleteModalOpen}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="确认删除"
                cancelText="取消"
                okButtonProps={{ 
                    danger: true,
                    loading: isDeleting 
                }}
            >
                <p>确定要删除书籍 <strong>"{bookToDelete?.title}"</strong> 吗？</p>
                <p style={{ color: '#ff4d4f', fontSize: '14px' }}>
                    此操作不可撤销！
                </p>
            </Modal>
        </>
    )
};

export default ManageBook;