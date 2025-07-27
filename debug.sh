#!/bin/bash

echo "🔍 DEBUGGING VILLALUX APPLICATION"
echo "=================================="

echo ""
echo "📋 Container Status:"
docker ps

echo ""
echo "🌐 Network Status:"
docker network ls | grep shared-network

echo ""
echo "📊 Frontend Logs (last 20 lines):"
docker logs villa-frontend --tail 20

echo ""
echo "📊 Backend Logs (last 20 lines):"
docker logs villa-backend --tail 20

echo ""
echo "🗄️ MongoDB Logs (last 10 lines):"
docker logs villa-mongodb --tail 10

echo ""
echo "🔧 API Health Check:"
curl -s http://localhost:5000/api/health || echo "❌ Backend not responding"

echo ""
echo "🌐 Frontend Check:"
curl -s -I http://localhost:3000 | head -1 || echo "❌ Frontend not responding"

echo ""
echo "📁 Frontend Build Files:"
docker exec villa-frontend ls -la /app/build/static/js/ 2>/dev/null || echo "❌ Cannot access frontend container"

echo ""
echo "🔍 Environment Variables (Frontend):"
docker exec villa-frontend env | grep REACT_APP 2>/dev/null || echo "❌ Cannot access frontend container"

echo ""
echo "🔍 Environment Variables (Backend):"
docker exec villa-backend env | grep -E "(NODE_ENV|MONGODB_URI|JWT_SECRET)" 2>/dev/null || echo "❌ Cannot access backend container"

echo ""
echo "✅ Debug information collected!" 