---
hide:
  - navigation
  - toc
  - feedback
---

<style>
  /* 屏蔽全局雪花特效
  body > canvas { display: none !important; } */

  /* 基础 MkDocs 样式重置 */
  .md-content__inner > h1 { display: none; }
  .md-content { padding: 0 !important; max-width: 100% !important; }
  .md-grid { max-width: 100% !important; margin: 0 !important; }

  /* --- 变量定义 --- */
  :root {
      --page-bg: #f2f3f5;
      --text-main: #1d1d1f;
      --text-sub: #86868b;
      --sidebar-width: 160px;
      --sidebar-collapsed-width: 68px;
      --sidebar-top: 150px;
      --sidebar-bottom: 40px;
      --sidebar-bg: rgba(255, 255, 255, 0.75);
      --sidebar-hover: rgba(0, 0, 0, 0.05);
      --sidebar-active-bg: #007aff;
      --sidebar-active-text: #ffffff;
      --section-box-bg: rgba(255, 255, 255, 0.6);
      --card-bg: #ffffff;
      --card-border: rgba(0, 0, 0, 0.05);
  }

  [data-md-color-scheme="slate"] {
      --page-bg: transparent;
      --text-main: #f5f5f7;
      --text-sub: #a1a1a6;
      --sidebar-bg: rgba(30, 30, 35, 0.5);
      --sidebar-hover: rgba(255, 255, 255, 0.1);
      --sidebar-active-bg: #0a84ff;
      --section-box-bg: rgba(44, 44, 46, 0.4);
      --card-bg: rgba(44, 44, 46, 0.6);
      --card-border: rgba(255, 255, 255, 0.1);
  }

  .nav-page-wrapper { position: relative; min-height: 100vh; background-color: var(--page-bg); color: var(--text-main); font-family: -apple-system, system-ui, sans-serif; padding-top: 20px; }
  [data-md-color-scheme="slate"] .nav-page-wrapper { background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%); }
   /*强制隐藏侧边栏 (覆盖 custom.css 的 display: block) */
   @media screen and (min-width: 768px) and (max-width: 1219px) { .md-sidebar--primary, .md-sidebar--secondary { display: none !important; } }

  /* --- 侧边栏样式 --- */
  .nav-sidebar { position: fixed; left: 15px; width: var(--sidebar-width); top: var(--sidebar-top); bottom: var(--sidebar-bottom); background: var(--sidebar-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 24px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); z-index: 100; padding: 10px 8px; display: flex; flex-direction: column; transition: width 0.3s ease; overflow: hidden; border: 1px solid var(--card-border); user-select: none; }
  .nav-sidebar.collapsed { width: var(--sidebar-collapsed-width); }

  .resizer { position: absolute; left: 0; width: 100%; height: 10px; cursor: ns-resize; z-index: 101; opacity: 0; transition: opacity 0.2s; }
  .resizer:hover { opacity: 1; background: rgba(128, 128, 128, 0.2); }
  .resizer.top { top: 0; } .resizer.bottom { bottom: 0; }

  .sidebar-menu { flex: 1; overflow-y: auto; overflow-x: hidden; margin: 5px 0; padding-top: 5px; }
  .sidebar-menu::-webkit-scrollbar { width: 4px; }
  .sidebar-menu::-webkit-scrollbar-thumb { background: rgba(128, 128, 128, 0.3); border-radius: 4px; }

  .sidebar-item { display: flex; align-items: center; padding: 10px 10px; margin-bottom: 4px; border-radius: 12px; color: var(--text-main); cursor: pointer; transition: background 0.2s; }
  .sidebar-item:hover { background-color: var(--sidebar-hover); }
  .sidebar-icon { font-size: 18px; width: 24px; text-align: center; margin-right: 10px; flex-shrink: 0; }
  .sidebar-text { font-size: 13px; font-weight: 500; white-space: nowrap; opacity: 1; transition: opacity 0.2s; }
  .nav-sidebar.collapsed .sidebar-text { display: none; }

  .sidebar-footer { border-top: 1px solid var(--card-border); padding-top: 5px; flex-shrink: 0; display: flex; gap: 5px; }
  .footer-btn { flex: 1; background: transparent; border: none; cursor: pointer; color: var(--text-sub); padding: 8px 0; border-radius: 8px; display: flex; justify-content: center; align-items: center; transition: background 0.2s; }
  .footer-btn:hover { background: var(--sidebar-hover); color: var(--text-main); }

  /* --- 主内容样式 --- */
  .nav-main { margin-left: calc(var(--sidebar-width) + 30px); margin-right: 20px; padding-bottom: 80px; transition: margin-left 0.3s ease; }
  .nav-sidebar.collapsed ~ .nav-main { margin-left: calc(var(--sidebar-collapsed-width) + 30px); }

  .header-area { text-align: center; margin-bottom: 50px; }
  .main-title { font-size: 32px; font-weight: 800; margin-bottom: 15px; }

  .category-box { background: var(--section-box-bg); backdrop-filter: blur(10px); border-radius: 24px; padding: 25px; margin-bottom: 30px; border: 1px solid var(--card-border);content-visibility: auto; contain-intrinsic-size: 1px 300px; /* 预估一个高度，防止滚动条抽搐 */ }
  .category-title { font-size: 18px; font-weight: 700; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; padding-left: 5px; scroll-margin-top: 100px; }
  .grid-wrapper { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; }

  /* 卡片 */
  .nav-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 14px; padding: 12px 8px; display: flex; flex-direction: column; align-items: center; text-align: center; text-decoration: none !important; color: var(--text-main) !important; transition: transform 0.2s, box-shadow 0.2s; overflow: hidden; }
  .nav-card:hover { transform: translateY(-3px); box-shadow: 0 8px 16px rgba(0,0,0,0.15); }
  .nav-card .icon-img { width: 32px; height: 32px; margin-bottom: 8px; border-radius: 6px; object-fit: contain; background: white; padding: 2px; }
  .nav-card .title { font-size: 13px; font-weight: 600; margin-bottom: 2px; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
  .nav-card .desc { font-size: 10px; color: var(--text-sub); opacity: 0.8; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}

  /* --- 底部文字渐变动画 --- */
  .footer-quote { 
      text-align: center; 
      color: var(--text-sub); 
      font-size: 13px; 
      margin-top: 30px; 
      opacity: 0.7; 
      min-height: 20px; /* 防止文字切换时高度塌陷 */
  }

  /* 关键修复：添加过渡效果 */
  #typing-text { 
      transition: opacity 0.8s ease-in-out; 
      opacity: 1;
  }

  @media screen and (max-width: 768px) { 
      .nav-sidebar { left: 5px; width: 60px; top: 80px; bottom: 80px; } 
      .nav-sidebar .sidebar-text { display: none; } 
      .resizer { display: none; } 
      .nav-main { margin-left: 70px; margin-right: 10px; } 
      .sidebar-footer { display: none; } 
  }
