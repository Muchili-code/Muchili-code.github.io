// 打字机效果

// 封装初始化逻辑
function initTyped() {
  // 检查当前页面是否存在 id="typed" 的元素，避免在其他页面报错
  const typedElement = document.querySelector('#typed');
  if (!typedElement) return;

  // 检查是否已经动态加载过脚本，避免重复加载
  if (window.Typed) {
    startTyped();
  } else {
    // 动态加载 CDN 脚本
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.0.11';
    script.onload = () => {
      startTyped();
    };
    script.onerror = (err) => {
      console.error('Error loading Typed.js:', err);
    };
    document.head.appendChild(script);
  }
}

// 执行打字机效果的具体配置
function startTyped() {
  // 销毁旧实例（防止页面切换导致重复光标）
  if (window.typedInstance) {
    window.typedInstance.destroy();
  }
  
  const options = {
    strings: ['欢迎来到 Muchili 的笔记本~'],
    typeSpeed: 50,
    startDelay: 300,
    loop: false,
  };
  
  // 保存实例以便后续销毁
  window.typedInstance = new Typed('#typed', options);
}

// --- 核心修复：确保 DOM 加载后再执行 ---

// 1. 针对普通加载 (Standard Loading)
document.addEventListener("DOMContentLoaded", function() {
  initTyped();
});

// 2. 针对 MkDocs Material "Instant Loading" (SPA 模式)
// 如果你使用了 material 主题的 navigation.instant，需要订阅 location 变化
if (typeof document$ !== "undefined") {
  document$.subscribe(function() {
    initTyped();
  });
}