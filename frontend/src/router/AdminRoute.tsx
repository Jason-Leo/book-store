// frontend/src/router/AdminRoute.tsx
import { Navigate, Outlet } from 'react-router'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

type Props = { children?: ReactNode }

const AdminRoute: React.FC<Props> = ({ children }) => {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false)
        return
      }

      try {
        // 检查token是否过期
        const payload = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Date.now() / 1000
        
        if (payload.exp < currentTime) {
          // Token已过期
          localStorage.removeItem('token')
          setIsValidToken(false)
          return
        }
        
        setIsValidToken(true)
      } catch (error) {
        // Token格式无效
        localStorage.removeItem('token')
        setIsValidToken(false)
      }
    }

    validateToken()
  }, [token])

  // 加载中状态
  if (isValidToken === null) {
    return <div>验证中...</div>
  }

  // Token无效或不存在
  if (!isValidToken) {
    return <Navigate to="/admin" replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export default AdminRoute