import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
import { getBaseUrl } from './baseUrl'

const baseURL = getBaseUrl()

const instance = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 默认返回后端的 data 字段
    return response
  },
  (error: AxiosError<any>) => {
    const status = error.response?.status
    const msg = (error.response?.data as any)?.message || error.message || '请求失败'
    if (status === 401) {
      message.error('未授权或登录已过期')
      // 清除无效token并重定向到登录页
      localStorage.removeItem('token')
      window.location.href = '/admin'
    } else if (status === 403) {
      message.error('无权限访问')
    } else {
      message.error(msg)
    }
    return Promise.reject(error)
  },
)

export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return instance.get<T>(url, config)
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.post<T>(url, data, config)
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.put<T>(url, data, config)
  },
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.patch<T>(url, data, config)
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return instance.delete<T>(url, config)
  },
}

