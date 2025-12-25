# 手动部署命令

如果 bat 脚本不工作，请在项目目录打开命令行，依次执行：

```bash
# 1. 初始化 Git 仓库
git init

# 2. 添加所有文件
git add .

# 3. 提交更改
git commit -m "Complete Christmas project with mobile support"

# 4. 设置主分支
git branch -M main

# 5. 添加远程仓库
git remote add origin https://github.com/kuieless/merry-christmas-qian.git

# 6. 推送到 GitHub（强制覆盖）
git push -f origin main
```

## 如果遇到认证问题：

### 方法1：使用 GitHub CLI
```bash
# 安装 GitHub CLI 后
gh auth login
git push origin main
```

### 方法2：使用 Personal Access Token
1. GitHub Settings > Developer settings > Personal access tokens
2. Generate new token (classic)
3. 勾选 repo 权限
4. 复制生成的 token
5. 推送时用 token 作为密码

### 方法3：使用 SSH
```bash
# 生成 SSH 密钥
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 添加到 GitHub
# 然后使用 SSH URL
git remote set-url origin git@github.com:kuieless/merry-christmas-qian.git
git push origin main
```