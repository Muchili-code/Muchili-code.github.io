// docs/js/typed_init.js

function initTyped() {
  // 1. 判断元素是否存在，防止报错
  if (!document.getElementById("typed")) return;

  // 2. 销毁旧实例（防止页面切换后出现光标重叠）
  if (window.typedInstance) {
    window.typedInstance.destroy();
  }

  // 3. 初始化
  var options = {
    strings: ['欢迎来到 Muchili 的笔记本~'],
    typeSpeed: 50,
    startDelay: 300,
    loop: false,
  };
  
  // 赋值给全局变量，方便销毁
  window.typedInstance = new Typed('#typed', options);
}

// 适配 MkDocs Material 的即时加载 (Instant Loading)
// 当页面跳转时触发
if (typeof document$ !== "undefined") {
    document$.subscribe(function() {
        initTyped();
    })
}

// 首次加载触发 (兼容普通加载)
document.addEventListener("DOMContentLoaded", function() {
    initTyped();
});