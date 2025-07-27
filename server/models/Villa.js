const mongoose = require('mongoose');

const villaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  amenities: [{
    type: String,
    trim: true
  }],
  features: {
    bedrooms: {
      type: Number,
      required: true,
      min: 1
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1
    },
    guests: {
      type: Number,
      required: true,
      min: 1
    },
    area: {
      type: Number,
      required: true,
      min: 1
    },
    pool: {
      type: Boolean,
      default: false
    },
    wifi: {
      type: Boolean,
      default: true
    },
    parking: {
      type: Boolean,
      default: false
    },
    kitchen: {
      type: Boolean,
      default: true
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: String,
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  availability: {
    isAvailable: {
      type: Boolean,
      default: true
    },
    checkIn: {
      type: String,
      default: '15:00'
    },
    checkOut: {
      type: String,
      default: '11:00'
    }
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  category: {
    type: String,
    enum: ['Luxury', 'Beachfront', 'Mountain', 'City', 'Rural', 'Family'],
    default: 'Luxury'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search functionality
villaSchema.index({ 
  title: 'text', 
  description: 'text', 
  'location.city': 'text',
  'location.country': 'text'
});

module.exports = mongoose.model('Villa', villaSchema); 