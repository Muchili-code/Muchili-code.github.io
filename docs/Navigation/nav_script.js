/*nav-script.js */

// --- 侧边栏逻辑 ---
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');
const svgPath = toggleBtn.querySelector('path');
if(localStorage.getItem('sidebarState') === 'collapsed') { setCollapsed(true); }

toggleBtn.addEventListener('click', () => { setCollapsed(!sidebar.classList.contains('collapsed')); });

function setCollapsed(collapse) {
    if(collapse) {
        sidebar.classList.add('collapsed');
        svgPath.setAttribute('d', 'M13 5l7 7-7 7M5 5l7 7-7 7'); 
        localStorage.setItem('sidebarState', 'collapsed');
    } else {
        sidebar.classList.remove('collapsed');
        svgPath.setAttribute('d', 'M11 19l-7-7 7-7m8 14l-7-7 7-7');
        localStorage.setItem('sidebarState', 'expanded');
    }
}

// --- 拖拽与重置逻辑 ---
const root = document.documentElement;
const resetBtn = document.getElementById('resetBtn');
const savedTop = localStorage.getItem('sidebarTop');
const savedBottom = localStorage.getItem('sidebarBottom');
if (savedTop) root.style.setProperty('--sidebar-top', savedTop);
if (savedBottom) root.style.setProperty('--sidebar-bottom', savedBottom);

function makeResizable(resizer, isTop) {
    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        function onMouseMove(e) {
            if (isTop) {
                const newTop = Math.max(70, e.clientY);
                root.style.setProperty('--sidebar-top', newTop + 'px');
            } else {
                const newBottom = Math.max(0, window.innerHeight - e.clientY);
                root.style.setProperty('--sidebar-bottom', newBottom + 'px');
            }
        }
        function onMouseUp() {
            localStorage.setItem('sidebarTop', getComputedStyle(root).getPropertyValue('--sidebar-top'));
            localStorage.setItem('sidebarBottom', getComputedStyle(root).getPropertyValue('--sidebar-bottom'));
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    });
}
makeResizable(document.getElementById('resizer-top'), true);
makeResizable(document.getElementById('resizer-bottom'), false);

resetBtn.addEventListener('click', () => {
    localStorage.removeItem('sidebarTop');
    localStorage.removeItem('sidebarBottom');
    root.style.removeProperty('--sidebar-top');
    root.style.removeProperty('--sidebar-bottom');
    resetBtn.style.transform = "rotate(-360deg)";
    setTimeout(() => resetBtn.style.transform = "none", 400);
});

// --- 平滑滚动 ---
function scrollToId(id) {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80;
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
}

// --- 底部文字渐变轮播 ---
const quotes = [
    "或许国内绝大部分大学的本科教学，不是濒临崩溃，而是早已崩溃",
    "真理无法被传授，而应在每个人自己的命运中寻得",
    "既然没有所谓的彼岸，那么每一个当下本身就是金子",
    "人不是被事情困扰，而是被对事情的看法困扰",
    "生活不可能像你想象得那么好，但也不会像你想象得那么糟"
];
let index = 0;
const textElement = document.getElementById('typing-text');
textElement.innerText = quotes[0];

setInterval(() => {
    textElement.style.opacity = 0; // 淡出
    setTimeout(() => {
        index = (index + 1) % quotes.length;
        textElement.innerText = quotes[index]; // 切换文字
        textElement.style.opacity = 1; // 淡入
    }, 800); // 必须与 CSS 中的 transition 时间一致 (0.8s)
}, 5000);

// --- 默认图标兜底 ---
const defaultIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='2' y1='12' x2='22' y2='12'%3E%3C/line%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'%3E%3C/path%3E%3C/svg%3E";
document.querySelectorAll('.icon-img').forEach(img => {
    img.onerror = function() { this.src = defaultIcon; this.onerror = null; };
    if (img.complete && img.naturalHeight === 0) { img.src = defaultIcon; }
});