# maybe this code exists some questions
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# 1. 配置保存路径 (请根据你的实际目录结构修改)
# 假设 docs 文件夹在当前目录下
save_dir = os.path.join("Navigation", "images")

# 2. 网站列表 (名称: URL)
sites = {
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
    "谷歌翻译": "https://translate.google.cn/",
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
    "正版软件": "https://zju.edu.cn/", # 信息中心一般在主网
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
    "旷野指南": "https://www.zju.edu.cn/", # 暂用主网

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
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)

        print(f"正在尝试获取: {name} ...", end="")
        response = requests.get(url, headers=headers, timeout=5)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        icon_link = None
        # 1. 优先找 apple-touch-icon (通常比较清晰)
        icon_tag = soup.find("link", rel="apple-touch-icon")
        if icon_tag: icon_link = icon_tag.get("href")
        
        # 2. 其次找 icon
        if not icon_link:
            icon_tag = soup.find("link", rel="icon") or soup.find("link", rel="shortcut icon")
            if icon_tag: icon_link = icon_tag.get("href")
            
        # 3. 都没有，默认用 /favicon.ico
        if not icon_link:
            icon_link = "/favicon.ico"

        # 处理相对路径
        full_icon_url = urljoin(url, icon_link)
        
        # 下载图片
        img_data = requests.get(full_icon_url, headers=headers, timeout=5).content
        
        # 统一保存为 png 方便调用 (虽然有些可能是ico，但浏览器能识别)
        file_path = os.path.join(save_dir, f"{name}.png")
        
        with open(file_path, 'wb') as f:
            f.write(img_data)
        print(" [成功]")
        return True

    except Exception as e:
        print(f" [失败] - {e}")
        return False

# 主程序
print("--- 开始爬取图标 ---")
success_count = 0
for name, url in sites.items():
    if download_icon(name, url):
        success_count += 1

print(f"\n--- 结束 ---")
print(f"共尝试 {len(sites)} 个，成功获取 {success_count} 个。")
print(f"图片保存在: {save_dir}")