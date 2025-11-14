# Git操作中遇到的一些问题及解决办法



## 1. 遇到的所有问题、报错与解决方案总结



| **序号** | **遇到的问题 (指令)**                                   | **报错信息**                                                 | **根本原因**                                                 | **解决方案 (我的操作)**                                      | **其他解决方案 (你提供的)**                                  |
| -------- | ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **1**    | `git submodule update --remote`                         | `fatal: unable to get local issuer certificate`              | SSL 证书验证失败。常见于企业代理或防火墙替换了 GitHub 的证书。 | 尝试关闭代理并使用加速器。                                   | 1. 临时禁用：`git -c http.sslVerify=false ...`。2. 永久切换到 **SSH 协议** (推荐)。3. 配置 `http.sslBackend schannel` 使用 Windows 证书库。 |
| **2**    | `git -c http.sslVerify=false submodule update --remote` | `Failed to connect to github.com port 443... Could not connect to server` | 网络连接或代理问题。Git 客户端无法建立到 443 端口的连接。    | **关闭代理，开启加速器。** (解决了网络连通性问题)。          | 1. 检查本地防火墙。2. 配置 Git 代理设置 (`git config http.proxy ...`)。3. **切换到 SSH 协议** (22 端口)。 |
| **3**    | `git -c http.sslVerify=false submodule update --remote` | `error: Your local changes to the following files would be overwritten... .gitignore` | 子模块目录 (`docs/notes`) 中有未提交的本地修改 (`.gitignore`)，Git 拒绝覆盖以保护工作区。 | **未执行**。                                                 | 1. 提交本地修改：`git add .` + `git commit`。2. 放弃本地修改：`git checkout .gitignore`。 |
| **4**    | `git push origin main` (子模块)                         | `! [rejected] main -> main (non-fast-forward)`               | 本地子模块落后于远程子模块。在推送前，远程子模块已被其他人或自动化流程更新。 | 执行 `git pull origin main` 集成远程更改。                   | **无**，这是解决 Non-Fast-Forward 问题的标准做法。           |
| **5**    | `git pull origin main` (子模块)                         | `CONFLICT (content): Merge conflict in .gitignore`           | 你的本地修改与远程拉取的修改发生在 `.gitignore` 文件的同一区域。 | 手动打开 `.gitignore`，**解决冲突**，然后 `git add .gitignore` + `git commit`。 | **无**，必须手动解决冲突。                                   |
| **6**    | GitHub Actions 运行 Checkout Submodules                 | `fatal: remote error: upload-pack: not our ref 9b49816...`   | **最关键问题：** 父仓库 A 引用了一个子模块 B 的提交 (`9b49816...`)，但该提交**未被推送**到子模块 B 的远程仓库。 | 执行 `git push origin main` (在子模块目录)，将缺失的提交推送到远程子模块。 | **无**，必须将子模块提交推送到它自己的远程仓库。             |
| **7**    | `git push origin main` (子模块)                         | `! [rejected] (non-fast-forward)` 后紧跟 `git pull origin main` 报告 `Already up to date.` | **矛盾状态：** 子模块处于分离 HEAD 状态，本地 `main` 分支指针未正确指向最新提交，导致推送失败。 | 1. `git branch -f main HEAD`。2. `git checkout main`。3. `git push origin main --force-with-lease`。 | **无**，这是解决子模块分离 HEAD 导致指针混乱的有效方法。     |

------



## 2. 不熟悉的流程与操作指南

### 🅰️ Git Submodule 的同步流程

> [!success]
>
> 困扰了我大半年的问题，也是终于得到解决了

#### 1. 处理子模块 B 的修改

**提交并推送** 对子仓库 B 所做的修改。

