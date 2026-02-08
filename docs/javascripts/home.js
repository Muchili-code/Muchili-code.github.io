document.addEventListener("DOMContentLoaded", function () {
  
    // ============================================
    // 0. 初始化变量
    // ============================================
    const heroBg = document.getElementById("heroBg");
    const heroContent = document.getElementById("heroContent");
    const header = document.querySelector(".md-header");
    // 适配 MkDocs Material 的 Tabs 导航栏（如果有）
    const tabs = document.querySelector(".md-tabs"); 
    let ticking = false;

    // 只有在首页且存在 hero 元素时才执行
    const isHomePage = document.querySelector(".mdx-hero");

    // ============================================
    // 1. 导航栏透明控制 (核心逻辑)
    // ============================================
    function updateHeaderStyle() {
        if (!isHomePage || !header) return;

        const scrollY = window.scrollY;
        // 阈值：滚动超过 50px 就开始变色，避免一直透明导致看不清内容
        const threshold = 50; 

        if (scrollY < threshold) {
            // 在顶部：添加透明类
            header.classList.add("transparent-header");
            if (tabs) tabs.classList.add("transparent-header");
            // 移除阴影
            header.style.boxShadow = "none";
        } else {
            // 滚下来了：移除透明类，恢复默认样式
            header.classList.remove("transparent-header");
            if (tabs) tabs.classList.remove("transparent-header");
            // 恢复阴影（可选）
            header.style.removeProperty("box-shadow");
        }
    }

    // 初始化执行一次
    if (isHomePage) {
        header.classList.add("transparent-header");
        if (tabs) tabs.classList.add("transparent-header");
    }

    // ============================================
    // 2. 视差滚动逻辑
    // ============================================
    function updateParallax() {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // 更新导航栏状态
      updateHeaderStyle();
  
      // 只有在首屏附近才计算动画
      if (scrollY < heroHeight * 1.5) {
        
        const progress = scrollY / heroHeight;
  
        // --- 背景图效果 ---
        if (heroBg) {
            // 放大效果：1 -> 1.1 (稍微放大一点点即可)
            const scaleValue = 1 + (progress * 0.1); 
            
            // 位移效果：向上移动 (负值)
            // 浅色模式下，我们希望它被这一层“白纸”盖住，所以让它移动慢一点，
            // 这样“白纸”滚上来的时候就能自然覆盖它。
            const translateValue = -(scrollY * 0.3); 
            
            // 透明度：
            // 深色模式：配合 CSS mask-image，这里可以不用动透明度，或者动得很慢
            // 浅色模式：也可以不用动，因为会被盖住。
            // 为了统一效果，我们让它滚到一半时开始稍微变淡
            const opacityValue = 1 - (progress * 0.8);
            
            heroBg.style.transform = `translate3d(0, ${translateValue}px, 0) scale(${scaleValue})`;
            heroBg.style.opacity = Math.max(0, opacityValue);
        }
  
        // --- 文字效果 ---
        if (heroContent) {
            // 文字飞得快一点
            const textTranslate = -(scrollY * 0.5); 
            const textOpacity = 1 - (progress * 2.0);
            
            heroContent.style.transform = `translate3d(0, ${textTranslate}px, 0)`;
            heroContent.style.opacity = Math.max(0, textOpacity);
        }
      }
      
      ticking = false;
    }
  
    // ============================================
    // 3. 事件监听
    // ============================================
    if (isHomePage) {
        window.addEventListener("scroll", function () {
          if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
          }
        });
        // 初始运行
        updateParallax();
    }

    // ============================================
    // 4. 内容块渐显 (Staggered Animation)
    // ============================================
    const contentWrapper = document.querySelector(".content-wrapper");
    if (contentWrapper) {
        // 选取需要动画的元素
        const children = contentWrapper.querySelectorAll(".grid, h2, h3, p, ul, .admonition");
        
        children.forEach((child) => {
            child.classList.add("scroll-animate-item");
        });
  
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  
        children.forEach((child, index) => {
            // 延迟逻辑
            const delay = (index % 10) * 0.1; 
            child.style.transitionDelay = `${delay}s`;
            observer.observe(child);
        });
    }

    // 平滑滚动修正
    const scrollLink = document.querySelector('a[href="#start-content"]');
    if (scrollLink) {
        scrollLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector("#start-content");
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});