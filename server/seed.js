const mongoose = require('mongoose');
const Villa = require('./models/Villa');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './config.env' });

const sampleVillas = [
  {
    title: "Luxury Beachfront Villa",
    description: "Stunning beachfront villa with panoramic ocean views, private pool, and direct beach access. Perfect for families and groups seeking luxury and privacy.",
    price: 450,
    location: {
      address: "123 Beach Road",
      city: "Bali",
      country: "Indonesia",
      coordinates: {
        lat: -8.3405,
        lng: 115.0920
      }
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      area: 350,
      pool: true,
      wifi: true,
      parking: true,
      kitchen: true,
      ac: true
    },
    amenities: ["Private Pool", "Beach Access", "WiFi", "Parking", "Kitchen", "Air Conditioning"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        isMain: true,
        caption: "Main Villa View"
      },
      {
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        isMain: false,
        caption: "Pool Area"
      }
    ],
    category: "Beachfront",
    status: "active",
    rating: {
      average: 4.8,
      count: 24
    },
    reviews: [
      {
        user: "John D.",
        rating: 5,
        comment: "Absolutely amazing villa! The beach access and pool were perfect.",
        date: new Date("2024-01-15")
      }
    ]
  },
  {
    title: "Mountain Retreat Villa",
    description: "Peaceful mountain villa surrounded by lush forests and stunning mountain views. Ideal for nature lovers and those seeking tranquility.",
    price: 320,
    location: {
      address: "456 Mountain View Drive",
      city: "Ubud",
      country: "Indonesia",
      coordinates: {
        lat: -8.5069,
        lng: 115.2625
      }
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      area: 280,
      pool: false,
      wifi: true,
      parking: true,
      kitchen: true,
      ac: true
    },
    amenities: ["Mountain Views", "WiFi", "Parking", "Kitchen", "Air Conditioning", "Garden"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        isMain: true,
        caption: "Mountain Villa"
      }
    ],
    category: "Mountain",
    status: "active",
    rating: {
      average: 4.6,
      count: 18
    },
    reviews: [
      {
        user: "Sarah M.",
        rating: 4,
        comment: "Beautiful location and very peaceful. Perfect for a relaxing getaway.",
        date: new Date("2024-01-10")
      }
    ]
  },
  {
    title: "Modern City Villa",
    description: "Contemporary villa in the heart of the city with modern amenities and easy access to shopping, dining, and entertainment.",
    price: 280,
    location: {
      address: "789 City Center",
      city: "Jakarta",
      country: "Indonesia",
      coordinates: {
        lat: -6.2088,
        lng: 106.8456
      }
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      area: 200,
      pool: true,
      wifi: true,
      parking: true,
      kitchen: true,
      ac: true
    },
    amenities: ["City Views", "WiFi", "Parking", "Kitchen", "Air Conditioning", "Gym Access"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        isMain: true,
        caption: "Modern Villa Interior"
      }
    ],
    category: "City",
    status: "active",
    rating: {
      average: 4.4,
      count: 15
    },
    reviews: [
      {
        user: "Mike R.",
        rating: 4,
        comment: "Great location and modern amenities. Perfect for business travelers.",
        date: new Date("2024-01-08")
      }
    ]
  },
  {
    title: "Tropical Garden Villa",
    description: "Beautiful villa surrounded by tropical gardens with a private pool and outdoor dining area. Perfect for families and nature enthusiasts.",
    price: 380,
    location: {
      address: "321 Garden Lane",
      city: "Seminyak",
      country: "Indonesia",
      coordinates: {
        lat: -8.6833,
        lng: 115.1667
      }
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      area: 300,
      pool: true,
      wifi: true,
      parking: true,
      kitchen: true,
      ac: true
    },
    amenities: ["Tropical Gardens", "Private Pool", "WiFi", "Parking", "Kitchen", "Outdoor Dining"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        isMain: true,
        caption: "Garden Villa"
      }
    ],
    category: "Rural",
    status: "active",
    rating: {
      average: 4.7,
      count: 22
    },
    reviews: [
      {
        user: "Lisa K.",
        rating: 5,
        comment: "The gardens are absolutely stunning and the pool is perfect for kids.",
        date: new Date("2024-01-12")
      }
    ]
  },
  {
    title: "Luxury Cliff Villa",
    description: "Spectacular cliff-top villa with breathtaking ocean views, infinity pool, and world-class amenities. The ultimate luxury experience.",
    price: 650,
    location: {
      address: "654 Cliff Road",
      city: "Uluwatu",
      country: "Indonesia",
      coordinates: {
        lat: -8.8167,
        lng: 115.1000
      }
    },
    features: {
      bedrooms: 5,
      bathrooms: 4,
      guests: 10,
      area: 450,
      pool: true,
      wifi: true,
      parking: true,
      kitchen: true,
      ac: true
    },
    amenities: ["Cliff Views", "Infinity Pool", "WiFi", "Parking", "Kitchen", "Butler Service"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        isMain: true,
        caption: "Cliff Villa"
      }
    ],
    category: "Luxury",
    status: "active",
    rating: {
      average: 4.9,
      count: 31
    },
    reviews: [
      {
        user: "David L.",
        rating: 5,
        comment: "Absolutely breathtaking views and luxury beyond expectations.",
        date: new Date("2024-01-20")
      }
    ]
  },
  {
    title: "Traditional Balinese Villa",
    description: "Authentic Balinese villa with traditional architecture, beautiful carvings, and cultural charm. Experience the real Bali.",
    price: 290,
    location: {
      address: "987 Traditional Street",
      city: "Gianyar",
      country: "Indonesia",
      coordinates: {
        lat: -8.5417,
        lng: 115.3250
      }
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      area: 250,
      pool: true,
      wifi: true,
      parking: true,
      kitchen: true,
      ac: false
    },
    amenities: ["Traditional Architecture", "Garden", "WiFi", "Parking", "Kitchen", "Cultural Experience"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        isMain: true,
        caption: "Traditional Villa"
      }
    ],
    category: "Family",
    status: "active",
    rating: {
      average: 4.5,
      count: 19
    },
    reviews: [
      {
        user: "Emma W.",
        rating: 4,
        comment: "Beautiful traditional architecture and very authentic experience.",
        date: new Date("2024-01-05")
      }
    ]
  }
];

const sampleUsers = [
  {
    username: "admin",
    email: "admin@villalux.com",
    password: "admin123",
    role: "admin",
    firstName: "Admin",
    lastName: "User"
  },
  {
    username: "editor",
    email: "editor@villalux.com",
    password: "editor123",
    role: "editor",
    firstName: "Editor",
    lastName: "User"
  },
  {
    username: "user",
    email: "user@villalux.com",
    password: "user123",
    role: "viewer",
    firstName: "Regular",
    lastName: "User"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = 'mongodb://admin:admin123@172.30.220.43:27018/villa-catalog?authSource=admin';
    console.log('Connecting to MongoDB:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');

    // Clear existing data
    await Villa.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      await user.save();
      createdUsers.push(user);
      console.log(`Created user: ${userData.username}`);
    }

    // Create villas
    for (const villaData of sampleVillas) {
      const villa = new Villa(villaData);
      await villa.save();
      console.log(`Created villa: ${villaData.title}`);
    }

    console.log('Database seeded successfully!');
    console.log(`Created ${sampleUsers.length} users and ${sampleVillas.length} villas`);

    // Display sample login credentials
    console.log('\nSample login credentials:');
    console.log('Admin: admin@villalux.com / admin123');
    console.log('Editor: editor@villalux.com / editor123');
    console.log('User: user@villalux.com / user123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase(); 