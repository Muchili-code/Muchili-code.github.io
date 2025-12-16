---
title: " 星河璀璨，志凌九霄 "
author: "Muchili"
date: "2025-07-31"
description: "这是一个文档的简短描述"
statistics: True
comments: true
---

<div markdown="1" class="homepage">
<h1 style="font-size: 2rem; margin-left: 10%"> <span id="typed"> </span> </h1>
</div>

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

<!--
<center>
    <font color="#788bb8" size="6" class="ml3"> 星河璀璨，志凌九霄</font>
</center> 
--->
???+ success "Blog 信息"
     <center> 上次更新于 </center>
     <center> 目前本站共有 {{ pages }} 个页面，{{ words }} 个字，{{ codes }} 行代码，{{ images }} 张图片。</center>



<div class="grid cards" markdown="1">

-    :simple-github:{ .lg .middle } __About me__
     
     ---

     - :student:A student in ZJU
     - 📖Major in Biomedical Engineering
     - 🚀<strong> <font color="#788bb8" size=3> Make BME Great Again！</font> </strong>
     - 收藏的各种网页

-   :simple-materialformkdocs:{ .lg .middle } __推荐阅读__
    
     ---

     - 💡[我的个人导航站](https://muchili-code.github.io/Navigation/navigation/)
     - 📋️[我的大佬朋友们](https://muchili-code.github.io/link/%E5%8F%8B%E9%93%BE/)
     - 🏷️[我的GitHub个人主页](https://github.com/Muchili-code)
     - 🛠️[建站资料](https://muchili-code.github.io/Site%20Instruction/%E4%BB%93%E5%BA%93%E9%93%BE%E6%8E%A5/)


</div>



<div class="grid cards" markdown>

-   :material-notebook-edit-outline:{ .lg .middle } __To Do list__

    ---
    ![image](images/wallpaper_1.png){ class="responsive-image" loading="lazy" align=right width="300" height="226" style="border-radius: 2.5em 1.5em 3em 2em / 2em 2.5em 1.5em 3em;" }

    - [ ] 通过<mark>目录</mark>以打开文章
    - [ ] 其他文章信息<ins>补充和完善</ins>
    - [ ] 补充<del>[大二](https://muchili-code.github.io/indices/College2/)</del>的笔记
    - [x] 𝕙𝕒𝕧𝕖 𝕒 𝕘𝕠𝕠𝕕 𝕥𝕚𝕞𝕖 !

    === "短期计划"

        好好学习天天向上，保研成功收获成长

    === "长期计划"

        全面发展，屹立群山之巅！
    
    === "对自己说的话"
        星河璀璨，志凌九霄

</div>

<center size="2.5"> 芳乃太美啦 </center>



<div style="text-align: center;">
  <img src="./images/朝武芳乃.png" style="width: 100%; max-width: 100%;" />
</div>


<strong>
     <center>
          <font color="#788bb8" size="3" class="ml3"> Ciallo～(∠・ω＜)⌒☆ </font>
     </center>     
</strong>


---
<body>
    <font color="#B9B9B9">
        <p style="text-align: center;">
            <span> 本站已经运行 </span>
            <span id='box1'> </span>
        </p>
        <div id="box1"> </div>
        <script>
            function timingTime() {
                let start = '2025-06-25 09:08:00';
                let startTime = new Date(start).getTime();
                let currentTime = new Date().getTime();
                let difference = currentTime - startTime;
                let m = Math.floor(difference / 1000);
                let mm = m % 60; // 秒
                let f = Math.floor(m / 60);
                let ff = f % 60; // 分钟
                let s = Math.floor(f / 60); // 小时
                let ss = s % 24;
                let day = Math.floor(s / 24); // 天数
                return day + "天" + ss + "时" + ff + "分" + mm + '秒';
            }
            setInterval(() => {
                document.getElementById('box1').innerHTML = timingTime();
            }, 1000);
        </script>
    </font>
</body>