#!/bin/sh

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to be ready..."
sleep 10

# Seed the database
echo "Seeding database..."
node seed-docker.js

# Start the application
echo "Starting VillaLux API server..."
npm start 