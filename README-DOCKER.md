# VillaLux - Docker Setup

## 🐳 Quick Start

### 1. Prerequisites
- Docker installed
- Docker Compose installed
- Git (to clone the repository)

### 2. Setup Network (First time only)
```bash
docker network create shared-network
```

### 3. Start All Services
```bash
docker compose up -d
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27018

## 🔧 Troubleshooting

### White Screen Issue
Jika aplikasi menampilkan layar putih, gunakan script quick fix:

**Linux/Mac:**
```bash
chmod +x quick-fix.sh
./quick-fix.sh
```

**Windows:**
```cmd
quick-fix.bat
```

### Rebuild Frontend Only
**Linux/Mac:**
```bash
chmod +x rebuild-frontend.sh
./rebuild-frontend.sh
```

**Windows:**
```cmd
rebuild-frontend.bat
```

### Rebuild All Services
**Linux/Mac:**
```bash
chmod +x rebuild-all.sh
./rebuild-all.sh
```

**Windows:**
```cmd
rebuild-all.bat
```

## 📋 Manual Commands

### Check Container Status
```bash
docker ps
```

### View Logs
```bash
# Frontend logs
docker logs villa-frontend

# Backend logs
docker logs villa-backend

# MongoDB logs
docker logs villa-mongodb
```

### Stop All Services
```bash
docker compose down
```

### Rebuild Specific Service
```bash
# Rebuild frontend
docker compose build frontend

# Rebuild backend
docker compose build backend

# Rebuild all
docker compose build
```

## 🗄️ Database

### Default Users
- **Admin**: admin@villalux.com / admin123
- **Viewer**: viewer@villalux.com / viewer123

### Reset Database
```bash
# Stop services
docker compose down

# Remove MongoDB volume
docker volume rm villa_mongodb_data

# Start services (will recreate database)
docker compose up -d
```

## 🔍 Debugging

### Check API Health
```bash
curl http://localhost:5000/api/health
```

### Check Frontend Build
```bash
docker exec villa-frontend ls -la /app/build
```

### View Environment Variables
```bash
docker exec villa-frontend env
```

## 📁 File Structure
```
Villa/
├── client/                 # React Frontend
│   ├── Dockerfile
│   └── src/
├── server/                 # Node.js Backend
│   ├── Dockerfile
│   └── routes/
├── mongo-init/            # MongoDB initialization
├── docker-compose.yml     # Docker services
└── scripts/               # Build scripts
    ├── quick-fix.sh
    ├── rebuild-frontend.sh
    └── rebuild-all.sh
```

## 🚀 Production Deployment

### Environment Variables
Create `.env` file:
```env
NODE_ENV=production
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/villa-catalog?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-in-production
REACT_APP_API_URL=http://your-domain.com:5000
```

### Start Production
```bash
docker compose -f docker-compose.yml up -d
```

## 🆘 Common Issues

### 1. Port Already in Use
```bash
# Check what's using the port
lsof -i :3000
lsof -i :5000

# Kill the process or change ports in docker-compose.yml
```

### 2. Network Issues
```bash
# Recreate network
docker network rm shared-network
docker network create shared-network
```

### 3. Permission Issues
```bash
# Fix file permissions
chmod +x *.sh
```

### 4. Build Cache Issues
```bash
# Clear Docker build cache
docker builder prune
``` 