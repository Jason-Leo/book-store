import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartReducer from '../redux/features/cart/cartSlice'
import { bookApi } from './features/cart/booksApi'
import { orderApi } from './features/order/orderApi'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const rootReducer = combineReducers({
  cart: cartReducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(bookApi.middleware, orderApi.middleware)
})

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store