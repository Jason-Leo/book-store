import React, { useEffect, useState } from 'react';
import { http } from '../utils/request';
import { fommatDate } from '../utils/fommatDate';

type RecentOrder = {
  _id: string;
  name: string;
  email: string;
  totalPrice: number;
  createdAt: string;
  bookTitles: string[];
  bookCount: number;
}

export const RecentOrders: React.FC = () => {
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await http.get<{ message: string; data: RecentOrder[] }>('/api/admin/recent-orders?limit=8');
        setOrders(res.data.data || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">暂无订单数据</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="font-semibold font-primary text-lg mb-4">最近订单</h2>
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
        {orders.map((order) => (
          <div key={order._id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-gray-900">{order.name}</div>
              <div className="text-sm font-semibold text-green-600">¥{(Number(order.totalPrice) || 0).toFixed(2)}</div>
            </div>
            <div className="text-sm text-gray-600 mb-1">
              {order.bookCount} 本书 • {fommatDate(order.createdAt)}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {order.bookTitles.slice(0, 2).join(', ')}
              {order.bookTitles.length > 2 && ` 等${order.bookTitles.length}本`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
