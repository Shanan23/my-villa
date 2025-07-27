# VillaLux - Docker Setup

This document explains how to run the VillaLux application using Docker Compose.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose installed
- At least 4GB of available RAM

## Quick Start

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd Villa
   ```

2. **Start all services**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27018

## Services

### Frontend (React)
- **Port**: 3000
- **URL**: http://localhost:3000
- **Container**: villa-frontend

### Backend (Node.js/Express)
- **Port**: 5000
- **URL**: http://localhost:5000
- **Container**: villa-backend
- **Health Check**: http://localhost:5000/api/health

### Database (MongoDB)
- **Port**: 27018
- **Container**: villa-mongodb
- **Credentials**: admin/admin123
- **Database**: villa-catalog

## Docker Commands

### Start Services
```bash
# Start all services in background
docker-compose up -d

# Start with logs
docker-compose up

# Start specific service
docker-compose up -d backend
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Follow logs
docker-compose logs -f backend
```

### Rebuild Services
```bash
# Rebuild all services
docker-compose build

# Rebuild specific service
docker-compose build backend

# Force rebuild (no cache)
docker-compose build --no-cache
```

### Database Operations
```bash
# Access MongoDB shell
docker-compose exec mongodb mongosh -u admin -p admin123

# Backup database
docker-compose exec mongodb mongodump --out /backup

# Restore database
docker-compose exec mongodb mongorestore /backup
```

## Environment Variables

### Backend Environment
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (production/development)

### Frontend Environment
- `REACT_APP_API_URL`: Backend API URL

## Data Persistence

- **MongoDB Data**: Stored in Docker volume `mongodb_data`
- **Uploaded Images**: Stored in `./server/uploads` directory

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Check what's using the port
   netstat -ano | findstr :3000
   netstat -ano | findstr :5000
   
   # Kill the process
   taskkill /PID <process-id> /F
   ```

2. **MongoDB connection issues**:
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   
   # Restart MongoDB
   docker-compose restart mongodb
   ```

3. **Frontend not loading**:
   ```bash
   # Check frontend logs
   docker-compose logs frontend
   
   # Rebuild frontend
   docker-compose build frontend
   docker-compose up -d frontend
   ```

4. **Backend API errors**:
   ```bash
   # Check backend logs
   docker-compose logs backend
   
   # Test health endpoint
   curl http://localhost:5000/api/health
   ```

### Reset Everything
```bash
# Stop and remove everything
docker-compose down -v

# Remove all images
docker system prune -a

# Start fresh
docker-compose up -d
```

## Development Mode

For development, you can run services individually:

```bash
# Start only MongoDB
docker-compose up -d mongodb

# Run backend locally
cd server && npm install && npm start

# Run frontend locally
cd client && npm install && npm start
```

## Production Deployment

For production deployment:

1. Update environment variables in `docker-compose.yml`
2. Use proper secrets management
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Configure monitoring and logging

## Monitoring

### Health Checks
- Backend: http://localhost:5000/api/health
- Frontend: http://localhost:3000

### Container Status
```bash
docker-compose ps
```

### Resource Usage
```bash
docker stats
```

## Backup and Restore

### Backup Database
```bash
# Create backup
docker-compose exec mongodb mongodump --out /backup

# Copy backup to host
docker cp villa-mongodb:/backup ./backup
```

### Restore Database
```bash
# Copy backup to container
docker cp ./backup villa-mongodb:/backup

# Restore
docker-compose exec mongodb mongorestore /backup
```

## Security Notes

- Change default passwords in production
- Use environment variables for sensitive data
- Configure firewall rules
- Enable SSL/TLS
- Regular security updates 