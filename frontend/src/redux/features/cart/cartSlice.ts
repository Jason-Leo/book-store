import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store.ts'
import type { bookType } from '../../../types/books.ts'


// 使用该类型定义初始 state
const initialState: bookType[] = [] as bookType[]

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
     addToCart: (state,action: PayloadAction<bookType>) =>{
        const existItem = state.find( item  => item._id === action.payload._id);
        if(!existItem){
            state.push(action.payload);
        }
     },
     removeToCart: (state,action: PayloadAction<bookType>) => {
      const index = state.findIndex(item => item._id === action.payload._id);
      if (index > -1) {
        state.splice(index, 1);
      }
     },
     clearCart: ( state ) => {
      state.splice(0, state.length);
     }
  }
})

export const { addToCart,removeToCart,clearCart } = cartSlice.actions
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.cart

export default cartSlice.reducer