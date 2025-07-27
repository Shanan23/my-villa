const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './config.env' });

async function createEditorUser() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://172.30.220.43:27018/villa-catalog';
    console.log('Connecting to MongoDB:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    
    // Check if editor user already exists
    const existingEditor = await User.findOne({ email: 'editor@villalux.com' });
    if (existingEditor) {
      console.log('Editor user already exists:');
      console.log(`- Username: ${existingEditor.username}`);
      console.log(`- Email: ${existingEditor.email}`);
      console.log(`- Role: ${existingEditor.role}`);
      console.log(`- Active: ${existingEditor.isActive}`);
      return;
    }
    
    // Create editor user
    const editorUser = new User({
      username: 'editor',
      email: 'editor@villalux.com',
      password: 'editor123',
      role: 'editor',
      isActive: true,
      profile: {
        firstName: 'Editor',
        lastName: 'User'
      }
    });
    
    await editorUser.save();
    console.log('✅ Editor user created successfully!');
    console.log(`- Username: ${editorUser.username}`);
    console.log(`- Email: ${editorUser.email}`);
    console.log(`- Role: ${editorUser.role}`);
    console.log(`- Password: editor123`);
    
  } catch (error) {
    console.error('Error creating editor user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

createEditorUser(); 