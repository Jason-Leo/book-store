import { CheckCircleOutlined,FireOutlined,AppstoreOutlined,DollarOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Chart } from '../../components/Chart'
import { CategoryChart } from '../../components/CategoryChart'
import { RecentOrders } from '../../components/RecentOrders'
import { Divider } from 'antd'
import { http } from '../../utils/request'
import { DashboardSkeleton } from '../../components/DashboardSkeleton'

interface AdminStats {
  totalOrders: number
  totalSales: number
  trendingBooks: number
  totalBooks: number
  monthlySales: Array<{ _id: string; totalSales: number; totalOrders: number }>
}

const Dashboard:React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await http.get<{ message: string; stats: AdminStats }>(`/api/admin`)
        setStats(res.data.stats)
      } catch {
        // global error handler shows message
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className='py-4 gap-4'>
        <div className='grid grid-cols-4 gap-4 auto-rows-[150px]'>
            <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5'>
                 <div className='w-15 h-15 rounded-full bg-[#f4e8ff] flex justify-center items-center'>
                    <CheckCircleOutlined style={{ fontSize: 24, color: '#561ea7' }}/>
                 </div>
                 <div className='flex flex-col items-start justify-center space-y-1'>
                    <h1 className='text-2xl font-semibold font-primary'>{stats ? stats.totalBooks : 0}</h1>
                    <p className='text-md text-gray-500 font-secondary'>产品总数</p>
                 </div>
            </div>
            <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5'>
                 <div className='w-15 h-15 rounded-full bg-[#dcfce7] flex justify-center items-center'>
                    <FireOutlined style={{ fontSize: 24, color:'#239c5b' }}/>
                 </div>
                 <div className='flex flex-col items-start justify-center space-y-1'>
                    <h1 className='text-2xl font-semibold font-primary'>¥{stats ? (Number(stats.totalSales) || 0).toFixed(2) : '0.00'}</h1>
                    <p className='text-md text-gray-500 font-secondary'>销售总额</p>
                 </div>
            </div>
            <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5'>
                 <div className='w-15 h-15 rounded-full bg-[#fde2e1] flex justify-center items-center'>
                    <AppstoreOutlined style={{ fontSize: 24,color: '#a11e27' }}/>
                 </div>
                 <div className='flex flex-col items-start justify-center space-y-1'>
                    <h1 className='text-2xl font-semibold font-primary'>{stats ? stats.trendingBooks : 0}</h1>
                    <p className='text-md text-gray-500 font-secondary'>畅销书榜</p>
                 </div>
            </div>
            <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5'>
                 <div className='w-15 h-15 rounded-full bg-[#dbe9ff] flex justify-center items-center'>
                    <DollarOutlined style={{ fontSize: 24,color: '#2663eb' }}/>
                 </div>
                 <div className='flex flex-col items-start justify-center space-y-1'>
                    <h1 className='text-2xl font-semibold font-primary'>{stats ? stats.totalOrders : 0}</h1>
                    <p className='text-md text-gray-500 font-secondary'>总订单数</p>
                 </div>
            </div>
            <div className='col-span-2 row-span-3 shadow-xl rounded-xl px-4 py-6'>
              <h2 className='font-semibold font-primary text-lg'>每个月的收入额</h2>
              <Divider></Divider>
              <div className='bg-[#f2f4f5] border-2 border-dashed border-gray-300 px-4 py-4 rounded-md h-90 mb-4'>
                <div className='bg-white rounded-xl flex-col flex items-center justify-center h-full'>
                    <div className='font-semibold font-primary text-xl'>月度收入</div>
                    <Chart labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} values={[]} />
                </div>
              </div>
            </div>
            <div className='row-span-4 shadow-xl rounder-xl flex-col items-center justify-center px-4 py-10 space-y-2'>
               <h2 className='font-semibold font-primary text-lg'>畅销书种类占比</h2>
               <Divider></Divider>
               <CategoryChart />
            </div>
            <div className='row-span-4 shadow-xl rounded-xl px-4 py-6'>
              <RecentOrders />
            </div>
            <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5'>
                 <div className='w-15 h-15 rounded-full bg-[#fdf9c3] flex justify-center items-center'>
                    <DollarOutlined style={{ fontSize: 24,color: '#9e822c' }}/>
                 </div>
                 <div className='flex flex-col items-start justify-center space-y-1'>
                    <h1 className='text-2xl font-semibold font-primary'>100</h1>
                    <p className='text-md text-gray-500'>库存剩余</p>
                 </div>
            </div>
            <div className='rounded-xl shadow-xl flex items-center justify-start px-4 py-6 space-x-5'>
                 <div className='w-15 h-15 rounded-full bg-[#cefaf0] flex justify-center items-center'>
                    <DollarOutlined style={{ fontSize: 24,color: '#167a64' }}/>
                 </div>
                 <div className='flex flex-col items-start justify-center space-y-1'>
                    <h1 className='text-2xl font-semibold font-primary'>100</h1>
                    <p className='text-md text-gray-500'>访客量</p>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard