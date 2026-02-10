---
title: " ⭐星河璀璨，志凌九霄🚀 "
author: "Muchili"
date: "2025-07-31"
description: "这是一个文档的简短描述"
template: home.html
statistics: True
comments: true
hide: 
  - navigation
  - toc
---

<link rel="stylesheet" href="./css/home.css">
<script defer src="./javascripts/home.js"></script>

<!--
<div id="rcorners2">
     <div id="rcorners1"class="date-display">
          <p class="p1"> </p>
     </div>
     <style>
        /* 将 rcorners2 居中，但不显示背景 */
        #rcorners2 {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 10vh; /* 占用的视口高度 */
            padding: 10px;
        }
        /* 设置日期显示区域的样式 */
        .date-display {
            color: #164cd5ff; /* 白色字体 */
            font-size: 4;
            font-weight: bold;
            padding: 20px 60px;
            border-radius: 15px;
            background: linear-gradient(to right, #a1c2e7, #788bb8); /* 渐变 */
            text-align: center;
        }
    </style>
        <script defer>
        function format(newDate) {
            const day = newDate.getDay();
            const y = newDate.getFullYear();
            const m = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
            const d = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
            const h = newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
            const min = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes();
            const s = newDate.getSeconds() < 10 ? `0${newDate.getSeconds()}` : newDate.getSeconds();
            const dict = {1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六", 0: "天"};
            return `${y}年${m}月${d}日 ${h}:${min}:${s} 星期${dict[day]}`;
        }
        const timerId = setInterval(() => {
            const newDate = new Date();
            const p1 = document.querySelector(".p1");
            if (p1) {
                p1.textContent = format(newDate);
            }
        }, 1000);
    </script>
</div>  
<br>

<center>
    <font color="#788bb8" size="6" class="ml3"> 星河璀璨，志凌九霄</font>
</center> 
--->

<br>
<br>
<br>

<body>
    <p style="text-align: center; font-size: 28px ">
                <span>🕐本站已经运行</span>
                <span id='box1'></span>
    </p>
      <div id="box1"></div> <!--home.js的timingTime()函对应id="box1"-->
</body>



<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px;" markdown="1">

<a href="https://muchili-code.github.io/changelog.html" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px; border: 1px solid rgb(255, 196, 0); border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s;" onmouseover="this.style.background='rgb(128,128,128,0.1)'" onmouseout="this.style.background='transparent'">
<span style="font-size: 1.5em; margin-bottom: 4px; color: rgb(255, 196,0)">:material-clock-time-two-outline:</span>
<span style="font-weight: bold; font-size: 0.9em; color: rgb(255, 196,0)">最近更新</span>
</a>

<a href="javascript:toggle_about();" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px; border: 1px solid rgb(1, 175, 255); border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s;" onmouseover="this.style.background='rgba(128,128,128,0.1)'" onmouseout="this.style.background='transparent'">
<span style="font-size: 1.5em; margin-bottom: 4px; color: rgb(1, 175, 255)">:octicons-person-16:</span>
<span style="font-weight: bold; font-size: 0.9em; color: rgb(1, 175, 255)">关于我</span>
</a>

<a href="javascript:toggle_statistics();" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px; border: 1px solid rgb(24, 202, 134); border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s;" onmouseover="this.style.background='rgba(128,128,128,0.1)'" onmouseout="this.style.background='transparent'">
<span style="font-size: 1.5em; margin-bottom: 4px; color: rgb(24, 202, 134)">:material-chart-line:</span>
<span style="font-weight: bold; font-size: 0.9em; color: rgb(24, 202, 134)">站点统计</span>
</a>

<a href="javascript:toggle_recommend();" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px; border: 1px solid rgb(126, 87, 194); border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s; ;" onmouseover="this.style.background='rgba(128,128,128,0.1)'" onmouseout="this.style.background='transparent'">
<span style="font-size: 1.5em; margin-bottom: 4px; color: rgb(126, 87, 194)">:octicons-thumbsup-16:</span>
<span style="font-weight: bold; font-size: 0.9em; color: rgb(126, 87, 194)">推荐阅读</span>
</a>
</div>


<div id="about" markdown="1" class="card" style="width: 40em; margin: 0 auto 20px auto; border-color: transparent; display: none; font-size: 95% ">
<div style="padding-left: 1em; text-align: center" markdown="1">
ZJU 本科 23 级 bmer<br>
正在摸索感兴趣的方向（似乎没有感兴趣的方向，maybe较为浑噩）<br>
平时喜欢阅读、钻研等。纯天然牛马体质人<br>
欢迎找我~
<br>
[:fontawesome-solid-blog: 我的博客](https://blog-of-eden.vercel.app/) | 
[:fontawesome-solid-box-archive: 我的 ZJU 课程资料库](https://github.com/Muchili-code/College-Notes) | 
[:simple-github: 我的 GitHub](https://github.com/Muchili-code) | 
[:material-email: 我的邮箱](mailto:<2979568058@qq.com>)
</div>
</div>

<div id="statistics" markdown="1" class="card" style="max-width: 27em; margin: 0 auto 20px auto; border-color: transparent; display: none; font-size: 95%">
<div style="padding-left: 1em;" markdown="1">
- :material-file-document: 页面总数：{{pages}}  
- :material-circle-edit-outline: 总字数：{{words}}  
- :fontawesome-solid-code: 代码块行数：{{codes}}  
- :octicons-clock-16: 上次更新时间：{{ git_revision_date_localized }}
</div>
</div>

<div id="recommend" markdown="1" class="card" style="max-width: 27em; margin: 0 auto 20px auto; border-color: transparent; display: none; font-size: 95%">
<div style="padding-left: 1em;" markdown="1">
- 🔡[笔记纲要](./Tag/tag.md)
- 📊[个人导航页](./Navigation/navigation.md)
</div>
</div>

<br>
<br>

---

<div class="grid cards" markdown>

-   :material-notebook-edit-outline:{ .lg .middle } Blog 信息

    ---
    
    ![image](images/wallpaper_3.png){ class="responsive-image" loading="lazy" align=right width="500" height="400" style="border-radius: 2.5em 1.5em 3em 2em / 2em 2.5em 1.5em 3em;" }

    可以听听歌，舒缓一整天的疲惫！(播放曲目随机)

    <iframe style="display: block; margin: 0 auto;" frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=2089023383&auto=1&height=66"></iframe>

    - [x] 这是我的 ==笔记本==，基于MkDocs-material主题搭建，主要用于记录大学学习生活和期间的一些个人感悟。[我的个人主页](https://blog-of-eden.vercel.app/)请点击链接
    - [x] [🕛上次更新](./changelog.md) 于 {{ git_revision_date_localized }} 
    - [x] 目前本站共有 {{ pages }} 个页面，{{ words }} 个字，{{ codes }} 行代码，{{ images }} 张图片。

    === "短期计划"

        好好学习，天天向上

    === "长期计划"

        全面发展，屹立群山之巅！

    === "对自己说的话"
        
        ⭐星河璀璨，🚀志凌九霄

</div>



</div>



<div class="grid cards" markdown="1">

-    :simple-github:{ .lg .middle } About me
     
     ---

     :student: A college student in ZJU majoring in Biomedical Engineering<br>
     📖 Major in Biomedical Engineering<br>
     💡<strong><font color="#788bb8" size=3> Make BME Great Again！</font> </strong><br>
     ❤️ Optimistic enfj&technical lover
     
-   :simple-materialformkdocs:{ .lg .middle } 我的收藏
    
    ---

     🚀 [我的个人导航站](https://muchili-code.github.io/Navigation/navigation.html)<br>
     📋️ [我的大佬朋友们](https://muchili-code.github.io/link/index.html)<br>
     🏷️ [我的个人生活主页](https://blog-of-eden.vercel.app/)<br>
     🛡️ [建站资料](https://muchili-code.github.io/indices/Site_Instruction/)<br>

-   :material-book-education:{ .lg .middle } To Do List

    ---

    - [ ] 补充<del>[大二](https://muchili-code.github.io/indices/College2/)</del>的笔记
    - [ ] 优化首页的内容与排版形式 <progress class="prog-custom" value="75" max="100"></progress> 75%
    - [ ] 调整大三的笔记排版


</div>


---

<center size="2.5"> 芳乃太美啦 </center>



<div style="text-align: center;">
  <img src="./images/朝武芳乃.png" style="width: 80%; max-width: 100%;" />
</div>


<strong>
     <center>
          <font color="#788bb8" size="3" class="ml3"> Ciallo～(∠・ω＜)⌒☆ </font>
     </center>     
</strong>

