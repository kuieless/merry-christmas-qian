# 功能测试清单

## 🧪 本地测试

### 开发环境测试
1. **启动开发服务器**：`npm run dev`
2. **访问**：`http://localhost:3000/`
3. **预期结果**：
   - ✅ 看到加载动画（"正在种植魔法..."）
   - ✅ 加载完成后显示 3D 圣诞树场景
   - ✅ 浏览器请求摄像头权限（点击"允许"）

### 生产环境测试
1. **构建项目**：`npm run build`
2. **启动预览**：`npm run preview`
3. **访问**：`http://localhost:4173/merry-christmas-qian/`
4. **预期结果**：与开发环境相同

## 📷 摄像头和手势功能测试

### 摄像头权限
- 首次访问时浏览器会请求摄像头权限
- 点击"允许"启用手势识别
- 如果拒绝，会显示警告但 3D 场景仍可使用

### 手势识别
1. **握拳或指向**：显示圣诞树（默认状态）
   - 底部文字：`✧ Merry Christmas Qian ✧`
   
2. **张开手掌**（4个或更多手指伸直）：
   - 粒子爆炸效果
   - 照片弹出显示
   - 底部文字：`✧ Revealing Memory ✧`

### 调试信息
打开浏览器开发者工具（F12）查看 Console：
- `✅ Images preloaded successfully`
- `🔄 Initializing MediaPipe...`
- `✅ MediaPipe initialized successfully`
- `📷 Requesting camera access...`
- `✅ Camera started successfully`

## 🚀 部署测试

### GitHub Pages 部署
1. **推送到 GitHub**：
   ```bash
   git add .
   git commit -m "Add camera and gesture features"
   git push origin main
   ```

2. **等待 GitHub Actions 完成**（约 2-3 分钟）

3. **访问部署网站**：
   `https://kuieless.github.io/merry-christmas-qian/`

4. **预期结果**：
   - ✅ 与本地测试相同的功能
   - ✅ HTTPS 环境下摄像头正常工作
   - ✅ 手势识别正常

## ⚠️ 常见问题

### 白屏问题
- **原因**：直接打开 HTML 文件
- **解决**：必须通过开发服务器访问

### 摄像头不工作
- **原因**：权限被拒绝或非 HTTPS 环境
- **解决**：允许摄像头权限，确保使用 HTTPS

### 手势识别不准确
- **原因**：光线不足或手部遮挡
- **解决**：确保良好光线，手部完全在摄像头视野内

### 加载缓慢
- **原因**：Three.js 和 MediaPipe 库较大
- **解决**：正常现象，首次加载需要时间