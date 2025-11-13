## **Git 命令行总结及使用方法**

⭐ 参考资料：[Git 基本操作 | 菜鸟教程](https://www.runoob.com/git/git-basic-operations.html)

1. `git init`
   - **功能：** 在当前目录初始化一个新的 Git 仓库。这会在当前目录下创建一个隐藏的 .git 文件夹，使<u>该目录</u>成为一个可由 Git 管理的项目。  
   - **使用场景： ** 当你有一个现有的文件夹，想开始用 Git 来管理它时，第一次进入该文件夹后执行此命令。  
   - **示例： ** `cd E:\Study\College Lessons` 然后 `git init`
2. **`git add .` 或 `git add <file/directory>` ** 
   - **功能： ** 将工作目录中的文件或文件夹添加到 Git 的“暂存区”（Staging Area）。暂存区是提交前的一个缓冲区。  
     - git add .：将当前目录下所有未被 Git 追踪的新文件、或已修改的文件（除了被 .gitignore 忽略的）都添加到暂存区。  
     - git add <file/directory>：只添加指定的文件或目录（包括其内容）。  
   - **使用场景： ** 在你对文件进行修改、新增或删除后，准备将这些更改包含在下一个提交中时使用。  
   - **示例： ** git add . (添加所有更改)，或 git add "College 2/期末复习/自己笔记" (添加特定文件夹)。  
3. **`git commit -m "Your commit message"` ** 
   - **功能： ** 将暂存区中的所有更改作为一个新的“提交”（Commit）永久保存到本地 Git 仓库的历史中。"-m" 后面跟着的是本次提交的简短描述信息，非常重要，用于记录你做了什么更改。  
   - **使用场景： ** 完成一组相关的更改后，将其作为历史版本进行保存。  
   - **示例： ** git commit \m "Add initial College Lessons notes"  
4. **`git remote add <name> <url>` ** 
   - **功能： ** 将一个远程 Git 仓库的 URL 添加到本地仓库的远程列表中，并为其指定一个别名（通常是 origin）。  
   - **使用场景： **<u>第一次</u>将本地仓库与 GitHub 等远程仓库关联时使用。  
   - **示例： ** git remote add origin https://github.com/Muchili-code/College-Notes.git  
5. **`git branch -M main (或 git branch -M master) ` **
   - **功能： ** 将当前分支的名称更改为 main (或 master)。现代 Git 社区普遍推荐使用 main 作为主分支名称。  
   - **使用场景： ** 当你的本地默认分支是 master 而你想将其更名为 main，或者需要将本地分支名与远程仓库的主分支名保持一致时使用。  
   - **示例： ** git branch \M main  
6. **`git push -u <remote_name> <branch_name>` ** 
   - **功能： ** 将本地仓库的某个分支的提交推送到指定的远程仓库。  
     - \u (或 \-set-upstream)：在<u>第一次</u>推送时使用，它会将本地分支与远程分支关联起来。这样，以后的 git push 或 git pull 就可以省略 <remote\_name> <branch\_name>。  
   - **使用场景： ** 将本地的提交同步到 GitHub 等远程仓库，与团队成员共享或进行部署。  
   - **示例： ** git push \u origin main  
7. **`git status` ** 
   - **功能： ** 显示工作目录和暂存区的当前状态。它会告诉你哪些文件是新的、已修改的、已删除的，以及它们是否已暂存或已提交。  
   - **使用场景： ** 随时查看你当前项目文件的 Git 状态，了解哪些更改需要处理。  
   - **示例： ** git status  
8. **`git reset 或 git reset HEAD` ** 
   - **功能： ** 撤销 git add 操作，将暂存区中的文件移回工作目录（变为未暂存状态），但不删除文件。  
   - **使用场景： ** 当你错误地 git add 了文件，或者想重新选择要提交的文件时。  
   - **示例： ** git reset

---

## GitHub Desktop 进行这些操作

GitHub Desktop 提供了一个图形界面，大大简化了这些 Git 命令的操作。

### **1\. 初始化/添加现有仓库：**

- **类似 git init 或 git clone ** 
- **添加现有本地仓库： ** 如果你已经有一个像 E:\Study\College Lessons 这样的本地文件夹，并且它已经是一个 Git 仓库了（或者你想让它成为一个仓库），在 GitHub Desktop 左上角点击 **"File" (文件) ** \> **"Add Local Repository..." (添加本地仓库...)**。浏览到你的文件夹并添加。  
- **创建新仓库： ** 如果要创建一个全新的仓库，点击 **"File" ** \> **"New Repository..." (新建仓库...)**。  
- **克隆远程仓库： ** 如果要从 GitHub.com 克隆一个已存在的仓库到本地，点击 **"File" ** \> **"Clone Repository..." (克隆仓库...)**。

### **2\. 添加文件到暂存区 & 提交更改：**

- **类似 git add 和 git commit ** 
- 当你修改、添加或删除了文件后，GitHub Desktop 会自动检测到这些“Changes”（更改）。  
- 在 GitHub Desktop 的左侧面板会显示“Changes”选项卡，列出所有文件更改。  
- **选择要暂存的文件： ** 默认情况下，所有更改都会被选中（相当于 git add .）。如果你只想暂存部分文件，可以取消勾选不需要的文件。  
- **编写提交信息： ** 在左下角的 "Summary (required)" 文本框中输入你的提交消息（相当于 git commit \m "..."）。  
- **提交： ** 点击蓝色的 **"Commit to main" **(或你当前分支的名称) 按钮。

### **3\. 关联/查看远程仓库：**

- **类似 git remote add 和 git remote \v ** 
- 当你通过 GitHub Desktop 创建或克隆仓库时，它会自动处理远程关联。  
- 要查看远程信息，可以在仓库视图中点击菜单栏的 **"Repository" (仓库) ** \> **"Repository Settings..." (仓库设置...)**，在这里可以看到远程 URL。

### **4\. 重命名分支：**

- **类似 git branch \M ** 
- 在 GitHub Desktop 顶部，点击 "Current branch" 下拉菜单。  
- 选择你想要重命名的分支（例如 master）。  
- 点击分支列表下方的 **"Rename" (重命名) ** 按钮，输入新名称（例如 main）。

### **5\. 推送/拉取更改：**

- **类似 git push 和 git pull ** 
- **推送： ** 在你提交更改后，GitHub Desktop 会提示你 **"Push origin" **(或显示一个向上的箭头图标)。点击此按钮即可将本地提交推送到远程仓库。  
- **拉取： ** 如果远程仓库有新的更改，GitHub Desktop 会提示你 **"Pull origin" **(或显示一个向下的箭头图标)。点击此按钮即可从远程仓库拉取最新更改到本地。  
- **Fetch (获取)： ** GitHub Desktop 会定期自动执行 "Fetch origin" (相当于 git fetch)，获取远程仓库的最新信息，但不会合并到你的本地分支。你可以手动点击顶部工具栏的 "Fetch origin" 按钮。

### **6\. 查看状态：**

- **类似 git status ** 
- GitHub Desktop 的主界面就是你的“状态”视图。它会实时显示你的“Changes”（未暂存和已暂存的更改）以及“History”（提交历史）。

## **总结：**

命令行提供了强大的灵活性和精确控制，适合深入理解 Git 工作原理和自动化脚本。GitHub Desktop 则通过直观的图形界面，简化了日常的 Git 操作，非常适合初学者和希望快速高效工作的人。

你可以根据自己的习惯和任务需求，在两者之间灵活切换使用。恭喜你再次成功地将笔记上传到了 GitHub！