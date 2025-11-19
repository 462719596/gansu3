import React from 'react';
import { motion } from 'framer-motion';
import { Ribbon as Weibo, MessageCircle, Smartphone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-ink-900 to-ink-800 text-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌区域 */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16">
                {/* 印章底座 */}
                <div className="w-16 h-16 bg-cinnabar-600 transform rotate-2 rounded-sm shadow-lg border-2 border-cinnabar-700">
                  <div className="w-full h-full bg-gradient-to-br from-cinnabar-500 to-cinnabar-700 rounded-sm flex items-center justify-center">
                    <span className="text-white font-title text-2xl font-bold transform -rotate-2">墨</span>
                  </div>
                </div>
                {/* 印章纹理 */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-sm transform rotate-2"></div>
              </div>
              <div>
                <h3 className="font-title text-3xl text-gold-400 font-bold">墨陇行</h3>
                <p className="text-slate-400 font-body mt-1">一笔大漠孤烟，千里陇上江南</p>
              </div>
            </div>
            <p className="text-slate-400 font-body leading-relaxed max-w-md">
              专注于甘肃深度文化旅游，以传统美学诠释西北大地的壮美风光，
              为您定制独一无二的丝路文化之旅。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="font-title text-xl text-gold-400 font-semibold mb-4">快速导航</h4>
            <ul className="space-y-2 font-body">
              {['目的地', '精选路线', '画卷长廊', '关于我们'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-gold-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 社交媒体 */}
        <div className="border-t border-ink-700 mt-8 pt-8 flex justify-center">
          <div className="flex items-center space-x-6">
            <motion.a
              href="#"
              className="w-10 h-10 bg-ink-700 rounded-full flex items-center justify-center text-slate-400 hover:text-gold-400 hover:bg-ink-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Weibo size={18} />
            </motion.a>
            <motion.a
              href="#"
              className="w-10 h-10 bg-ink-700 rounded-full flex items-center justify-center text-slate-400 hover:text-gold-400 hover:bg-ink-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle size={18} />
            </motion.a>
            <motion.a
              href="#"
              className="w-10 h-10 bg-ink-700 rounded-full flex items-center justify-center text-slate-400 hover:text-gold-400 hover:bg-ink-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Smartphone size={18} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;