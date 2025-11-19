import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, X } from 'lucide-react';
import { animations, createStaggeredAnimation } from '../utils/animations';

const Destinations: React.FC = () => {
  useEffect(() => {
    document.title = '目的地 - 墨陇行甘肃旅游 | 探索甘肃经典景点';
  }, []);

  const [selectedDestination, setSelectedDestination] = useState(null);

  const destinations = [
    {
      id: 1,
      name: '莫高窟',
      location: '敦煌市',
      description: '世界文化遗产，丝绸之路上的艺术宝库，拥有千年佛教石窟艺术',
      image: '/images/mogaoku.jpg',
      rating: 4.9,
      visitTime: '3-4小时',
      highlights: ['飞天壁画', '千佛洞', '文物陈列中心'],
    },
    {
      id: 2,
      name: '鸣沙山月牙泉',
      location: '敦煌市',
      description: '沙漠奇观，月牙形清泉与金沙山相映成趣，展现大自然的神奇造化',
      image: '/images/yueyaquan.jpg',
      rating: 4.8,
      visitTime: '2-3小时',
      highlights: ['骑骆驼', '滑沙', '沙漠日落'],
    },
    {
      id: 3,
      name: '张掖丹霞地质公园',
      location: '张掖市',
      description: '七彩斑斓的丹霞地貌，如大地调色板般绚烂，是摄影爱好者的天堂',
      image: '/images/danxai.jpg',
      rating: 4.7,
      visitTime: '半天',
      highlights: ['七彩丹霞', '冰沟丹霞', '观景台'],
    },
    {
      id: 4,
      name: '甘南草原',
      location: '甘南藏族自治州',
      description: '高原牧场风光，藏族文化浓郁，是体验藏族风情的绝佳之地',
      image: '/images/caoyuan.jpg',
      rating: 4.6,
      visitTime: '1-2天',
      highlights: ['拉卜楞寺', '桑科草原', '藏族文化'],
    },
    {
      id: 5,
      name: '嘉峪关',
      location: '嘉峪关市',
      description: '万里长城西端起点，明代军事要塞，见证古代丝绸之路的繁荣',
      image: '/images/jiayuguan.jpg',
      rating: 4.5,
      visitTime: '2-3小时',
      highlights: ['嘉峪关城楼', '长城博物馆', '古代军事文化'],
    },
    {
      id: 6,
      name: '麦积山石窟',
      location: '天水市',
      description: '中国四大石窟之一，以精美的泥塑艺术著称，被誉为"东方雕塑陈列馆"',
      image: '/images/maijishan.jpg',
      rating: 4.4,
      visitTime: '3-4小时',
      highlights: ['泥塑艺术', '石窟群', '佛教文化'],
    },
  ];

  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-title text-5xl md:text-6xl text-ink-800 font-bold mb-6">
            目的地
          </h1>
          <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
            踏遍甘肃大地，从敦煌的千年石窟到张掖的七彩丹霞，
            从甘南的高原牧歌到嘉峪关的雄关漫道，每一处都是历史与自然的完美融合
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              className="card-ancient group cursor-pointer h-full motion-element"
              {...animations.scrollReveal}
              transition={{
                ...animations.scrollReveal.transition,
                delay: index * 0.1
              }}
              {...animations.cardHover}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-title text-2xl text-white font-bold">
                    {destination.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-title text-2xl text-ink-800 font-bold">
                    {destination.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-gold-500 fill-current" />
                    <span className="font-body text-sm text-ink-600">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-ink-500 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span className="font-body text-sm">{destination.location}</span>
                  <Clock size={16} className="ml-4 mr-2" />
                  <span className="font-body text-sm">{destination.visitTime}</span>
                </div>

                <p className="font-body text-ink-600 mb-4 leading-relaxed">
                  {destination.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gold-100 text-gold-700 font-body text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <motion.button
                  className="w-full btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDestination(destination)}
                >
                  了解详情
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 详情弹窗 */}
        {selectedDestination && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            {...animations.overlay}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative motion-element"
              {...animations.modal}
            >
              <button
                className="absolute top-4 right-4 text-ink-500 hover:text-gold-600"
                onClick={() => setSelectedDestination(null)}
              >
                <X size={24} />
              </button>
              <div className="mb-4">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="font-title text-2xl text-ink-800 font-bold mb-2">
                  {selectedDestination.name}
                </h2>
                <div className="flex items-center text-ink-500 mb-2">
                  <MapPin size={16} className="mr-2" />
                  <span className="font-body text-sm">{selectedDestination.location}</span>
                  <Clock size={16} className="ml-4 mr-2" />
                  <span className="font-body text-sm">{selectedDestination.visitTime}</span>
                </div>
                <div className="flex items-center mb-2">
                  <Star size={16} className="text-gold-500 fill-current mr-1" />
                  <span className="font-body text-sm text-ink-600">{selectedDestination.rating}</span>
                </div>
                <p className="font-body text-ink-700 mb-4">
                  {selectedDestination.description}
                </p>
                <div className="mb-2">
                  <span className="font-title text-lg text-ink-800 font-semibold">特色：</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedDestination.highlights.map((h, i) => (
                      <span key={i} className="px-3 py-1 bg-gold-100 text-gold-700 font-body text-xs rounded-full">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-gold-100 to-gold-50 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="font-title text-3xl text-ink-800 font-bold mb-4">
            定制您的专属旅程
          </h2>
          <p className="font-body text-ink-600 mb-6 max-w-2xl mx-auto">
            根据您的兴趣和时间，我们为您量身定制最适合的甘肃文化之旅
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              在线咨询
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              查看精选路线
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Destinations;