@echo off
echo 🔥 FORCE REBUILD - Complete Reset
echo ==================================

REM Stop all containers
echo 🛑 Stopping all containers...
docker compose down

REM Remove all containers
echo 🗑️ Removing all containers...
docker rm -f villa-frontend villa-backend villa-mongodb 2>nul

REM Remove all images
echo 🧹 Removing all images...
docker rmi villa-frontend:latest villa-backend:latest 2>nul

REM Remove build cache
echo 🧹 Clearing build cache...
docker builder prune -f

REM Remove unused networks
echo 🧹 Cleaning unused networks...
docker network prune -f

REM Create network if it doesn't exist
echo 🌐 Ensuring network exists...
docker network create shared-network 2>nul

REM Rebuild everything from scratch
echo 🔨 Building everything from scratch...
docker compose build --no-cache

REM Start all services
echo 🚀 Starting all services...
docker compose up -d

REM Wait a moment for services to start
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Show status
echo 📋 Container status:
docker ps

echo.
echo 📊 Frontend logs:
docker logs villa-frontend --tail 10

echo.
echo 📊 Backend logs:
docker logs villa-backend --tail 10

echo.
echo ✅ FORCE REBUILD COMPLETED!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
pause 