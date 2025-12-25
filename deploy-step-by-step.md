# 🚀 逐步部署指南

## 第一步：确认文件
运行这个命令查看将要上传的文件：
```bash
git status
```

应该看到：
- ✅ 包含：.js, .ts, .tsx, .html, .css, .json 等源代码文件
- ❌ 不包含：node_modules, dist 等文件夹

## 第二步：添加文件
```bash
git add .
```

## 第三步：提交更改
```bash
git commit -m "Complete Christmas project with mobile support"
```

## 第四步：推送到 GitHub
```bash
git push origin main
```

如果提示需要认证：
- 用户名：你的 GitHub 用户名
- 密码：使用 Personal Access Token（不是账户密码）

## 获取 Personal Access Token：
1. GitHub.com > Settings > Developer settings
2. Personal access tokens > Tokens (classic)
3. Generate new token
4. 勾选 "repo" 权限
5. 复制生成的 token 作为密码使用

## 第五步：启用 GitHub Pages
1. 进入仓库 Settings > Pages
2. Source: "Deploy from a branch"
3. Branch: "gh-pages"
4. Save

## 验证部署
访问：https://kuieless.github.io/merry-christmas-qian/