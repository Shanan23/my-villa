const mongoose = require('mongoose');
const Villa = require('./models/Villa');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Sample villas data
const sampleVillas = [
  {
    title: 'Traditional Balinese Villa',
    description: 'Authentic Balinese villa with traditional architecture, beautiful carvings, and cultural charm. Experience the rich heritage of Bali in this stunning property.',
    location: {
      address: '123 Temple Road',
      city: 'Gianyar',
      country: 'Indonesia',
      coordinates: {
        lat: -8.5383,
        lng: 115.3342
      }
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      area: 200,
      pool: true,
      wifi: true,
      parking: true
    },
    amenities: ['wifi', 'parking', 'pool'],
    category: 'Family',
    price: 290,
    rating: {
      average: 4.5,
      count: 127
    },
    availability: {
      status: 'available',
      checkIn: '15:00',
      checkOut: '11:00'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isMain: true,
        caption: 'Traditional Balinese Villa Exterior'
      }
    ]
  },
  {
    title: 'Luxury Cliff Villa',
    description: 'Spectacular cliff-top villa with breathtaking ocean views, infinity pool, and world-class amenities. The ultimate luxury escape in paradise.',
    location: {
      address: '654 Cliff Road',
      city: 'Uluwatu',
      country: 'Indonesia',
      coordinates: {
        lat: -8.8167,
        lng: 115.1
      }
    },
    features: {
      bedrooms: 5,
      bathrooms: 4,
      guests: 10,
      area: 450,
      pool: true,
      wifi: true,
      parking: true
    },
    amenities: ['wifi', 'parking', 'pool'],
    category: 'Luxury',
    price: 650,
    rating: {
      average: 4.9,
      count: 89
    },
    availability: {
      status: 'available',
      checkIn: '14:00',
      checkOut: '12:00'
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isMain: true,
        caption: 'Luxury Cliff Villa with Ocean View'
      }
    ]
  }
];

// Sample users data
const sampleUsers = [
  {
    username: 'admin',
    email: 'admin@villalux.com',
    password: 'admin123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User'
  },
  {
    username: 'viewer',
    email: 'viewer@villalux.com',
    password: 'viewer123',
    role: 'viewer',
    firstName: 'Regular',
    lastName: 'User'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:admin123@mongodb:27017/villa-catalog?authSource=admin';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');

    // Clear existing data
    await Villa.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Insert users
    const createdUsers = await User.insertMany(hashedUsers);
    console.log('Users seeded successfully');

    // Insert villas
    const createdVillas = await Villa.insertMany(sampleVillas);
    console.log('Villas seeded successfully');

    console.log('Database seeding completed successfully!');
    console.log(`Created ${createdUsers.length} users and ${createdVillas.length} villas`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase; 