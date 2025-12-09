document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 第一部分：你的雪花算法 (封装在闭包中)
    // ==========================================
    
    // 全局控制变量
    let isSnowing = false; // 初始状态由后面的 localStorage 决定
    let snowCanvasExists = false;

    // --- 以下是你原来的变量定义 ---
    const fps = 30;
    const mspf = Math.floor(1000 / fps);
    let width = window.innerWidth || document.documentElement.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight;
    let canvas;
    let context_cache;
    let particles = [];
    let lastTime = performance.now();
    let focused = true;
    let animationFrameId = null;

    // 窗口大小调整
    window.addEventListener('resize', () => {
        width = window.innerWidth || document.documentElement.clientWidth;
        height = window.innerHeight || document.documentElement.clientHeight;
        if (canvas) {
            canvas.width = width;
            canvas.height = height;
        }
    });

    // 窗口焦点监听
    window.addEventListener('focus', () => {
        if (isSnowing) {
            focused = true;
            lastTime = performance.now();
            requestSnowFrame();
        }
    });

    window.addEventListener('blur', () => {
        focused = false;
    });

    function velocity(r) { return 70 / r + 30; }

    function sine_component(h, a) { return [2 * Math.PI / h, Math.random() * a, Math.random() * 2 * Math.PI]; }

    function calc_sine(components, x) {
        let sum = 0;
        for (let i = 0; i < components.length; i++) {
            const [f, a, p] = components[i];
            sum += Math.sin(x * f + p) * a;
        }
        return sum;
    }

    function gen_particle() {
        let r = Math.random() * 4 + 1;
        return {
            radius: r,
            x: Math.random() * width,
            y: -r,
            opacity: Math.random(),
            sine_components: [sine_component(height, 3), sine_component(height / 2, 2), sine_component(height / 5, 1), sine_component(height / 10, 0.5)],
        };
    }

    function update_pos(dt) {
        const n = particles.length;
        for (let i = 0; i < n; i++) {
            const v = velocity(particles[i].radius);
            particles[i].x += calc_sine(particles[i].sine_components, particles[i].y) * v / 5 * dt;
            particles[i].y += v * dt;
            if (particles[i].y - particles[i].radius > height) {
                particles[i] = gen_particle();
            }
        }
    }

    function get_context() {
        if (context_cache) return context_cache;
        
        canvas = document.createElement('canvas');
        canvas.id = 'snow-canvas';
        canvas.width = width;
        canvas.height = height;
        canvas.style = 'position: fixed; top: 0; left: 0; overflow: hidden; pointer-events: none; z-index: 256;';
        
        // 适配 Dark Reader 插件
        if ((document.documentElement.dataset.darkreaderMode || "").startsWith('filter'))
            canvas.style.filter = 'invert(1)';
        
        document.body.appendChild(canvas);
        snowCanvasExists = true;
        context_cache = canvas.getContext('2d');
        return context_cache;
    }

    function draw() {
        const ctx = get_context();
        ctx.clearRect(0, 0, width, height);
        
        const n = particles.length;
        for (let i = 0; i < n; i++) {
            const p = particles[i];
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.shadowColor = '#80EDF7';
            ctx.shadowBlur = 7;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    function snowLoop() {
        // 如果开关关闭，或者页面失去焦点，停止循环
        if (!isSnowing || !focused) return;

        const dt = (performance.now() - lastTime) / 1000;
        
        if (particles.length < 120 && Math.random() < 0.1) {
            particles.push(gen_particle());
        }

        update_pos(dt);
        draw();

        lastTime = performance.now();
        animationFrameId = setTimeout(snowLoop, mspf);
    }

    function requestSnowFrame() {
        if (animationFrameId) clearTimeout(animationFrameId);
        snowLoop();
    }

    // --- 对外控制函数 ---

    function turnOnSnow() {
        isSnowing = true;
        // 如果画布被隐藏了，显示它
        if (canvas) canvas.style.display = 'block';
        lastTime = performance.now();
        requestSnowFrame();
    }

    function turnOffSnow() {
        isSnowing = false;
        // 隐藏画布以节省性能，或者直接 remove()
        if (canvas) canvas.style.display = 'none';
        if (animationFrameId) clearTimeout(animationFrameId);
    }

    // ==========================================
    // 第二部分：按钮 UI 逻辑 (插入到页眉)
    // ==========================================

    // 图标 SVG 定义，图标svg来自docs\images的snow-on.svg和snow-off.svg（记事本打开）
    const iconSnow = '<svg t="1765263238122" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8658" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M893.58 709.22l-83.45-48.18 53.06-35.03c9.22-6.09 11.76-18.49 5.67-27.71-6.09-9.22-18.5-11.76-27.71-5.67l-69.75 46.05-108.95-62.9-0.37-127.34 109.32-63.12 69.75 46.05c3.39 2.24 7.22 3.31 11 3.31 6.49 0 12.86-3.16 16.71-8.98 6.09-9.22 3.55-21.62-5.67-27.71l-53.06-35.03 83.45-48.18c9.57-5.52 12.84-17.75 7.32-27.32s-17.75-12.84-27.32-7.32l-83.45 48.18-3.81-63.47c-0.66-11.03-10.16-19.44-21.16-18.77-11.03 0.66-19.43 10.14-18.77 21.16l5.01 83.43-108.93 62.89L532 350.23V224l74.76-37.38c9.88-4.94 13.88-16.95 8.94-26.83-4.94-9.88-16.95-13.88-26.83-8.94L532 179.28V82.92c0-11.05-8.95-20-20-20s-20 8.95-20 20v96.36l-56.87-28.44c-9.88-4.94-21.89-0.93-26.83 8.94-4.94 9.88-0.94 21.89 8.94 26.83L492 224v125.8l-110.09 64-109.31-63.12 5.01-83.43c0.66-11.03-7.74-20.5-18.77-21.16-11.03-0.66-20.5 7.74-21.16 18.77l-3.81 63.47-83.45-48.18c-9.57-5.52-21.8-2.25-27.32 7.32s-2.25 21.8 7.32 27.32l83.45 48.18L160.81 398c-9.22 6.09-11.76 18.49-5.67 27.71 3.85 5.83 10.21 8.98 16.71 8.98 3.78 0 7.61-1.07 11-3.31l69.75-46.05 108.95 62.9 0.37 127.34-109.32 63.11-69.75-46.05c-9.22-6.08-21.62-3.55-27.71 5.67-6.09 9.22-3.55 21.62 5.67 27.71l53.06 35.03-83.45 48.18c-9.57 5.52-12.84 17.75-7.32 27.32 3.7 6.42 10.43 10 17.34 10 3.39 0 6.83-0.86 9.98-2.68l83.45-48.18 3.81 63.47c0.64 10.62 9.45 18.8 19.95 18.8 0.4 0 0.81-0.01 1.22-0.04 11.03-0.66 19.43-10.14 18.77-21.16l-5.01-83.43 108.93-62.89L492 673.77V800l-74.76 37.38c-9.88 4.94-13.88 16.95-8.94 26.83 3.5 7.01 10.57 11.06 17.9 11.06 3.01 0 6.06-0.68 8.93-2.12L492 844.72v96.36c0 11.05 8.95 20 20 20s20-8.95 20-20v-96.36l56.87 28.44c9.88 4.94 21.89 0.93 26.83-8.94 4.94-9.88 0.94-21.89-8.94-26.83L532 800V674.2l110.09-63.99 109.32 63.12-5.01 83.43c-0.66 11.03 7.74 20.5 18.77 21.16 0.41 0.02 0.81 0.04 1.22 0.04 10.5 0 19.31-8.19 19.95-18.8l3.81-63.47 83.45 48.18c3.15 1.82 6.59 2.68 9.98 2.68 6.91 0 13.63-3.59 17.34-10 5.51-9.58 2.23-21.81-7.34-27.33zM401.91 576.01l-0.37-127.36 110.08-63.99 110.46 63.33 0.37 127.36-110.08 63.99-110.46-63.33z" fill="#ffffff" p-id="8659"></path></svg>';
    const iconNoSnow = '<svg t="1765263140972" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8445" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M417.24 186.62L492 224v116.36c0 11.05 8.95 20 20 20s20-8.95 20-20V224l74.76-37.38c9.88-4.94 13.88-16.95 8.94-26.83-4.94-9.88-16.95-13.88-26.83-8.94L532 179.28V82.92c0-11.05-8.95-20-20-20s-20 8.95-20 20v96.36l-56.87-28.44c-9.88-4.94-21.89-0.93-26.83 8.94-4.94 9.89-0.94 21.9 8.94 26.84zM751.4 350.68l-108.93 62.89-69.21-39.67c-9.58-5.49-21.8-2.18-27.3 7.41-5.49 9.58-2.18 21.8 7.41 27.3l68.22 39.1-0.85 20.56c-0.46 11.04 8.12 20.35 19.16 20.81 0.28 0.01 0.56 0.02 0.84 0.02 10.66 0 19.52-8.42 19.97-19.17l0.88-21.19 109.82-63.41 69.75 46.05c3.39 2.24 7.22 3.31 11 3.31 6.49 0 12.86-3.16 16.71-8.98 6.09-9.22 3.55-21.62-5.67-27.71l-53.06-35.03 83.45-48.18c9.57-5.52 12.84-17.75 7.32-27.32s-17.75-12.84-27.32-7.32l-83.45 48.18-3.81-63.47c-0.66-11.03-10.16-19.44-21.16-18.77-11.03 0.66-19.43 10.14-18.77 21.16l5 83.43zM841.16 592.62l-43.55 28.75c-9.22 6.08-11.76 18.49-5.67 27.71 3.85 5.83 10.21 8.98 16.71 8.98 3.78 0 7.61-1.07 11-3.31L863.2 626c9.22-6.08 11.76-18.49 5.67-27.71-6.09-9.21-18.49-11.75-27.71-5.67zM912.31 884.03L139.97 111.69c-7.81-7.81-20.47-7.81-28.28 0s-7.81 20.47 0 28.28L237.61 265.9l-3.75 62.42-83.45-48.18c-9.56-5.52-21.8-2.25-27.32 7.32s-2.25 21.8 7.32 27.32l83.45 48.18-53.06 35.03c-9.22 6.09-11.76 18.49-5.67 27.71 3.85 5.83 10.21 8.98 16.71 8.98 3.78 0 7.61-1.07 11-3.31l69.75-46.05 108.95 62.9 0.37 127.34-109.31 63.12-69.75-46.05c-9.22-6.08-21.62-3.55-27.71 5.67-6.09 9.22-3.55 21.62 5.67 27.71l53.06 35.03-83.45 48.18c-9.57 5.52-12.84 17.75-7.32 27.32 3.7 6.42 10.43 10 17.34 10 3.39 0 6.83-0.86 9.98-2.68l83.45-48.18 3.81 63.47c0.64 10.62 9.45 18.8 19.95 18.8 0.4 0 0.81-0.01 1.22-0.04 11.03-0.66 19.43-10.14 18.77-21.16l-5.01-83.43 108.93-62.89L492 673.77V800l-74.76 37.38c-9.88 4.94-13.88 16.95-8.94 26.83 3.5 7.01 10.57 11.06 17.9 11.06 3.01 0 6.06-0.68 8.93-2.12L492 844.72v96.36c0 11.05 8.95 20 20 20s20-8.95 20-20v-96.36l56.87 28.44c9.88 4.94 21.89 0.93 26.83-8.94 4.94-9.88 0.94-21.89-8.94-26.83L532 800V674.2l72.04-41.87 279.99 279.99c3.91 3.91 9.02 5.86 14.14 5.86s10.24-1.95 14.14-5.86c7.82-7.82 7.82-20.48 0-28.29zM275.42 303.7l108.77 108.77-2.28 1.32-109.31-63.11 2.82-46.98z m236.95 335.64l-110.46-63.33-0.37-127.35 11.91-6.92 161.33 161.33-62.41 36.27z" fill="#ffffff" p-id="8446"></path></svg>';

    function insertSnowButton() {
        // 避免重复插入
        if (document.querySelector('.snowflake-toggle')) return;

        // 目标容器：Material MkDocs 的 Header
        const headerInner = document.querySelector('.md-header__inner');
        if (!headerInner) return;

        // 创建按钮 DOM
        const btn = document.createElement('div');
        btn.className = 'snowflake-toggle md-header__option'; 
        btn.setAttribute('title', '切换雪花特效 (Snow Toggle)');
        
        // 读取本地存储的状态 (默认为 false，不自动下雪，以免打扰用户，如果你想默认下雪改为 'true')
        let userPreference = localStorage.getItem('snow-effect') === 'true';
        
        // 设置初始图标和状态
        btn.innerHTML = userPreference ? iconSnow : iconNoSnow;
        if (userPreference) {
            turnOnSnow();
        }

        // 点击事件处理
        btn.addEventListener('click', function() {
            userPreference = !userPreference;
            localStorage.setItem('snow-effect', userPreference); // 记住选择
            
            if (userPreference) {
                btn.innerHTML = iconSnow;
                turnOnSnow();
            } else {
                btn.innerHTML = iconNoSnow;
                turnOffSnow();
            }
        });

        // --- 插入位置逻辑 ---
        // 目标：插入到搜索框 (.md-search) 或者 调色板 (.md-header__option) 的左边
        // 根据你的截图，红色框位于标题之后，搜索框之前。
        const searchBox = document.querySelector('.md-search'); 
        const palette = document.querySelector('[data-md-component="palette"]');
        
        // 优先插在搜索框前面，如果没有搜索框则插在调色板前面，都找不到就放到最后
        const targetNode = searchBox || palette;
        
        if (targetNode) {
            targetNode.parentNode.insertBefore(btn, targetNode);
        } else {
            headerInner.appendChild(btn);
        }
    }

    // 启动插入逻辑
    insertSnowButton();

    // 兼容 Instant Loading (MkDocs Material 的单页应用模式)
    // 每次页面跳转后，DOM 会重置，需要重新插入按钮
    if (typeof window.document$ !== 'undefined') {
        window.document$.subscribe(function() {
            insertSnowButton();
        });
    }
});