| **步骤**          | **运行什么代码**                          | **预期结果**                                                 |
| ----------------- | ----------------------------------------- | ------------------------------------------------------------ |
| **1. 进入仓库 B** | `cd "E:\Study\College Lessons"`           | 当前工作目录切换到 B 仓库的根目录。                          |
| **2. 暂存修改**   | `git add .`                               | 将所有修改过的文件添加到暂存区。                             |
| **3. 提交修改**   | `git commit -m "更新子仓库 B 的笔记内容"` | 您的修改将被记录为一个新的提交，并生成一个唯一的 **Commit ID**。 |
| **4. 推送修改**   | `git push origin main` (或您的主分支名称) | 将本地的最新提交上传到仓库 B 的远程 GitHub 仓库。            |

#### 2. 更新主仓库 A 对子模块 B 的引用

完成第一步后，子仓库 B 的远程仓库已经有了最新的提交。但是，**主仓库 A 仍然引用着子仓库 B 的上一个旧版本**。

| **步骤**            | **在哪里运行**  | **运行什么代码**                                      | **预期结果**                                                 |
| ------------------- | --------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| **1. 进入仓库 A**   | 命令行/Git Bash | `cd "D:\Program Files\Github\Muchili-code.github.io"` | 当前工作目录切换到 A 仓库的根目录。                          |
| **2. 查看状态**     | 命令行/Git Bash | `git status`                                          | 您会看到类似这样的提示：`modified: docs/notes (new commits)`。这表明 Git 已经检测到子模块指向了一个新的提交。 |
| **3. 暂存引用更新** | 命令行/Git Bash | `git add docs/notes`                                  | 这一步不是添加文件内容，而是添加子模块 **新 Commit ID** 的引用记录。 |
| **4. 提交引用更新** | 命令行/Git Bash | `git commit -m "更新子模块 notes 至最新版本"`         | A 仓库将这个新的子模块 Commit ID 记录在自己的提交历史中。    |
| **5. 推送 A 仓库**  | 命令行/Git Bash | `git push origin main` (或您的主分支名称)             | 将 A 仓库关于子模块引用的更新推送到 A 的远程 GitHub 仓库。   |

### 🅱️ Git 冲突解决（Merge Conflict）



当 `git pull` 试图合并远程和本地的更改，但发现同一区域被修改时，会产生冲突。

| **步骤**        | **操作**                                                     | **目的**                                                     |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **1. 识别冲突** | 运行 `git status` 确认冲突文件，或查看 `git pull` 报告。     | 确定哪些文件需要手动干预。                                   |
| **2. 手动编辑** | 打开冲突文件，找到 `<<<<<<< HEAD`、`=======` 和 `>>>>>>> FETCH_HEAD` 标记。 | **保留**你想要的最终内容，并**删除**所有 Git 插入的标记。    |
| **3. 标记解决** | `git add <文件名>`                                           | 告诉 Git 你已经完成了对该文件的修改，并将最终版本放入暂存区。 |
| **4. 提交合并** | `git commit`                                                 | 完成合并操作，在历史中创建一个新的合并提交。                 |



### 🇨 Git 分离 HEAD 状态 (Detached HEAD)



Git Submodule 在被父仓库检出时，通常处于分离 HEAD 状态，这意味着你没有在一个分支上工作，而是直接指向一个特定的 Commit ID。

| **状态**          | **命令**                                  | **作用**                                                     |
| ----------------- | ----------------------------------------- | ------------------------------------------------------------ |
| **处于分离 HEAD** | `git log -1 --pretty=format:"%H"`         | 获取当前你修改所基于的提交哈希值。                           |
| **修复指针**      | `git branch -f main HEAD`                 | **强制**将本地 `main` 分支指针移动到你当前工作的最新提交 (`HEAD`) 上，消除矛盾。 |
| **切换分支**      | `git checkout main`                       | 将工作区连接到正常的 `main` 分支上，准备进行推送。           |
| **强制推送**      | `git push origin main --force-with-lease` | 在确认本地分支正确的前提下，安全地覆盖远程历史，同步最新的提交。 |