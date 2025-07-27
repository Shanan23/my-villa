@echo off
echo 🚀 Quick Fix for White Screen Issue...

REM Check if containers are running
echo 📋 Checking running containers...
docker ps

REM Stop frontend container
echo 🛑 Stopping frontend container...
docker stop villa-frontend 2>nul

REM Remove frontend container
echo 🗑️ Removing frontend container...
docker rm villa-frontend 2>nul

REM Rebuild frontend with latest code
echo 🔨 Rebuilding frontend with latest fixes...
docker build --no-cache -t villa-frontend:latest ./client

REM Start frontend container
echo 🚀 Starting frontend container...
docker run -d --name villa-frontend --network shared-network -p 3000:3000 -e REACT_APP_API_URL=http://localhost:5000 --restart unless-stopped villa-frontend:latest

echo ✅ Quick fix completed!
echo 🌐 Frontend should now work at: http://localhost:3000
echo.
echo 📋 Current containers:
docker ps
echo.
echo 📊 Frontend logs:
docker logs villa-frontend --tail 20
pause 