@echo off
chcp 65001 >nul
echo Deploying to GitHub repository...
echo.

echo 1. Initializing Git repository...
git init

echo 2. Adding all files...
git add .

echo 3. Committing changes...
git commit -m "Complete Christmas project with mobile support"

echo 4. Setting main branch...
git branch -M main

echo 5. Adding remote repository...
git remote add origin https://github.com/kuieless/merry-christmas-qian.git

echo 6. Force pushing (overwrite remote repository)...
git push -f origin main

echo.
echo Deployment complete!
echo Website will be available in a few minutes: https://kuieless.github.io/merry-christmas-qian/
echo.
pause