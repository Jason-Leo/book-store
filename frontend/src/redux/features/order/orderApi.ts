// 从特定于 React 的入口点导入 RTK Query 方法
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseUrl'
import type { orderType } from '../../../types/orders';

// 定义我们的单个 API Slice 对象
export const orderApi = createApi({
  // 缓存减速器预计将添加到 `state.api` （已经默认 - 这是可选的）
  reducerPath: 'orderApi',
  // 我们所有的请求都有以 “/fakeApi” 开头的 URL
  baseQuery: fetchBaseQuery(
    { baseUrl: `${getBaseUrl()}/api/orders`,
      credentials: 'include',
      prepareHeaders: (headers: Headers) => {
          // 如果需要添加认证头
          // headers.set('authorization', `Bearer ${token}`);
          const token = localStorage.getItem('token');
          if(token){
            headers.set('Authorization',`Bearer ${token}`);
          }
          return headers;
      },
    }),
  tagTypes: ['Orders'],
  // “endpoints” 代表对该服务器的操作和请求
  endpoints: builder => ({
    createOrder: builder.mutation({
        query: (newOrder : orderType) => ({
            url:"/create-order",
            method: "POST",
            body: newOrder,
            credentials: 'include'
        }),
        invalidatesTags: ["Orders"]
    }),
    getOrderByEmail: builder.query({
        query: (email : string) => ({
            url:`/email/${email}`,
            method: "GET",
            credentials: 'include'
        }),
        providesTags: ['Orders']
    }),
  })
})

// 为 `getPosts` Query endpoint 导出自动生成的 hooks
export const { 
    useCreateOrderMutation,
    useGetOrderByEmailQuery
} = orderApi