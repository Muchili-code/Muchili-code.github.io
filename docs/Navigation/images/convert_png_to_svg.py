import os
import subprocess
from PIL import Image

def png_to_svg(input_path, output_path, potrace_path):
    """
    1. 将 PNG 转换为 BMP (Potrace 只能读取 BMP/PGM)。
    2. 调用 potrace.exe 将 BMP 转为 SVG。
    3. 删除中间生成的 BMP 文件。
    """
    # 中间文件路径 (temp.bmp)
    bmp_path = os.path.splitext(input_path)[0] + ".bmp"
    
    try:
        # --- 第一步：使用 Pillow 将 PNG 转为二值化 BMP ---
        image = Image.open(input_path)
        
        # 转为灰度 -> 二值化 (黑白)
        threshold = 128
        image = image.convert("L").point(lambda x: 0 if x < threshold else 255, mode="1")
        
        # 保存为 BMP
        image.save(bmp_path)
        
        # --- 第二步：调用 potrace.exe ---
        # 命令格式: potrace.exe input.bmp -s -o output.svg
        # -s 表示输出为 SVG 格式
        # --flat 只是为了防止某些情况下的优化导致路径丢失，可选
        
        command = [
            potrace_path,
            bmp_path,
            "-s",              # 输出 SVG
            "-o", output_path  # 输出文件路径
        ]
        
        # 执行命令，不弹出黑框
        subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        print(f"✅ 成功转换: {os.path.basename(input_path)} -> {os.path.basename(output_path)}")

    except subprocess.CalledProcessError:
        print(f"❌ Potrace 执行出错: {input_path}")
    except FileNotFoundError:
        print(f"❌ 找不到 potrace.exe，请确保它在脚本同级目录下。")
    except Exception as e:
        print(f"❌ 处理出错 {input_path}: {e}")
    finally:
        # --- 第三步：清理中间 BMP 文件 ---
        if os.path.exists(bmp_path):
            os.remove(bmp_path)

def main():
    # 获取当前脚本所在目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 自动寻找同目录下的 potrace.exe
    potrace_exe = os.path.join(current_dir, "potrace.exe")
    
    if not os.path.exists(potrace_exe):
        print("错误：未在当前目录下找到 potrace.exe")
        print("请下载 Windows 版 potrace (https://potrace.sourceforge.net/) 并将 potrace.exe 放入此文件夹。")
        return

    print(f"正在扫描文件夹: {current_dir} ...")
    
    count = 0
    for filename in os.listdir(current_dir):
        if filename.lower().endswith(".png"):
            count += 1
            input_full_path = os.path.join(current_dir, filename)
            output_full_path = os.path.join(current_dir, os.path.splitext(filename)[0] + ".svg")
            
            png_to_svg(input_full_path, output_full_path, potrace_exe)
    
    if count == 0:
        print("未找到 .png 文件。")
    else:
        print("所有任务完成。")

if __name__ == "__main__":
    main()