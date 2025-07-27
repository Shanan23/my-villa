#!/bin/bash

echo "🔄 Rebuilding All Containers..."

# Stop all containers
echo "📦 Stopping all containers..."
docker compose down

# Remove old images
echo "🧹 Cleaning old images..."
docker rmi villa-frontend:latest 2>/dev/null || true
docker rmi villa-backend:latest 2>/dev/null || true

# Rebuild and start all services
echo "🔨 Building and starting all services..."
docker compose up --build -d

echo "✅ All containers rebuilt and started!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5000"
echo "🗄️  MongoDB: localhost:27018"

# Show running containers
echo "📋 Running containers:"
docker ps 