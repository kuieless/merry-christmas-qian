# 🎄 Merry Christmas Qian - 完整部署指南

## 📱 手机适配特性

### ✨ 新增功能
- **智能设备检测**：自动识别手机并优化体验
- **前置摄像头支持**：手机默认使用前置摄像头
- **触摸交互备用**：摄像头不可用时支持点击切换
- **响应式设计**：完美适配各种屏幕尺寸
- **横屏警告**：建议竖屏使用获得最佳体验

## 🚀 部署步骤

### 1. 覆盖 GitHub 仓库
运行部署脚本（Windows）：
```bash
deploy-to-github.bat
```

或手动执行：
```bash
git init
git add .
git commit -m "Complete Christmas project with mobile support"
git branch -M main
git remote add origin https://github.com/kuieless/merry-christmas-qian.git
git push -f origin main
```

### 2. 启用 GitHub Pages
1. 进入仓库 Settings > Pages
2. Source: "Deploy from a branch"
3. Branch: "gh-pages"
4. 等待自动部署完成

### 3. 访问网站
部署完成后访问：`https://kuieless.github.io/merry-christmas-qian/`

## 📱 手机使用指南

### 摄像头功能
1. **首次访问**：浏览器请求摄像头权限，点击"允许"
2. **手势识别**：
   - 握拳/指向 → 显示圣诞树
   - 张开手掌 → 粒子爆炸 + 照片展示
3. **最佳效果**：确保光线充足，手部在摄像头视野内

### 触摸交互（备用）
- 如果摄像头不可用，直接点击屏幕切换效果
- 每次点击在两种状态间切换

### 设备兼容性
- ✅ iPhone Safari
- ✅ Android Chrome  
- ✅ 微信内置浏览器
- ✅ 其他主流移动浏览器

## 🔧 技术特性

### 性能优化
- 手机端降低摄像头分辨率（480x640）
- 降低帧率（15-30fps）减少电池消耗
- 懒加载 3D 组件提高初始加载速度
- 预加载关键图片资源

### 用户体验
- 防止页面滚动和缩放
- 全屏沉浸式体验
- 智能错误处理和提示
- 渐进式功能降级

## 🧪 测试清单

### 桌面端测试
- [ ] `http://localhost:3000/` - 开发环境
- [ ] `http://localhost:4173/merry-christmas-qian/` - 生产预览
- [ ] 摄像头权限和手势识别
- [ ] 3D 场景渲染和交互

### 手机端测试  
- [ ] 摄像头权限请求
- [ ] 前置摄像头手势识别
- [ ] 触摸交互备用方案
- [ ] 响应式布局适配
- [ ] 横屏警告显示

### 部署测试
- [ ] GitHub Actions 自动构建
- [ ] GitHub Pages 访问
- [ ] HTTPS 摄像头功能
- [ ] 跨设备兼容性

## 🎯 使用说明

### 电脑端
1. 访问网站，允许摄像头权限
2. 对着摄像头做手势：
   - 握拳 → 圣诞树场景
   - 张开手掌 → 照片展示

### 手机端
1. 竖屏访问网站
2. 允许摄像头权限
3. 对着前置摄像头做手势
4. 或直接点击屏幕切换效果

现在你的圣诞节项目已经完全支持手机端了！🎉