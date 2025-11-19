import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Heart } from 'lucide-react';
import { animations, createStaggeredAnimation } from '../utils/animations';

const Gallery: React.FC = () => {
  useEffect(() => {
    document.title = '画卷长廊 - 墨陇行甘肃旅游 | 甘肃风光摄影作品集';
  }, []);

  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const [showGuide, setShowGuide] = useState(false);

  const images = [
    {
      id: 1,
      src: '/images/mogaoku.jpg',
      title: '莫高窟晨光',
      category: 'culture',
      description: '朝阳洒在千年石窟上，诉说着丝路文明的辉煌',
      photographer: '李明',
      location: '敦煌莫高窟',
    },
    {
      id: 2,
      src: '/images/yueyaquan.jpg',
      title: '月牙泉倒影',
      category: 'landscape',
      description: '沙漠中的奇迹，月牙泉如镜般倒映着蓝天白云',
      photographer: '张华',
      location: '敦煌鸣沙山',
    },
    {
      id: 3,
      src: '/images/danxai.jpg',
      title: '七彩丹霞日落',
      category: 'landscape',
      description: '夕阳西下，丹霞地貌如上帝的调色板般绚烂',
      photographer: '王磊',
      location: '张掖丹霞地质公园',
    },
    {
      id: 4,
      src: '/images/caoyuan.jpg',
      title: '甘南草原牧歌',
      category: 'culture',
      description: '高原牧场上，藏族牧民与牦牛的和谐画面',
      photographer: '措姆',
      location: '甘南桑科草原',
    },
    {
      id: 5,
      src: '/images/jiayuguan.jpg',
      title: '嘉峪关雄姿',
      category: 'culture',
      description: '万里长城西端起点，见证着古代边塞的壮烈',
      photographer: '刘强',
      location: '嘉峪关',
    },
    {
      id: 6,
      src: '/images/maijishan.jpg',
      title: '麦积山石窟',
      category: 'culture',
      description: '东方雕塑陈列馆，精美的泥塑艺术令人叹为观止',
      photographer: '陈梅',
      location: '天水麦积山',
    },
    {
      id: 7,
      src: '/images/qilianshan.jpeg',
      title: '祁连山雪峰',
      category: 'landscape',
      description: '皑皑雪山映衬着蓝天，展现大自然的雄壮美',
      photographer: '赵云',
      location: '祁连山脉',
    },
    {
      id: 8,
      src: '/images/zhuanjing.jpeg',
      title: '拉卜楞寺转经',
      category: 'culture',
      description: '虔诚的朝圣者转动经筒，传承着千年的信仰',
      photographer: '扎西',
      location: '夏河拉卜楞寺',
    },
    {
      id: 9,
      src: '/images/haunghe.jpeg',
      title: '黄河石林',
      category: 'landscape',
      description: '黄河九曲，石林奇峰，大自然的鬼斧神工',
      photographer: '马晓东',
      location: '白银黄河石林',
    },
  ];

  const categories = [
    { key: 'all', label: '全部作品' },
    { key: 'landscape', label: '自然风光' },
    { key: 'culture', label: '人文景观' },
  ];

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  const openLightbox = (image: any) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

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
            画卷长廊
          </h1>
          <p className="font-body text-xl text-ink-600 max-w-3xl mx-auto leading-relaxed">
            用镜头记录甘肃大地的壮美瞬间，每一幅作品都是对这片土地深深的热爱与敬意。
            在这里，自然风光与人文景观交相辉映，诉说着千年丝路的动人故事
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-full shadow-lg p-2">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`px-6 py-3 rounded-full font-body transition-all duration-300 ${
                  filter === category.key
                    ? 'bg-gold-500 text-white shadow-md'
                    : 'text-ink-600 hover:text-gold-600'
                }`}
                onClick={() => setFilter(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="break-inside-avoid cursor-pointer group motion-element"
              {...animations.scrollReveal}
              transition={{
                ...animations.scrollReveal.transition,
                delay: index * 0.08
              }}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              onClick={() => openLightbox(image)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Scroll Frame Effect */}
                <div className="relative bg-gradient-to-br from-amber-100 to-amber-50 p-4">
                  <div className="relative overflow-hidden rounded">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-title text-lg font-bold mb-1">
                        {image.title}
                      </h3>
                      <p className="font-body text-sm text-gold-200">
                        {image.location}
                      </p>
                    </div>
                  </div>
                  
                  {/* Traditional Frame Decoration */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-amber-800"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-amber-800"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-amber-800"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-amber-800"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              {...animations.overlay}
              onClick={closeLightbox}
            >
              <motion.div
                className="relative max-w-5xl max-h-full bg-white rounded-lg overflow-hidden motion-element"
                {...animations.modal}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                  onClick={closeLightbox}
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col lg:flex-row">
                  <div className="flex-1">
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      className="w-full h-auto max-h-[70vh] object-contain"
                    />
                  </div>
                  
                  <div className="lg:w-80 p-6 bg-slate-50">
                    <h3 className="font-title text-2xl text-ink-800 font-bold mb-4">
                      {selectedImage.title}
                    </h3>
                    <p className="font-body text-ink-600 mb-4 leading-relaxed">
                      {selectedImage.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-ink-500">
                        <span className="font-body text-sm font-medium w-16">摄影师:</span>
                        <span className="font-body text-sm">{selectedImage.photographer}</span>
                      </div>
                      <div className="flex items-center text-ink-500">
                        <span className="font-body text-sm font-medium w-16">地点:</span>
                        <span className="font-body text-sm">{selectedImage.location}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <motion.button
                        className="flex-1 flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-white py-2 px-4 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Download size={16} className="mr-2" />
                        下载
                      </motion.button>
                      <motion.button
                        className="flex items-center justify-center bg-slate-200 hover:bg-slate-300 text-ink-600 py-2 px-4 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Share2 size={16} />
                      </motion.button>
                      <motion.button
                        className="flex items-center justify-center bg-slate-200 hover:bg-slate-300 text-ink-600 py-2 px-4 rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Heart size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16 p-8 bg-gradient-to-r from-gold-100 to-gold-50 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className="font-title text-3xl text-ink-800 font-bold mb-4">
            分享您的甘肃印象
          </h2>
          <p className="font-body text-ink-600 mb-6 max-w-2xl mx-auto">
            如果您也有精彩的甘肃旅行照片，欢迎投稿到我们的画卷长廊，
            与更多旅行者分享您眼中的甘肃之美
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGuide(true)}
            >
              摄影指南
            </motion.button>
          </div>
        </motion.div>
        {/* 摄影指南弹窗 */}
        <AnimatePresence>
          {showGuide && (
            <motion.div
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGuide(false)}
            >
              <motion.div
                className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-8 relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-ink-500 hover:text-gold-600"
                  onClick={() => setShowGuide(false)}
                >
                  <X size={24} />
                </button>
                <h2 className="font-title text-2xl text-ink-800 font-bold mb-4">甘肃旅行摄影指南</h2>
                <ul className="list-disc pl-6 font-body text-ink-700 space-y-2 text-base">
                  <li>黄金时段拍摄：清晨和傍晚的光线最柔和，适合拍摄丹霞、草原、沙漠等自然风光。</li>
                  <li>带广角和长焦镜头：广角适合大场景，长焦可捕捉细节和远处的山川。</li>
                  <li>注意防尘防风：沙漠和草原风大，建议携带镜头保护套和清洁工具。</li>
                  <li>尊重当地文化：拍摄人文时请先征得同意，尊重少数民族风俗。</li>
                  <li>善用前景和线条：利用道路、河流、植被等元素增强画面层次感。</li>
                  <li>多尝试夜景和星空：甘肃部分地区光污染少，是拍摄星空的好地方。</li>
                  <li>随身携带备用电池和存储卡：户外拍摄时间长，做好充足准备。</li>
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;