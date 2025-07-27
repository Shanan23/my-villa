@echo off
echo 🔄 Rebuilding All Containers...

REM Stop all containers
echo 📦 Stopping all containers...
docker compose down

REM Remove old images
echo 🧹 Cleaning old images...
docker rmi villa-frontend:latest 2>nul
docker rmi villa-backend:latest 2>nul

REM Rebuild and start all services
echo 🔨 Building and starting all services...
docker compose up --build -d

echo ✅ All containers rebuilt and started!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo 🗄️  MongoDB: localhost:27018

REM Show running containers
echo 📋 Running containers:
docker ps
pause 