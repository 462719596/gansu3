import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, MapPin, Heart, Quote } from 'lucide-react';
import { animations, createStaggeredAnimation } from '../utils/animations';

const About: React.FC = () => {
  useEffect(() => {
    document.title = '关于我们 - 墨陇行甘肃旅游 | 专注甘肃深度文化旅游';
  }, []);

  const achievements = [
    { icon: Award, number: '100+', label: '精品路线', description: '深度设计的文化旅游路线' },
    { icon: Users, number: '5000+', label: '服务客户', description: '来自全国各地的旅行者' },
    { icon: MapPin, number: '50+', label: '合作景区', description: '甘肃省内优质旅游资源' },
    { icon: Heart, number: '99%', label: '满意度', description: '客户推荐与好评率' },
  ];



  const values = [
    {
      title: '文化传承',
      description: '深度挖掘甘肃历史文化内涵，让每一次旅行都成为文化的传承与体验',
      icon: '📜',
    },
    {
      title: '品质至上',
      description: '精选合作伙伴，严格品质把控，为客户提供高品质的旅游体验',
      icon: '⭐',
    },
    {
      title: '个性定制',
      description: '根据客户需求和兴趣，量身定制专属的甘肃文化之旅',
      icon: '🎨',
    },
    {
      title: '责任旅游',
      description: '倡导可持续旅游，保护文化遗产和自然环境',
      icon: '🌱',
    },
  ];

  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-20"
          {...animations.scrollReveal}
        >
          <h1 className="font-title text-5xl md:text-6xl text-ink-800 font-bold mb-8">
            墨陇行记
          </h1>
          <div className="max-w-4xl mx-auto">
            <div className="writing-vertical mx-auto md:mx-0 md:float-right md:ml-8 mb-8 md:mb-0">
              <div className="bg-slate-50 p-8 rounded-lg shadow-lg">
                <p className="font-body text-lg text-ink-700 leading-relaxed mb-6">
                  始于对甘肃大地的深深热爱，我们走遍陇原山川，只为寻找最authentic的文化体验。
                  从敦煌的千年石窟到张掖的七彩丹霞，从甘南的高原牧歌到嘉峪关的雄关漫道，
                  每一处风景都承载着深厚的历史文化底蕴。
                </p>
                <p className="font-body text-lg text-ink-700 leading-relaxed mb-6">
                  我们不只是旅游服务商，更是甘肃文化的传播者和守护者。
                  通过精心设计的文化旅游路线，我们希望让更多人了解并爱上这片古老而神奇的土地。
                </p>

              </div>
            </div>
          </div>
        </motion.section>

        {/* Mission Statement */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-gold-50 to-gold-100 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <Quote size={48} className="text-gold-500 mx-auto mb-4" />
              <h2 className="font-title text-3xl text-ink-800 font-bold mb-4">
                我们的使命
              </h2>
            </div>
            <blockquote className="font-body text-xl text-ink-700 text-center leading-relaxed max-w-4xl mx-auto">
              "让每一位旅行者都能深度感受甘肃的文化魅力，在旅途中收获知识、感动和成长。
              我们相信，真正的旅行不只是看风景，更是一次心灵的文化洗礼。"
            </blockquote>
            <p className="text-center font-title text-gold-600 mt-6">—— 墨陇行团队</p>
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          className="mb-20"
          {...animations.scrollReveal}
        >
          <motion.h2
            className="font-title text-4xl text-ink-800 font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            我们的成就
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            {...createStaggeredAnimation(0.1)}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center p-6 card-ancient"
                {...animations.scrollReveal}
                transition={{
                  ...animations.scrollReveal.transition,
                  delay: index * 0.1
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon size={32} className="text-white" />
                </div>
                <h3 className="font-title text-3xl text-ink-800 font-bold mb-2">
                  {achievement.number}
                </h3>
                <h4 className="font-title text-xl text-gold-600 font-semibold mb-2">
                  {achievement.label}
                </h4>
                <p className="font-body text-ink-600 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>



        {/* Values Section */}
        <motion.section
          className="mb-20"
          {...animations.scrollReveal}
        >
          <motion.h2
            className="font-title text-4xl text-ink-800 font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            我们的价值观
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            {...createStaggeredAnimation(0.15)}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-6 card-ancient"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94] as const
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <div>
                  <h3 className="font-title text-2xl text-ink-800 font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-ink-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          className="text-center p-8 bg-gradient-to-r from-ink-800 to-ink-900 text-white rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-title text-3xl font-bold mb-4">
            开启您的甘肃文化之旅
          </h2>
          <p className="font-body text-slate-300 mb-8 max-w-2xl mx-auto">
            如果您对甘肃的历史文化感兴趣，希望进行一次深度的文化体验之旅，
            欢迎联系我们，我们将为您量身定制专属的旅行方案
          </p>
          <div className="flex justify-center">
            <motion.button
              className="bg-gold-500 hover:bg-gold-600 text-ink-800 font-medium px-8 py-3 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              立即咨询
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;