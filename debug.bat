@echo off
echo 🔍 DEBUGGING VILLALUX APPLICATION
echo ==================================

echo.
echo 📋 Container Status:
docker ps

echo.
echo 🌐 Network Status:
docker network ls | findstr shared-network

echo.
echo 📊 Frontend Logs (last 20 lines):
docker logs villa-frontend --tail 20

echo.
echo 📊 Backend Logs (last 20 lines):
docker logs villa-backend --tail 20

echo.
echo 🗄️ MongoDB Logs (last 10 lines):
docker logs villa-mongodb --tail 10

echo.
echo 🔧 API Health Check:
curl -s http://localhost:5000/api/health 2>nul || echo ❌ Backend not responding

echo.
echo 🌐 Frontend Check:
curl -s -I http://localhost:3000 2>nul | findstr "HTTP" || echo ❌ Frontend not responding

echo.
echo 📁 Frontend Build Files:
docker exec villa-frontend ls -la /app/build/static/js/ 2>nul || echo ❌ Cannot access frontend container

echo.
echo 🔍 Environment Variables (Frontend):
docker exec villa-frontend env 2>nul | findstr REACT_APP || echo ❌ Cannot access frontend container

echo.
echo 🔍 Environment Variables (Backend):
docker exec villa-backend env 2>nul | findstr /E "(NODE_ENV|MONGODB_URI|JWT_SECRET)" || echo ❌ Cannot access backend container

echo.
echo ✅ Debug information collected!
pause 