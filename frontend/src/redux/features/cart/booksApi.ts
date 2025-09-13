// 从特定于 React 的入口点导入 RTK Query 方法
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseUrl'
import type { bookType } from '../../../types/books';

// 定义我们的单个 API Slice 对象
export const bookApi = createApi({
  // 缓存减速器预计将添加到 `state.api` （已经默认 - 这是可选的）
  reducerPath: 'bookApi',
  // 我们所有的请求都有以 “/fakeApi” 开头的 URL
  baseQuery: fetchBaseQuery(
    { baseUrl: `${getBaseUrl()}/api/books`,
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
  tagTypes: ['Books'],
  // “endpoints” 代表对该服务器的操作和请求
  endpoints: builder => ({
    fetchAllBooks: builder.query({
      query: () => '/',
      providesTags: ["Books"]
    }),
    fetchBookById: builder.query({
      query: (id:string) => `/${id}`,
      providesTags: (result: {book: bookType, code: number, message: string} | undefined, id: any) => 
        result ? [{type: "Books" as const, id}] : []
    }),
    addBook: builder.mutation({
        query: (newBook : Omit<bookType, '_id'>) => ({
            url:"/create-book",
            method: "POST",
            body: newBook
        }),
        invalidatesTags: ["Books"]
    }),
    updateBook: builder.mutation({
        query: ({id, ...updateData}: {id: string} & Partial<bookType>) => ({
            url: `/edit/${id}`,
            method: "PUT",
            body: updateData
        }),
        invalidatesTags: ["Books"]
    }),
     deleteBook: builder.mutation({
         query: (id: string) => ({
             url: `/${id}`,
             method: "DELETE"
         }),
         invalidatesTags: ["Books"]
     }),
  })
})

// 为 `getPosts` Query endpoint 导出自动生成的 hooks
export const { 
  useFetchAllBooksQuery, 
  useFetchBookByIdQuery,
  useAddBookMutation, 
  useUpdateBookMutation,
  useDeleteBookMutation 
} = bookApi