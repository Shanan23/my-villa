@echo off
echo 🔄 Rebuilding Frontend Container...

REM Stop the frontend container
echo 📦 Stopping frontend container...
docker stop villa-frontend 2>nul
docker rm villa-frontend 2>nul

REM Rebuild the frontend image
echo 🔨 Building new frontend image...
docker build -t villa-frontend:latest ./client

REM Start the frontend container
echo 🚀 Starting frontend container...
docker run -d --name villa-frontend --network shared-network -p 3000:3000 -e REACT_APP_API_URL=http://localhost:5000 --restart unless-stopped villa-frontend:latest

echo ✅ Frontend rebuild completed!
echo 🌐 Frontend is running at: http://localhost:3000
pause 