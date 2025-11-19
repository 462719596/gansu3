// 简化的动画配置，避免复杂的性能检测
const optimizedConfig = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
  stagger: 0.1,
  enabled: true
};

// 全局动画配置
export const animations = {
  // 页面进入动画
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const // cubic-bezier for smooth easing
    }
  },

  // 页面过渡动画
  pageTransition: {
    type: "tween" as const,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
    duration: 0.6
  },

  // 滚动进入动画
  scrollReveal: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: {
      duration: optimizedConfig.duration,
      ease: optimizedConfig.ease
    }
  },

  // 卡片悬停动画
  cardHover: {
    whileHover: {
      y: -8,
      scale: 1.02
    },
    whileTap: {
      scale: 0.98
    },
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },

  // 按钮动画
  button: {
    whileHover: {
      scale: 1.05
    },
    whileTap: {
      scale: 0.95
    },
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },

  // 图片缩放动画
  imageScale: {
    whileHover: {
      scale: 1.1
    },
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },

  // 淡入动画
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },

  // 从左侧滑入
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },

  // 从右侧滑入
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },

  // 弹窗动画
  modal: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },

  // 遮罩动画
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },

  // 交错动画
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // 列表项动画
  listItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },

  // 浮动动画
  float: {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // 旋转动画
  rotate: {
    whileHover: {
      rotate: 360,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  }
};

// 动画变体组合器
export const createStaggeredAnimation = (delay = 0.1) => ({
  animate: {
    transition: {
      staggerChildren: optimizedConfig.enabled ? delay : 0,
      delayChildren: optimizedConfig.enabled ? 0.2 : 0
    }
  }
});

// 创建延迟动画
export const createDelayedAnimation = (delay = 0) => ({
  ...animations.scrollReveal,
  transition: {
    ...animations.scrollReveal.transition,
    delay
  }
});

// 创建自定义缓动函数
export const easings = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
  sharp: [0.4, 0, 0.2, 1],
  gentle: [0.25, 0.1, 0.25, 1]
};
