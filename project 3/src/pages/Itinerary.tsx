import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Calendar, Users, MapPin, Clock, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Itinerary: React.FC = () => {
  useEffect(() => {
    document.title = '精选路线 - 墨陇行甘肃旅游 | 专业设计的文化旅游路线';
  }, []);

  const [detailRoute, setDetailRoute] = useState(null);

  const routes = [
    {
      id: 1,
      title: '丝路寻梦·敦煌深度文化之旅',
      subtitle: '探寻千年石窟艺术，感受丝路文明',
      duration: '5天4夜',
      groupSize: '6-12人小团',
      season: '4-10月',
      image: '/images/mogaoku.jpg', // 莫高窟图片
      highlights: ['莫高窟专业讲解', '鸣沙山驼队体验', '敦煌夜市美食', '玉门关遗址'],
      itinerary: [
        {
          day: 1,
          title: '抵达敦煌，初识丝路文化',
          activities: ['机场接机', '入住酒店', '敦煌博物馆参观', '欢迎晚宴'],
          highlights: '了解敦煌历史背景，为后续深度游做准备',
        },
        {
          day: 2,
          title: '莫高窟艺术震撼之旅',
          activities: ['莫高窟参观', '数字展示中心', '壁画临摹体验', '素斋午餐'],
          highlights: '专业导游深度讲解，感受千年佛教艺术精髓',
        },
        {
          day: 3,
          title: '鸣沙山沙漠奇观体验',
          activities: ['骑骆驼进沙漠', '月牙泉观光', '沙漠日落摄影', '篝火晚会'],
          highlights: '体验丝路商旅生活，观赏沙漠绝美日落',
        },
        {
          day: 4,
          title: '玉门关古道探秘',
          activities: ['玉门关遗址', '汉长城遗迹', '雅丹地质公园', '特色晚餐'],
          highlights: '追溯古丝绸之路足迹，感受边塞文化',
        },
        {
          day: 5,
          title: '告别敦煌，满载而归',
          activities: ['自由活动', '购买特产', '机场送机'],
          highlights: '回味旅途精彩，带走美好回忆',
        },
      ],
    },
    {
      id: 2,
      title: '七彩丹霞·张掖地质奇观之旅',
      subtitle: '大自然的调色板，摄影师的天堂',
      duration: '4天3夜',
      groupSize: '8-15人',
      season: '5-9月',
      image: '/images/danxai.jpg', // 张掖丹霞图片
      highlights: ['七彩丹霞日出日落', '冰沟丹霞徒步', '专业摄影指导', '当地特色美食'],
      itinerary: [
        {
          day: 1,
          title: '抵达张掖，初见彩色山峦',
          activities: ['抵达张掖', '市区观光', '大佛寺参观', '当地美食体验'],
          highlights: '感受河西走廊文化，品尝张掖特色美食',
        },
        {
          day: 2,
          title: '七彩丹霞震撼之美',
          activities: ['早起观日出', '七彩丹霞游览', '摄影创作', '日落拍摄'],
          highlights: '专业摄影师指导，捕捉最美光影瞬间',
        },
        {
          day: 3,
          title: '冰沟丹霞徒步探险',
          activities: ['冰沟丹霞徒步', '地质科普', '野外午餐', '星空摄影'],
          highlights: '深入丹霞腹地，体验地质奇观魅力',
        },
        {
          day: 4,
          title: '马蹄寺石窟文化',
          activities: ['马蹄寺参观', '石窟艺术欣赏', '返程送机'],
          highlights: '领略佛教石窟文化，圆满结束旅程',
        },
      ],
    },
    {
      id: 3,
      title: '甘南秘境·藏族文化深度体验',
      subtitle: '高原净土，藏族风情浓郁之地',
      duration: '6天5夜',
      groupSize: '6-10人精品团',
      season: '6-9月',
      image: '/images/caoyuan.jpg', // 甘南草原图片
      highlights: ['拉卜楞寺朝圣', '桑科草原骑马', '藏族家访', '手工艺品制作'],
      itinerary: [
        {
          day: 1,
          title: '兰州集合，前往夏河',
          activities: ['兰州集合', '前往夏河', '拉卜楞寺初探', '藏式晚餐'],
          highlights: '进入藏区，感受宗教文化氛围',
        },
        {
          day: 2,
          title: '拉卜楞寺深度朝圣',
          activities: ['晨课体验', '寺院参观', '辩经观摩', '转经筒祈福'],
          highlights: '深入了解藏传佛教文化精髓',
        },
        {
          day: 3,
          title: '桑科草原牧歌体验',
          activities: ['草原骑马', '牧民家访', '挤牛奶体验', '篝火晚会'],
          highlights: '体验纯正的藏族牧民生活方式',
        },
        {
          day: 4,
          title: '郎木寺小瑞士风光',
          activities: ['郎木寺参观', '峡谷徒步', '民族服饰体验', '藏族歌舞'],
          highlights: '欣赏高原小镇的独特魅力',
        },
        {
          day: 5,
          title: '扎尕那石城探秘',
          activities: ['扎尕那村落', '石城探索', '民俗体验', '星空观测'],
          highlights: '探访神秘的石头城，感受原始村落之美',
        },
        {
          day: 6,
          title: '告别甘南，回到兰州',
          activities: ['返回兰州', '兰州市区游览', '送机服务'],
          highlights: '回味甘南之旅，满载文化收获',
        },
      ],
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
            精选路线
          </h1>
          <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
            精心设计的文化旅游路线，每一条线路都是对甘肃深厚文化底蕴的深度诠释，
            让您在有限的时间里获得最丰富的文化体验
          </p>
        </motion.div>

        {/* Routes Layout */}
        <div>
          {routes.map((route, index) => (
            <motion.div
              key={route.id}
              className="mb-16"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Route Card */}
                <div className="card-ancient overflow-hidden">
                  <div className="relative">
                    <img
                      src={route.image}
                      alt={route.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-title text-2xl font-bold mb-2">{route.title}</h3>
                      <p className="font-body text-gold-200">{route.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center text-ink-600">
                        <Calendar size={16} className="mr-2 text-gold-500" />
                        <span className="font-body text-sm">{route.duration}</span>
                      </div>
                      <div className="flex items-center text-ink-600">
                        <Users size={16} className="mr-2 text-gold-500" />
                        <span className="font-body text-sm">{route.groupSize}</span>
                      </div>
                      <div className="flex items-center text-ink-600">
                        <Clock size={16} className="mr-2 text-gold-500" />
                        <span className="font-body text-sm">{route.season}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-title text-lg text-ink-800 font-semibold mb-3">
                        行程亮点
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {route.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-gold-500 rounded-full mr-2"></div>
                            <span className="font-body text-sm text-ink-600">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      className="w-full flex items-center justify-center btn-secondary mb-4"
                    onClick={() => setDetailRoute(route)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    查看详细行程
                  </motion.button>

                  <Link to="/contact">
                    <motion.button
                      className="w-full btn-primary mt-4"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      立即预订
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 详细行程弹窗 */}
        {detailRoute && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="absolute top-4 right-4 text-ink-500 hover:text-gold-600"
                onClick={() => setDetailRoute(null)}
              >
                <X size={24} />
              </button>
              <img
                src={detailRoute.image}
                alt={detailRoute.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="font-title text-2xl text-ink-800 font-bold mb-2">{detailRoute.title}</h2>
              <p className="font-body text-gold-700 mb-4">{detailRoute.subtitle}</p>
              <div className="mb-4">
                <span className="font-title text-lg text-ink-800 font-semibold">行程规划：</span>
                <div className="space-y-4 mt-2">
                  {detailRoute.itinerary.map((day, idx) => (
                    <div key={idx} className="border-l-2 border-gold-200 pl-4">
                                <h5 className="font-title text-lg text-ink-800 font-semibold mb-2">
                                  第{day.day}天：{day.title}
                                </h5>
                      <p className="font-body text-sm text-gold-600 mb-2">{day.highlights}</p>
                                <div className="flex flex-wrap gap-2">
                                  {day.activities.map((activity, actIdx) => (
                                    <span
                                      key={actIdx}
                                      className="px-2 py-1 bg-slate-100 text-ink-600 font-body text-xs rounded"
                                    >
                                      {activity}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                </div>
              </div>
            </motion.div>
        </div>
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-ink-800 to-ink-900 text-white rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="font-title text-3xl font-bold mb-4">
            私人定制服务
          </h2>
          <p className="font-body text-slate-300 mb-6 max-w-2xl mx-auto">
            除了精选路线，我们还提供完全个性化的私人定制服务，
            根据您的兴趣、时间和预算，为您量身打造专属的甘肃文化之旅
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-gold-500 hover:bg-gold-600 text-ink-800 font-medium px-8 py-3 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              咨询定制
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Itinerary;