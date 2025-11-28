import os
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# 1. 配置保存路径
# 因为脚本现在已经在 docs/Navigation 下了，所以直接指向当前目录下的 images
base_dir = "images"
data_file = "sites.json"

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def load_sites(filepath):
    """读取JSON格式的网址数据"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"错误: 找不到数据文件 {filepath}")
        return {}
    except json.JSONDecodeError:
        print(f"错误: {filepath} 格式不正确，请确保是标准的JSON格式")
        return {}

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
                ext = "png" 
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
        
        # 写入文件
        with open(file_path, 'wb') as f:
            f.write(img_data)
        print(f" [成功] -> {filename}")
        return True

    except Exception as e:
        print(f" [失败] - {e}")
        return False

# 主程序
if __name__ == "__main__":
    print(f"当前工作目录: {os.getcwd()}")
    print(f"读取数据文件: {data_file}")
    
    sites = load_sites(data_file)
    
    if sites:
        count = 0
        for name, url in sites.items():
            if download_icon(name, url):
                count += 1
        print(f"\n完成！成功获取 {count} 个图标。")
        print(f"图标保存在: {os.path.abspath(base_dir)}")
    else:
        print("没有读取到网址数据，程序终止。")