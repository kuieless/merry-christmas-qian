@echo off
echo 正在部署 Merry Christmas Qian 项目...
echo.

echo 1. 添加所有文件到 Git...
git add .

echo 2. 提交更改...
set /p commit_msg="请输入提交信息 (按回车使用默认): "
if "%commit_msg%"=="" set commit_msg=Update project

git commit -m "%commit_msg%"

echo 3. 推送到 GitHub...
git push origin main

echo.
echo 部署完成！
echo 请访问: https://kuieless.github.io/merry-christmas-qian/
echo.
pause