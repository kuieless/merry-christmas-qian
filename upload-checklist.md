# 📋 GitHub 手动上传文件清单

## ✅ 必须上传的文件

### 🏠 根目录文件
- [ ] `package.json` - 项目依赖配置
- [ ] `package-lock.json` - 锁定依赖版本
- [ ] `tsconfig.json` - TypeScript 配置
- [ ] `vite.config.ts` - Vite 构建配置
- [ ] `index.html` - 主页面
- [ ] `index.tsx` - React 入口文件
- [ ] `index.css` - 全局样式
- [ ] `App.tsx` - 主应用组件
- [ ] `types.ts` - TypeScript 类型定义
- [ ] `constants.ts` - 常量配置
- [ ] `vite-env.d.ts` - Vite 类型声明
- [ ] `.gitignore` - Git 忽略文件配置

### 📁 components 文件夹
- [ ] `components/Experience.tsx` - 3D 场景组件
- [ ] `components/MagicParticles.tsx` - 粒子效果组件
- [ ] `components/Decorations.tsx` - 装饰组件
- [ ] `components/PhotoModal.tsx` - 照片弹窗组件
- [ ] `components/TreePhotos.tsx` - 树上照片组件

### 📁 services 文件夹
- [ ] `services/geometryService.ts` - 几何计算服务

### 📁 .github 文件夹
- [ ] `.github/workflows/deploy.yml` - GitHub Actions 部署配置

### 📄 文档文件（可选）
- [ ] `README.md` - 项目说明
- [ ] `DEPLOYMENT.md` - 部署指南
- [ ] `metadata.json` - 项目元数据

## ❌ 不要上传的文件/文件夹

### 🚫 绝对不要上传
- ❌ `node_modules/` - 依赖包文件夹（太大，GitHub 会自动安装）
- ❌ `dist/` - 构建输出文件夹
- ❌ `.env.local` - 本地环境变量
- ❌ `*.log` - 日志文件

### 🚫 临时文件（如果存在）
- ❌ `App-simple.tsx` - 测试文件
- ❌ `deploy-to-github.bat` - 部署脚本
- ❌ `deploy.bat` - 部署脚本
- ❌ `manual-deploy.md` - 手动部署说明
- ❌ `mobile-guide.md` - 手机指南
- ❌ `test-features.md` - 测试清单
- ❌ `complete-deploy-guide.md` - 完整部署指南
- ❌ `quick-deploy.md` - 快速部署方案
- ❌ `upload-checklist.md` - 本文件

## 📂 文件夹结构

上传后的 GitHub 仓库应该是这样的：
```
merry-christmas-qian/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── components/
│   ├── Experience.tsx
│   ├── MagicParticles.tsx
│   ├── Decorations.tsx
│   ├── PhotoModal.tsx
│   └── TreePhotos.tsx
├── services/
│   └── geometryService.ts
├── .gitignore
├── App.tsx
├── constants.ts
├── index.css
├── index.html
├── index.tsx
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── types.ts
├── vite-env.d.ts
└── vite.config.ts
```

## 🚀 上传步骤

### 1. 创建 GitHub 仓库
- 仓库名：`merry-christmas-qian`
- 设为 Public
- 不要初始化任何文件

### 2. 上传文件
- 可以拖拽多个文件一次上传
- 或者压缩成 ZIP 上传（记得排除 node_modules）

### 3. 启用 GitHub Pages
- Settings > Pages
- Source: "Deploy from a branch"
- Branch: "gh-pages"

### 4. 等待部署
- GitHub Actions 会自动构建
- 约 2-3 分钟后可访问
- 网址：https://kuieless.github.io/merry-christmas-qian/

## 💡 上传技巧

### 批量上传
1. 选择所有必需文件
2. 拖拽到 GitHub 仓库页面
3. 添加提交信息："Initial commit: Christmas project"
4. 点击 "Commit changes"

### 文件夹上传
- GitHub 网页支持拖拽整个文件夹
- 会自动保持文件夹结构
- 自动排除 .gitignore 中的文件

记住：**千万不要上传 node_modules 文件夹！**