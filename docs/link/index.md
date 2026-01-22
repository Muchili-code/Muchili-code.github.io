---
statistics: false
comments: true
---

<div id="links">
<style>
  /* --- 容器布局 (由 #links 改为 .link-container) --- */
  .link-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
    margin-bottom: 40px; /* 增加底部间距，把不同分类隔开 */
    width: 100%;
  }
  /* --- 卡片主体 --- */
  .card {
    width: calc(50% - 10px);
    height: 100px;
    padding: 10px 15px;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* 强制覆盖暗色模式默认样式 */
    background-color: transparent !important;
    border: 1px solid transparent !important;
    box-shadow: none !important;    
    font-family: inherit; 
    transition: all 0.3s ease;
  }
  /* --- 鼠标悬停效果 --- */
  .card:hover {
    transform: translateY(-3px);
    background-color: rgba(96, 141, 189, 0.15) !important;
    border: 1px solid rgba(96, 141, 189, 0) !important;
    box-shadow: 0 4px 15px rgba(96, 141, 189, 0.3) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  /* 去除链接下划线 */
  .card a {
    border: none !important;
    text-decoration: none !important;
  }
  /* --- 头像 --- */
  .card .ava {
    width: 60px !important;
    height: 60px !important;
    border-radius: 50% !important;
    margin: 0 !important;
    margin-right: 15px !important;
    object-fit: cover;
    flex-shrink: 0;
  }
  /* --- 文字区域 --- */
  .card .card-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    overflow: hidden;
  }
  /* --- 标题 --- */
  .card .card-header a {
    font-size: 0.85rem;
    color: #608dbd;
    line-height: 1.2;
    text-transform: none;
    font-weight: bold;
    margin-top: -5px;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  /* --- 正文/简介 --- */
  .card .card-header .info {
    font-size: 0.6rem;
    color: #a3a3a3;
    font-weight: normal; 
    text-transform: none;
    font-family: inherit; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* 悬停时标题高亮颜色 */
  .card:hover .card-header a {
    color: #d480aa;
  }
  /* 手机端适配 */
  @media (max-width: 768px) {
    .card {
      width: 100%;
    }
  }
  </style>
</div>


<h>我的朋友们和大佬</h>

<div class="link-container">


  <div class="card">
    <img class="ava" src="https://avatars.githubusercontent.com/u/176311727?s=400&u=953f4d2a796d80a222e47435383aefddf0a94371&v=4" />
    <div class="card-header">
      <a href="https://www.cnblogs.com/Muchilli" target="_blank">慕迟离</a>
      <div class="info">Keep the beginner's mind</div>
      <div class="info">闻见知行</div>
    </div>
  </div> 

  <div class="card">
    <img class="ava" src="https://blog-of-eden.vercel.app/images/art/e00f1b0a3fc0b8bb.png" />
    <div class="card-header">
      <a href="https://blog-of-eden.vercel.app/" target="_blank">Eden Silas</a>
      <div class="info">听自己的心，徘徊还是所向披靡</div>
    </div>
  </div> 

  <div class="card">
    <img class="ava" src="https://avatars.githubusercontent.com/u/44120331?v=4" />
    <div class="card-header">
      <a href="https://note.tonycrane.cc/" target="_blank">鹤翔万里</a>
      <div class="info">ZJU MkDocs 笔记流鼻祖</div>
    </div>
  </div>

  <div class="card">
    <img class="ava" src="https://avatars.githubusercontent.com/u/88835299?v=4" />
    <div class="card-header">
      <a href="https://note.noughtq.top/" target="_blank">NoughtQ</a>
      <div class="info">CS笔记大全</div>
    </div>
  </div>

  <div class="card">
    <img class="ava" src="https://avatars.githubusercontent.com/u/48550237?v=4" />
    <div class="card-header">
      <a href="https://isshikihugh.github.io/zju-cs-asio/" target="_blank">ZJU CS</a>
      <div class="info">各类与 ZJU-CS 有关的网站</div>
    </div>
  </div>

  <div class="card">
    <img class="ava" src="https://pic4.zhimg.com/80/v2-a0456a5f527c1923f096759f2926012f_1440w.webp" />
    <div class="card-header">
      <a href="https://wcowin.work/" target="_blank">Wcowin’s blog</a>
      <div class="info">循此苦旅，以达星辰</div>
    </div>
  </div>

  <div class="card">
    <img class="ava" src="https://avatars.githubusercontent.com/u/157186956?v=4" />
    <div class="card-header">
      <a href="https://wbx0710.github.io/mymkdocs/index.html" target="_blank">BiXing's Notebook</a>
      <div class="info">ACEEer,bxgg真神</div>
    </div>
  </div>

  <div class="card">
    <img class="ava" src="https://xw-soleil.github.io/img/myavatar.jpg" />
    <div class="card-header">
      <a href="https://xw-soleil.github.io/" target="_blank">Soleil’s Notebook</a>
      <div class="info">ACEEer,xw亦神</div>
    </div>
  </div>

  <div class="card">
    <img class="ava" src="https://avatars.githubusercontent.com/u/140944302?v=4" />
    <div class="card-header">
      <a href="https://www.aboatwithflow.top/" target="_blank">Aboat’s Blog</a>
      <div class="info">ACEEer,Aboat Withflow</div>
    </div>
  </div>

  <div class="card">
    <img class="ava" src="https://www.z-cosy.top/avatar.svg" />
    <div class="card-header">
      <a href="https://www.z-cosy.top/" target="_blank">Z-cozy</a>
      <div class="info">wbgg</div>
    </div>
  </div>

  <div class="card">
    <img class="ava" src="https://blog.unmyic.com/img/avatar.png" />
    <div class="card-header">
      <a href="https://blog.unmyic.com/" target="_blank">unmyic</a>
      <div class="info">jfgg</div>
    </div>
  </div>

  <div class="card">
    <img class="ava" src="https://aprsev.github.io/pic/nav-logo.png" />
    <div class="card-header">
      <a href="https://aprsev.github.io/" target="_blank">aprsev</a>
      <div class="info">Aprsev house</div>
    </div>
  </div>
  
  <div class="card">
    <img class="ava" src="https://lh-0124.github.io/img/%E5%A4%B4%E5%83%8F.jpg" />
    <div class="card-header">
      <a href="https://lh-0124.github.io/LHstudy/" target="_blank">LH's Study Site</a>
      <div class="info">98学习天地版主</div>
    </div>
  </div>


  
</div>