</style>

<div class="nav-page-wrapper">
  <div id="stars"></div><div id="stars2"></div><div id="stars3"></div>
  <nav id="sidebar" class="nav-sidebar">
      <div id="resizer-top" class="resizer top"></div>
      <div class="sidebar-menu">
          <a onclick="scrollToId('cat-ai')" class="sidebar-item"><span class="sidebar-icon">🤖</span><span class="sidebar-text">AI 工具</span></a>
          <a onclick="scrollToId('cat-tools')" class="sidebar-item"><span class="sidebar-icon">🛠</span><span class="sidebar-text">工具集合</span></a>
          <a onclick="scrollToId('cat-study')" class="sidebar-item"><span class="sidebar-icon">📖</span><span class="sidebar-text">学习资源</span></a>
          <a onclick="scrollToId('cat-cs')" class="sidebar-item"><span class="sidebar-icon">💻</span><span class="sidebar-text">计算机学习</span></a>
          <a onclick="scrollToId('cat-research')" class="sidebar-item"><span class="sidebar-icon">🔬</span><span class="sidebar-text">科研相关</span></a>
          <a onclick="scrollToId('cat-teach')" class="sidebar-item"><span class="sidebar-icon">📚</span><span class="sidebar-text">教学管理</span></a>
          <a onclick="scrollToId('cat-info')" class="sidebar-item"><span class="sidebar-icon">📡</span><span class="sidebar-text">信息服务</span></a>
          <a onclick="scrollToId('cat-zju-other')" class="sidebar-item"><span class="sidebar-icon">🏫</span><span class="sidebar-text">浙大 · 其他</span></a>
          <a onclick="scrollToId('cat-editor')" class="sidebar-item"><span class="sidebar-icon">📝</span><span class="sidebar-text">编辑器教学</span></a>
          <a onclick="scrollToId('cat-my')" class="sidebar-item"><span class="sidebar-icon">🏠</span><span class="sidebar-text">我的站点</span></a>
      </div>
      <div id="resizer-bottom" class="resizer bottom"></div>
      <div class="sidebar-footer">
          <button id="resetBtn" class="footer-btn" title="恢复"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg></button>
          <button id="toggleBtn" class="footer-btn" title="折叠"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg></button>
      </div>
  </nav>
  <main class="nav-main">
      <div class="header-area">
          <div class="main-title">我的导航站</div>
          <div style="font-size: 18px; color: var(--text-sub);">
              优绩主义挥舞着鞭子，驱使我去追赶每一个领域的领跑者。<br>
              <span style="font-size: 0.8em; opacity: 0.8;">而漫无目的的奔忙，结局注定是平庸与疲惫。</span>
          </div>
      </div>
      <div id="cat-ai" class="category-box">
          <div class="category-title">🤖 AI 工具</div>
          <div class="grid-wrapper">
              <a href="https://gemini.google.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/Gemini.png" onerror="this.src='default.svg'"><div class="title">Gemini</div><div class="desc">Google AI</div></a>
              <a href="https://aistudio.google.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/AI Studio.png" onerror="this.src='default.svg'"><div class="title">AI Studio</div><div class="desc">Google Dev</div></a>
              <a href="https://chatgpt.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/ChatGPT.svg" onerror="this.src='default.svg'"><div class="title">ChatGPT</div><div class="desc">OpenAI</div></a>
              <a href="https://claude.ai/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/Claude.png" onerror="this.src='default.svg'"><div class="title">Claude</div><div class="desc">Anthropic</div></a>
              <a href="https://tongyi.aliyun.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/qwen.svg" onerror="this.src='default.svg'"><div class="title">千问系列</div><div class="desc">Aliyun</div></a>
              <a href="https://www.deepseek.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/DeepSeek.png" onerror="this.src='default.svg'"><div class="title">DeepSeek</div><div class="desc">深度求索</div></a>
              <a href="https://www.doubao.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/豆包.png" onerror="this.src='default.svg'"><div class="title">豆包</div><div class="desc">字节跳动</div></a>
              <a href="https://kimi.moonshot.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/Kimi.png" onerror="this.src='default.svg'"><div class="title">Kimi</div><div class="desc">Moonshot Al</div></a>
              <a href="https://yuanbao.tencent.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/腾讯元宝.png" onerror="this.src='default.svg'"><div class="title">腾讯元宝</div><div class="desc">Tecent</div></a>
              <a href="https://chat.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/浙大先生.png" onerror="this.src='default.svg'"><div class="title">浙大先生</div><div class="desc">ZJU官方结合ds推出</div></a>
              <a href="https://www.zchat.tech/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/Zhcat.png" onerror="this.src='default.svg'"><div class="title">Zchat</div><div class="desc">zju学生自建的AI集合</div></a>
              <a href="https://api.chatanywhere.tech/#/shop" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/ChatAnyWhere.png" onerror="this.src='default.svg'"><div class="title">ChatAnyWhere</div><div class="desc">api站点</div></a>
             <a href="https://api2.aigcbest.top/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/钱多多API.png" onerror="this.src='default.svg'"><div class="title">钱多多API</div><div class="desc">api站点</div></a> 
          </div>
      </div>
      <div id="cat-tools" class="category-box">
          <div class="category-title">🛠 工具集合</div>
          <div class="grid-wrapper">
              <a href="https://zjuers.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/zjuers轻首页.png" onerror="this.src='default.svg'"><div class="title">轻首页</div><div class="desc">zjuers的轻首页</div></a>
              <a href="https://zjuers.jiepeng.tech/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/zjuers轻首页.png" onerror="this.src='default.svg'"><div class="title">轻首页自定义版</div><div class="desc">自定义版的轻首页</div></a>
              <a href="https://www.tboxn.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/Tbox导航.png" onerror="this.src='default.svg'"><div class="title">Tbox导航</div><div class="desc">工具导航</div></a>
              <a href="https://www.pangmenzd.vip/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/旁门左道PPT.png" onerror="this.src='default.svg'"><div class="title">旁门左道PPT</div><div class="desc">PPT资源</div></a>
              <a href="https://www.goto-mars.com/people/aLYqyNvYvd" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/个人导航.png" onerror="this.src='default.svg'"><div class="title">旁门-个人导航</div><div class="desc">旁门左道的个人导航</div></a>
              <a href="https://www.maxiaobang.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/马小帮.png" onerror="this.src='default.svg'"><div class="title">马小帮</div><div class="desc">效率工具</div></a>
              <a href="https://www.it168.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/IT技术之家.png" onerror="this.src='default.svg'"><div class="title">IT技术之家</div><div class="desc">技术资讯</div></a>
              <a href="https://www.fc8.top/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/FC8软件库.png" onerror="this.src='default.svg'"><div class="title">FC8软件库</div><div class="desc">资源下载</div></a>
              <a href="https://woobx.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/一个木函.png" onerror="this.src='default.svg'"><div class="title">一个木函</div><div class="desc">多功能工具</div></a>
              <a href="https://www.tudingyy.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/图钉办公.png" onerror="this.src='default.svg'"><div class="title">图钉办公</div><div class="desc">办公助手</div></a>
          </div>
      </div>
      <div id="cat-study" class="category-box">
          <div class="category-title">📖 学习资源</div>
          <div class="grid-wrapper">
            <a href="https://search.bilibili.com/all?vt=76243560" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/bilibili.png" onerror="this.src='default.svg'"><div class="title">Bibilli搜索版</div><div class="desc">仅搜索引擎的b站</div></a>
              <a href="https://www.cc98.org/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/cc98-1.png" onerror="this.src='default.svg'"><div class="title">CC98</div><div class="desc">ZJUers的校内论坛</div></a>
              <a href="https://qsct.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/课程攻略.png" onerror="this.src='default.svg'"><div class="title">课程攻略</div><div class="desc">浙大课程攻略共享计划</div></a>
              <a href="https://fanyi.baidu.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/百度翻译.png" onerror="this.src='default.svg'"><div class="title">百度翻译</div><div class="desc">在线翻译</div></a>
              <a href="https://translate.google.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/谷歌翻译.svg" onerror="this.src='default.svg'"><div class="title">谷歌翻译</div><div class="desc">谷歌翻译网站</div></a>
              <a href="https://z-library.ec" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/Zlibrary.png" onerror="this.src='default.svg'"><div class="title">Zlibrary</div><div class="desc">电子书库</div></a>
          </div>
      </div>
      <div id="cat-cs" class="category-box">
          <div class="category-title">💻 计算机学习</div>
          <div class="grid-wrapper">
              <a href="https://github.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/GitHub.png" onerror="this.src='default.svg'"><div class="title">GitHub</div><div class="desc">全球最大计算机平台</div></a>
              <a href="https://www.github-zh.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/GitHub CN.png" onerror="this.src='default.svg'"><div class="title">GitHub CN</div><div class="desc">GitHub的中文社区</div></a>
              <a href="https://www.runoob.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/菜鸟教程.png" onerror="this.src='default.svg'"><div class="title">菜鸟教程</div><div class="desc">基础技术教程</div></a>
              <a href="https://www.w3schools.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/W3Schools.png" onerror="this.src='default.svg'"><div class="title">W3Schools</div><div class="desc">Web开发教程</div></a>
              <a href="https://csdiy.wiki/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/CS自学指南.png" onerror="this.src='default.svg'"><div class="title">CS自学指南</div><div class="desc">自学百科全书</div></a>
              <a href="https://csguide.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/编程指北.png" onerror="this.src='default.svg'"><div class="title">编程指北</div><div class="desc">校招/路线图</div></a>
              <a href="https://subingwen.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/爱编程的大丙.png" onerror="this.src='default.svg'"><div class="title">爱编程的大丙</div><div class="desc">C++/Linux</div></a>
              <a href="https://www.hello-algo.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/Hello 算法.png" onerror="this.src='default.svg'"><div class="title">Hello 算法</div><div class="desc">动画图解算法</div></a>
              <a href="https://space.bilibili.com/95228778?spm_id_from=333.788.upinfo.head.click" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/王道操作系统.png" onerror="this.src='default.svg'"><div class="title">王道操作系统</div><div class="desc">BiliBili资源</div></a>
          </div>
      </div>
      <div id="cat-research" class="category-box">
          <div class="category-title">🔬 科研相关</div>
          <div class="grid-wrapper">
              <a href="https://scholar.google.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/谷歌学术.png" onerror="this.src='default.svg'"><div class="title">谷歌学术</div><div class="desc">Google Scholar</div></a>
              <a href="http://cqvip.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/维普网.png" onerror="this.src='default.svg'"><div class="title">维普网</div><div class="desc">期刊论文</div></a>
              <a href="https://cn.bing.com/academic" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/必应学术.png" onerror="this.src='default.svg'"><div class="title">必应学术</div><div class="desc">Bing Scholar</div></a>
              <a href="https://www.iresearch.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/爱学术.png" onerror="this.src='default.svg'"><div class="title">爱学术</div><div class="desc">学术导航</div></a>
              <a href="https://www.webofscience.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/WOS.png" onerror="this.src='default.svg'"><div class="title">WOS</div><div class="desc">SCI检索</div></a>
              <a href="https://www.cnki.net/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/中国知网.png" onerror="this.src='default.svg'"><div class="title">中国知网</div><div class="desc">中文文献</div></a>
              <a href="https://xueshu.baidu.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/百度学术.png" onerror="this.src='default.svg'"><div class="title">百度学术</div><div class="desc">文献搜索</div></a>
              <a href="https://www.wanfangdata.com.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/万方数据.png" onerror="this.src='default.svg'"><div class="title">万方数据</div><div class="desc">学术期刊</div></a>
              <a href="https://sci-hub.se/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/Sci-Hub.png" onerror="this.src='default.svg'"><div class="title">Sci-Hub</div><div class="desc">文献下载</div></a>
          </div>
      </div>
      <div id="cat-teach" class="category-box">
          <div class="category-title">📚 教学管理</div>
          <div class="grid-wrapper">
              <a href="https://courses.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/学在浙大.png" onerror="this.src='default.svg'"><div class="title">学在浙大</div><div class="desc">课程平台</div></a>
              <a href="https://zdbk.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/zju.png" onerror="this.src='default.svg'"><div class="title">教务网</div><div class="desc">教学管理相关的网站</div></a>
              <a href="https://sztz.zju.edu.cn/dekt/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/素质拓展.png" onerror="this.src='default.svg'"><div class="title">素质拓展</div><div class="desc">浙江大学素拓网站</div></a>
              <a href="https://classroom.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/浙江大学.png" onerror="this.src='default.svg'"><div class="title">智云课堂</div><div class="desc">课程回放</div></a>
              <a href="https://jxzygl.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/教学资源.png" onerror="this.src='default.svg'"><div class="title">教学资源</div><div class="desc">资源管理</div></a>
              <a href="https://muchili-code.github.io/Miscellaneous/chalaoshi/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/查老师.png" onerror="this.src='default.svg'"><div class="title">“查老师”集合</div><div class="desc">教师评价</div></a>
              <a href="http://libweb.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/浙江大学.png" onerror="this.src='default.svg'"><div class="title">浙大图书馆</div><div class="desc">资源检索</div></a>
              <a href="https://www.icourse163.org/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/MOOC.png" onerror="this.src='default.svg'"><div class="title">MOOC</div><div class="desc">慕课网</div></a>
              <a href="https://www.zhihuishu.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/智慧树.png" onerror="this.src='default.svg'"><div class="title">智慧树</div><div class="desc">网课平台</div></a>
          </div>
      </div>
      <div id="cat-info" class="category-box">
          <div class="category-title">📡 信息服务</div>
          <div class="grid-wrapper">
              <a href="https://rvpn.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/RVPN.png" onerror="this.src='default.svg'"><div class="title">RVPN</div><div class="desc">校外访问</div></a>
              <a href="https://webvpn.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/WebVPN.png" onerror="this.src='default.svg'"><div class="title">WebVPN</div><div class="desc">网页VPN</div></a>
              <a href="http://net3.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/上网认证.png" onerror="this.src='default.svg'"><div class="title">上网认证</div><div class="desc">校园网连接</div></a>
              <a href="https://myvpn.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/网络缴费.png" onerror="this.src='default.svg'"><div class="title">网络缴费</div><div class="desc">学杂费</div></a>
              <a href="http://ms.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/正版软件.png" onerror="this.src='default.svg'"><div class="title">正版软件</div><div class="desc">OS/Office</div></a>
              <a href="https://mail.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/浙大邮箱.png" onerror="this.src='default.svg'"><div class="title">浙大邮箱</div><div class="desc">Student Mail</div></a>
              <a href="https://pan.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/浙大云盘.png" onerror="this.src='default.svg'"><div class="title">浙大云盘</div><div class="desc">文件存储</div></a>
              <a href="https://service.zju.edu.cn/_s2/cs_sy/main.psp" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/浙江大学.png" onerror="this.src='default.svg'"><div class="title">服务平台</div><div class="desc">综合服务</div></a>
              <a href="https://eta.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/浙江大学.png" onerror="this.src='default.svg'"><div class="title">ETA</div><div class="desc">三全育人平台</div></a>
              <a href="https://www.career.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/浙江大学.png" onerror="this.src='default.svg'"><div class="title">就业服务</div><div class="desc">浙江大学就业指导与服务中心</div></a>
          </div>
      </div>
      <div id="cat-zju-other" class="category-box">
          <div class="category-title">🏫 浙大 · 其他</div>
          <div class="grid-wrapper">
              <a href="https://www.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/浙江大学.png" onerror="this.src='default.svg'"><div class="title">浙江大学</div><div class="desc">官方主页</div></a>
              <a href="http://www.cbeis.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/生仪学院.png" onerror="this.src='default.svg'"><div class="title">生仪学院</div><div class="desc">生物医学工程</div></a>
              <a href="http://bksy.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/本科生院.png" onerror="this.src='default.svg'"><div class="title">本科生院</div><div class="desc">教学管理</div></a>
              <a href="http://www.xlzx.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/心理服务.png" onerror="this.src='default.svg'"><div class="title">心理服务</div><div class="desc">心理健康中心</div></a>
              <a href="https://zhtj.youth.cn/zhtj/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/智慧团建.png" onerror="this.src='default.svg'"><div class="title">智慧团建</div><div class="desc">网上共青团</div></a>
              <a href="http://www.youth.zju.edu.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/浙江大学.png" onerror="this.src='default.svg'"><div class="title">浙大团委</div><div class="desc">团委官网</div></a>
              <a href="http://kyjs.zju.edu.cn/preview#/preview" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/竞赛管理.png" onerror="this.src='default.svg'"><div class="title">竞赛管理</div><div class="desc">学科竞赛</div></a>
              <a href="https://www.chsi.com.cn/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/学信网.png" onerror="this.src='default.svg'"><div class="title">学信网</div><div class="desc">学籍查询</div></a>
              <a href="https://ai.feishu.cn/wiki/VSe1wM70mi6WPBkW8VCc3CCOn7g" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/旷野指南.png" onerror="this.src='default.svg'"><div class="title">旷野指南</div><div class="desc">大学探索</div></a>
          </div>
      </div>
       <div id="cat-editor" class="category-box">
          <div class="category-title">📝 编辑器教学</div>
          <div class="grid-wrapper">
              <a href="https://www.overleaf.com/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/Overleaf.png" onerror="this.src='default.svg'"><div class="title">Overleaf</div><div class="desc">在线LaTeX</div></a>
              <a href="https://blog.csdn.net/qq_41907769/article/details/121722716" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/Typora技巧.png" onerror="this.src='default.svg'"><div class="title">Typora跳转技巧</div><div class="desc">各种跳转语法</div></a>
              <a href="https://blog.csdn.net/u014061630/article/details/81359144?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522172327586116800175791009%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=172327586116800175791009&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-81359144-null-null.142^v100^pc_search_result_base5&utm_term=markdown%E8%AF%AD%E6%B3%95&spm=1018.2226.3001.4187" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/Markdown.png" onerror="this.src='default.svg'"><div class="title">md使用技巧</div><div class="desc">10分钟学会markdown</div></a>
              <a href="https://blog.csdn.net/NSJim/article/details/109045914" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/LaTeX教程.png" onerror="this.src='default.svg'"><div class="title">LaTeX教程</div><div class="desc">详细总结</div></a>
          </div>
      </div>
      <div id="cat-my" class="category-box">
          <div class="category-title">🏠 我的站点</div>
          <div class="grid-wrapper">
              <a href="https://muchili-code.github.io/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/我的博客.png" onerror="this.src='default.svg'"><div class="title">我的个人博客</div><div class="desc">返回主页</div></a>
              <a href="https://www.cnblogs.com/Muchilli/" target="_blank" class="nav-card"><img loading="lazy" decoding="async" class="icon-img" src="../images/博客园.png" onerror="this.src='default.svg'"><div class="title">我的博客园</div><div class="desc">返回</div></a>
          </div>
      </div>
      <div class="footer-quote"><span id="typing-text">正在加载灵感...</span></div>
  </main>
</div>

<script>
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
</script>