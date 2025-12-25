# 🚀 完整部署指南

## ✅ 已完成的配置
- Git 用户名：kuieless
- Git 邮箱：2825399509@qq.com
- 远程仓库：https://github.com/kuieless/merry-christmas-qian.git
- 项目文件：已准备好（不包含 node_modules）

## 🔐 GitHub 认证设置

### 方法1：Personal Access Token（推荐）

1. **创建 Token**：
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token (classic)"
   - 勾选 "repo" 权限
   - 复制生成的 token

2. **使用 Token 推送**：
   ```bash
   git push origin main
   ```
   - 用户名：kuieless
   - 密码：粘贴你的 token（不是 GitHub 密码）

### 方法2：GitHub CLI（最简单）

1. **安装 GitHub CLI**：
   - 下载：https://cli.github.com/
   - 或使用 winget：`winget install GitHub.cli`

2. **登录并推送**：
   ```bash
   gh auth login
   git push origin main
   ```

### 方法3：SSH 密钥

1. **生成 SSH 密钥**：
   ```bash
   ssh-keygen -t rsa -b 4096 -C "2825399509@qq.com"
   ```

2. **添加到 GitHub**：
   - 复制公钥：`cat ~/.ssh/id_rsa.pub`
   - GitHub Settings > SSH and GPG keys > New SSH key

3. **更改远程 URL**：
   ```bash
   git remote set-url origin git@github.com:kuieless/merry-christmas-qian.git
   git push origin main
   ```

## 📋 部署步骤

### 1. 创建 GitHub 仓库
- 仓库名：`merry-christmas-qian`
- 设为 Public
- 不初始化任何文件

### 2. 推送代码
```bash
git push origin main
```

### 3. 启用 GitHub Pages
1. 仓库 Settings > Pages
2. Source: "Deploy from a branch"
3. Branch: "gh-pages"
4. Save

### 4. 等待部署
- GitHub Actions 会自动构建
- 约 2-3 分钟后可访问
- 网址：https://kuieless.github.io/merry-christmas-qian/

## 🐛 常见问题

### 推送失败
- 检查网络连接
- 确认 GitHub 仓库已创建
- 使用正确的认证方式

### 认证失败
- 不要使用 GitHub 密码
- 使用 Personal Access Token
- 或使用 GitHub CLI

### 网络问题
- 尝试使用手机热点
- 或使用 VPN
- 或使用 SSH 方式

## 🎯 推荐流程

**最简单的方法**：
1. 安装 GitHub CLI
2. 运行 `gh auth login`
3. 运行 `git push origin main`
4. 启用 GitHub Pages

这样就完成了！