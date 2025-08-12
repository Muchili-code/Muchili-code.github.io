# Welcome to MkDocs

For full documentation visit [mkdocs.org](https://www.mkdocs.org).

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.

```python {.code-foldable} 
import os 
import sys 
import time 
import requests 
from datetime import datetime
def fetch_data_from_api(url, retries=3):
    """
    从指定的API URL获取数据，并支持重试机制。
    """
    for i in range(retries):
        try:
            print(f"尝试从 {url} 获取数据 (第 {i+1} 次尝试)...")
            response = requests.get(url, timeout=10)
            response.raise_for_status() # 如果状态码不是200，则抛出HTTPError
            print("数据获取成功！")
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"获取数据失败: {e}")
            if i < retries - 1:
                print(f"等待 {2**(i+1)} 秒后重试...")
                time.sleep(2**(i+1))
            else:
                print("所有重试均失败。")
                return None

```