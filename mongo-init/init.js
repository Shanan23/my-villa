// MongoDB initialization script
// This script will run when the MongoDB container starts for the first time

db = db.getSiblingDB('villa-catalog');

// Create collections
db.createCollection('villas');
db.createCollection('users');

// Create indexes
db.villas.createIndex({ "title": 1 });
db.villas.createIndex({ "category": 1 });
db.villas.createIndex({ "location.city": 1 });
db.villas.createIndex({ "rating.average": -1 });
db.villas.createIndex({ "createdAt": -1 });

db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });

print('MongoDB initialization completed successfully!'); 