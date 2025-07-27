const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config({ path: './config.env' });

async function checkUsers() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://172.30.220.43:27018/villa-catalog';
    console.log('Connecting to MongoDB:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    
    const users = await User.find({}).select('username email role isActive createdAt');
    console.log('\nUsers in database:');
    console.log('==================');
    
    if (users.length === 0) {
      console.log('No users found in database');
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. Username: ${user.username}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Active: ${user.isActive}`);
        console.log(`   Created: ${user.createdAt}`);
        console.log('---');
      });
    }
    
    // Check for admin users specifically
    const adminUsers = users.filter(u => u.role === 'admin');
    const editorUsers = users.filter(u => u.role === 'editor');
    
    console.log('\nSummary:');
    console.log(`- Total users: ${users.length}`);
    console.log(`- Admin users: ${adminUsers.length}`);
    console.log(`- Editor users: ${editorUsers.length}`);
    
    if (adminUsers.length === 0) {
      console.log('\n⚠️  WARNING: No admin users found!');
      console.log('You need at least one admin user to access the CMS.');
    }
    
    if (editorUsers.length === 0) {
      console.log('\n⚠️  WARNING: No editor users found!');
      console.log('You need at least one editor user to manage villas.');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

checkUsers(); 