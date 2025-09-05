import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/footer-logo.png'

const Footer: React.FC = () => {
  return (
    <footer className="mt-2 text-gray-300" style={{ backgroundColor: '#1f2735' }}>
      <div className="max-w-screen-2xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
              <span className="text-xl font-semibold text-white">Bookstore</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              精选优质图书，畅享阅读时光。
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">快速导航</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition">首页</Link></li>
              <li><Link to="/" className="hover:text-white transition">分类</Link></li>
              <li><Link to="/" className="hover:text-white transition">热销榜</Link></li>
              <li><Link to="/" className="hover:text-white transition">联系我们</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">帮助中心</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition">配送与运费</Link></li>
              <li><Link to="/" className="hover:text-white transition">退换货政策</Link></li>
              <li><Link to="/" className="hover:text-white transition">常见问题</Link></li>
              <li><Link to="/" className="hover:text-white transition">隐私政策</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Bookstore. 保留所有权利。</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link to="/" className="hover:text-white transition">服务条款</Link>
            <span className="opacity-50">|</span>
            <Link to="/" className="hover:text-white transition">隐私政策</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


