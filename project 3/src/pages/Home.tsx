import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mountain, Camera, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { animations, createStaggeredAnimation } from '../utils/animations';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = '墨陇行 - 甘肃国风旅游官网 | 一笔大漠孤烟，千里陇上江南';
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('quick-guide');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const attractions = [
    { name: '莫高窟', icon: Mountain, description: '千年石窟艺术宝库' },
    { name: '鸣沙山', icon: Mountain, description: '沙海驼铃声声' },
    { name: '张掖丹霞', icon: Camera, description: '七彩斑斓地貌奇观' },
    { name: '甘南草原', icon: TreePine, description: '高原牧歌悠扬' },
  ];

  const routes = [
    {
      id: 1,
      name: '莫高窟',
      location: '敦煌市',
      description: '世界文化遗产，丝绸之路上的艺术宝库，拥有千年佛教石窟艺术',
      image: '/images/mogaoku.jpg', // 替换为莫高窟图片
      rating: 4.9,
      visitTime: '3-4小时',
      highlights: ['飞天壁画', '千佛洞', '文物陈列中心'],
    },
    {
      title: '大漠风情',
      subtitle: '鸣沙山月牙泉奇观',
      days: '3天2夜',
      image: '/images/yueyaquan.jpg', // 替换为月牙泉图片
    },
    {
      title: '丹霞奇景',
      subtitle: '张掖七彩丹霞地质公园',
      days: '4天3夜',
      image: '/images/danxai.jpg', // 替换为丹霞图片
    },
    {
      title: '草原牧歌',
      subtitle: '甘南藏族文化之旅',
      days: '6天5夜',
      image: '/images/caoyuan.jpg', // 替换为草原图片
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&h=1080&fit=crop')`,
            filter: 'blur(1px) brightness(0.6) sepia(0.3) saturate(1.2)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-transparent to-amber-900/60" />
        
        {/* 沙尘效果 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-200 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-orange-200 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-yellow-200 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <motion.div
          className="relative z-10 text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="writing-vertical mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="font-title text-8xl md:text-9xl font-bold mb-4 text-shadow-lg">
              墨陇行
            </h1>
            <motion.p
              className="font-body text-xl md:text-2xl text-gold-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              一笔大漠孤烟，千里陇上江南
            </motion.p>
          </motion.div>

          <motion.button
            className="btn-primary text-lg px-8 py-4 mt-8"
            onClick={scrollToNextSection}
            {...animations.button}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            展开长卷
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
          onClick={scrollToNextSection}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Quick Guide Section */}
      <section id="quick-guide" className="py-20 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-title text-4xl md:text-5xl text-ink-800 font-bold mb-4">
              快速导览
            </h2>
            <p className="font-body text-lg text-ink-600 max-w-2xl mx-auto">
              精选甘肃四大经典景区，每一处都是大自然与历史文化的完美融合
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            {...createStaggeredAnimation(0.15)}
          >
            {attractions.map((attraction, index) => (
              <motion.div
                key={attraction.name}
                className="text-center group cursor-pointer"
                {...animations.scrollReveal}
                transition={{
                  ...animations.scrollReveal.transition,
                  delay: index * 0.15
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 ink-brush">
                  <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border-4 border-amber-200">
                    <attraction.icon size={32} className="text-white" />
                  </div>
                  {/* 沙尘装饰 */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-300 rounded-full opacity-60 blur-sm group-hover:scale-150 transition-transform duration-300"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-orange-300 rounded-full opacity-40 blur-sm group-hover:scale-125 transition-transform duration-300"></div>
                </div>
                <h3 className="font-title text-xl md:text-2xl text-ink-800 font-semibold mb-2">
                  {attraction.name}
                </h3>
                <p className="font-body text-sm md:text-base text-ink-600">
                  {attraction.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Routes Section */}
      <section className="py-20 bg-ink-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-title text-4xl md:text-5xl text-ink-800 font-bold mb-4">
              精选路线
            </h2>
            <p className="font-body text-lg text-ink-600 max-w-2xl mx-auto">
              匠心设计的文化旅游路线，带您深度体验甘肃的壮美与神韵
            </p>
          </motion.div>

          <div className="relative">
            <div className="scroll-container p-8 mx-4 md:mx-8">
              <div className="flex space-x-6 overflow-x-auto scroll-mask pb-4">
                {routes.map((route, index) => (
                  <motion.div
                    key={route.title || route.name}
                    className="flex-shrink-0 w-80 card-ancient p-6"
                    initial={animations.scrollReveal.initial}
                    whileInView={animations.scrollReveal.whileInView}
                    viewport={animations.scrollReveal.viewport}
                    transition={{
                      ...animations.scrollReveal.transition,
                      delay: index * 0.2
                    }}
                    whileHover={animations.cardHover.whileHover}
                    whileTap={animations.cardHover.whileTap}
                  >
                    <div 
                      className="h-48 bg-cover bg-center rounded-lg mb-4"
                      style={{ backgroundImage: `url(${route.image})` }}
                    />
                    <h3 className="font-title text-2xl text-ink-800 font-bold mb-2">
                      {route.title || route.name}
                    </h3>
                    <p className="font-body text-ink-600 mb-4">
                      {route.name === '莫高窟'
                        ? `${route.location}｜世界文化遗产，千年石窟艺术宝库。`
                        : (route.subtitle || route.location)
                      }
                    </p>
                    <div className="flex justify-start items-center">
                      <span className="font-body text-sm text-ink-500">
                        {route.days || route.visitTime}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            {...animations.scrollReveal}
          >
            <motion.h2
              className="font-title text-4xl md:text-5xl text-ink-800 font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              开启您的甘肃文化之旅
            </motion.h2>
            <motion.p
              className="font-body text-lg text-ink-700 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              让我们一起踏上这片古老而神奇的土地，感受丝路文化的深厚底蕴
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/about">
                <motion.button
                  className="bg-ink-800 hover:bg-ink-900 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  {...animations.button}
                >
                  立即咨询
                </motion.button>
              </Link>
              <Link to="/itinerary">
                <motion.button
                  className="btn-secondary border-ink-800 text-ink-800 hover:bg-ink-800 hover:text-white"
                  {...animations.button}
                >
                  查看更多路线
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;