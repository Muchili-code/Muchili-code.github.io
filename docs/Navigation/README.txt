导航页维护

修改网站或分类时，编辑 sites.json。每个分类包含 id、icon、title 和 sites，排列顺序同时决定侧栏和页面卡片的顺序。分类 id 用于页面锚点，已发布的 id 建议保留。

每张卡片填写 title（名称）、url（网址）、description（简述）和 icon（文件名）。图标文件放在 images/ 下。没有专用图标时，可填写 default.svg。

navigation.md 是 MkDocs 的页面入口，对应 /Navigation/navigation.html。仓库的 hooks/navigation.py 在构建时读取站点清单，用 overrides/partials/navigation.html 生成侧栏和卡片。nav_style.css 控制样式，nav_script.js 管理侧栏交互、底部文字和图标加载失败时的回退。

download_icons.py 可按 OtherSite.json 单独下载图标。
