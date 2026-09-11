慕迟离的ai小站 / Muchilli's AI Lab

独立静态首页，包含六屏：首屏、模型生态、文档接入、透明交付、模型与价格、开始使用。
入口 index.html；未来部署路径 /relay/。没有修改 MkDocs 配置，不需要额外构建。
本地预览：在本目录执行 python -m http.server 8765 --bind 127.0.0.1

文件
index.html：全部章节、真实 Base URL、CTA 和用户确认的文案。
assets/relay.css：基础样式和统一主题变量。仅修改顶部 --accent，按钮、文字高亮、光晕、边框强调色同步派生。当前 RGB(29,98,233)。
assets/sections.css：章节排版、表格、模型示意图、分屏布局与响应式样式。
assets/relay.js：两处 Base URL 复制及受限降级。
assets/sections.js：桌面滚轮逐屏切换、右侧导航、当前章节指示及键盘翻页。
assets/logo.svg：临时使用 Sub2API 原始 Logo，保留原色，后续可替换。
preview/：截图和 embed.html 本地 iframe 预览页，不被正式首页加载。

交互
桌面宽度大于 900px 且高度不小于 680px 时启用整屏滚动。
滚轮手势、Page Up/Down、上下方向键与空格切换章节，Home/End 到达首尾；链接和输入框保留原生键盘行为。
触控板惯性不会连续跨过多个章节。超高内容允许先在章节内自然滚动。
手机和矮窗口使用自然滚动，避免强制吸附影响阅读。遵从 prefers-reduced-motion。
所有外部 CTA 使用 target="_top"，由父页面跳转；本地章节锚点留在 iframe 内。
复制受父页面 Permissions Policy 和 iframe 配置影响，失败时选中地址供手动复制。
没有设置阻止嵌入的安全头；不访问父页面 DOM、不调用后台或模型 API。

确认的信息
品牌、蓝色主题、Base URL 与 CTA 均由用户提供。
兼容 OpenAI API；已有兼容客户端可更改 Base URL 接入，同时须配置本站密钥与模型名称。
模型范围：Claude、Gemini、ChatGPT、Grok；平台提供对话、推理、代码、图片能力。具体模型能力以模型页为准。
国产大模型计划接入；视频为后续考虑项目，不表示当前已提供。
模型价格、分组倍率公开可查；缓存优惠来自真实命中和实际节省。
首页不写具体价格，不展示发票、线路、可用率或未经确认的服务承诺。
透明交付表格采用用户疑问与本站说明对照，不对其他平台作事实判断。

链接
Base URL：https://muchilli-ai-lab.aitoken.credit/v1
开始使用：https://muchilli-ai-lab.aitoken.credit/home
模型与定价：https://muchilli-ai-lab.aitoken.credit/marketplace?tab=models
文档：https://muchilli-ai-lab.aitoken.credit/docs/

Logo 来源：https://github.com/Wei-Shaw/sub2api/blob/main/assets/logo.svg
下载来源：https://raw.githubusercontent.com/Wei-Shaw/sub2api/main/assets/logo.svg
获取日期：2026-09-11。原项目及贡献者保留权利，使用图标不表示官方关联。
上游许可证：https://github.com/Wei-Shaw/sub2api/blob/main/LICENSE

未提交、推送或部署。真实站点的跨域 iframe 权限和目标链接跳转仍需上线后确认。
