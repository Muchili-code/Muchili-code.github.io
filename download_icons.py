import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# 1. 配置保存路径
# 确保这个路径对应你 mkdocs 中 navigation.md 所在的相对位置
# 如果你的导航页在 docs/Navigation/navigation.md，图片就应该在 docs/Navigation/images
base_dir = os.path.join("docs", "Navigation", "images")

# 2. 网站列表 (名称: URL)
sites = {
    # --- 特殊处理 (直接指定高清图标 URL) ---
    "谷歌翻译": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Translate_logo.svg",
    "维基百科": "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
    
    # --- 教学管理 ---
    "学在浙大": "https://courses.zju.edu.cn/",
    "教务网": "http://jwbinfosys.zju.edu.cn/",
    "素质拓展": "http://st.zju.edu.cn/",
    "智云课堂": "https://classroom.zju.edu.cn/",
    "教学资源": "http://zy.zju.edu.cn/",
    "查老师": "https://chalaoshi.cn/",
    "浙大图书馆": "http://libweb.zju.edu.cn/",
    "课程攻略": "https://qsct.zju.edu.cn/",
    "百度翻译": "https://fanyi.baidu.com/",
    "MOOC": "https://www.icourse163.org/",
    "智慧树": "https://www.zhihuishu.com/",
    
    # --- 科研相关 ---
    "谷歌学术": "https://scholar.google.com/",
    "维普网": "http://cqvip.com/",
    "必应学术": "https://cn.bing.com/academic",
    "爱学术": "https://www.iresearch.cn/",
    "WOS": "https://www.webofscience.com/",
    "中国知网": "https://www.cnki.net/",
    "百度学术": "https://xueshu.baidu.com/",
    "万方数据": "https://www.wanfangdata.com.cn/",
    "Sci-Hub": "https://sci-hub.se/",

    # --- 信息服务 ---
    "RVPN": "https://rvpn.zju.edu.cn/",
    "WebVPN": "https://webvpn.zju.edu.cn/",
    "上网认证": "http://net.zju.edu.cn/",
    "网络缴费": "http://cwsf.zju.edu.cn/",
    "正版软件": "https://zju.edu.cn/",
    "浙大邮箱": "https://mail.zju.edu.cn/",
    "浙大云盘": "https://pan.zju.edu.cn/",
    "服务平台": "http://zuinfo.zju.edu.cn/",

    # --- AI 工具 ---
    "ChatGPT": "https://chatgpt.com/",
    "Gemini": "https://gemini.google.com/",
    "AI Studio": "https://aistudio.google.com/",
    "豆包": "https://www.doubao.com/",
    "DeepSeek": "https://www.deepseek.com/",
    "腾讯元宝": "https://yuanbao.tencent.com/",
    "浙大先生": "https://ai.zju.edu.cn/",
    "Kimi": "https://kimi.moonshot.cn/",
    "Claude": "https://claude.ai/",
    "Zchat": "https://zchat.zju.edu.cn/",

    # --- 计算机学习 ---
    "GitHub": "https://github.com/",
    "GitHub CN": "https://www.githubs.cn/",
    "CS自学指南": "https://csdiy.wiki/",
    "菜鸟教程": "https://www.runoob.com/",
    "W3Schools": "https://www.w3schools.com/",
    "编程指北": "https://csguide.cn/",
    "爱编程的大丙": "https://subingwen.cn/",
    "Hello 算法": "https://www.hello-algo.com/",
    "王道操作系统": "https://blog.csdn.net/",

    # --- 浙大其他 ---
    "浙江大学": "https://www.zju.edu.cn/",
    "生仪学院": "http://www.cbeis.zju.edu.cn/",
    "本科生院": "http://bksy.zju.edu.cn/",
    "心理服务": "http://www.xlzx.zju.edu.cn/",
    "智慧团建": "https://zju.youth.cn/",
    "浙大团委": "http://www.youth.zju.edu.cn/",
    "竞赛管理": "http://js.zju.edu.cn/",
    "学信网": "https://www.chsi.com.cn/",
    "旷野指南": "https://www.zju.edu.cn/",

    # --- 编辑器 ---
    "Overleaf": "https://www.overleaf.com/",
    "Typora技巧": "https://typora.io/", 
    "Markdown": "https://markdown.com.cn/",
    "LaTeX教程": "https://www.latex-project.org/",
    "LaTeX公式": "https://katex.org/",
    "我的博客": "https://muchili-code.github.io/"
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def download_icon(name, url):
    try:
        # 确保目录存在
        if not os.path.exists(base_dir):
            os.makedirs(base_dir)

        print(f"正在处理: {name} ...", end="")
        
        # 判断是直接图片链接还是网页
        if url.endswith(".svg") or url.endswith(".png") or url.endswith(".ico"):
             icon_url = url
             ext = url.split(".")[-1]
        else:
            # 是网页，需要爬取
            try:
                response = requests.get(url, headers=headers, timeout=5)
                soup = BeautifulSoup(response.text, 'html.parser')
                icon_link = None
                
                # 优先级查找
                if not icon_link:
                    icon_tag = soup.find("link", rel="apple-touch-icon")
                    if icon_tag: icon_link = icon_tag.get("href")
                if not icon_link:
                    icon_tag = soup.find("link", rel="icon")
                    if icon_tag: icon_link = icon_tag.get("href")
                if not icon_link:
                    icon_link = "/favicon.ico" # 暴力猜解

                icon_url = urljoin(url, icon_link)
                ext = "png" # 默认保存为png，虽然可能是ico
            except:
                print(" [无法访问网页]")
                return False

        # 下载
        img_data = requests.get(icon_url, headers=headers, timeout=10).content
        
        # 如果是 SVG，保留 svg 后缀，否则存为 png
        if "svg" in icon_url or ext == "svg":
             filename = f"{name}.svg"
        else:
             filename = f"{name}.png"

        file_path = os.path.join(base_dir, filename)
        
        with open(file_path, 'wb') as f:
            f.write(img_data)
        print(f" [成功] -> {filename}")
        return True

    except Exception as e:
        print(f" [失败] - {e}")
        return False

# 运行
print(f"目标文件夹: {os.path.abspath(base_dir)}")
count = 0
for name, url in sites.items():
    if download_icon(name, url):
        count += 1
print(f"\n完成！成功获取 {count} 个图标。")
print("请检查 docs/Navigation/images 文件夹下是否有文件。")