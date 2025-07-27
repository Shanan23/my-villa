const express = require('express');
const router = express.Router();
const Villa = require('../models/Villa');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check admin/editor role
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'editor') {
    return res.status(403).json({ message: 'Admin/Editor access required' });
  }
  next();
};

// Get all villas with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      category,
      minPrice,
      maxPrice,
      bedrooms,
      guests,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = { status: 'active' };

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Bedrooms filter
    if (bedrooms) {
      query['features.bedrooms'] = { $gte: Number(bedrooms) };
    }

    // Guests filter
    if (guests) {
      query['features.guests'] = { $gte: Number(guests) };
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const villas = await Villa.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    const total = await Villa.countDocuments(query);

    res.json({
      villas,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching villas', error: error.message });
  }
});

// Get single villa by ID
router.get('/:id', async (req, res) => {
  try {
    const villa = await Villa.findById(req.params.id).select('-__v');
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }
    res.json(villa);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching villa', error: error.message });
  }
});

// Create new villa (admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('location.address').notEmpty().withMessage('Address is required'),
  body('location.city').notEmpty().withMessage('City is required'),
  body('location.country').notEmpty().withMessage('Country is required'),
  body('features.bedrooms').isNumeric().withMessage('Bedrooms must be a number'),
  body('features.bathrooms').isNumeric().withMessage('Bathrooms must be a number'),
  body('features.guests').isNumeric().withMessage('Guests must be a number'),
  body('features.area').isNumeric().withMessage('Area must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const villa = new Villa(req.body);
    await villa.save();
    res.status(201).json(villa);
  } catch (error) {
    res.status(500).json({ message: 'Error creating villa', error: error.message });
  }
});

// Update villa (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const villa = await Villa.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }
    
    res.json(villa);
  } catch (error) {
    res.status(500).json({ message: 'Error updating villa', error: error.message });
  }
});

// Delete villa (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const villa = await Villa.findByIdAndDelete(req.params.id);
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }
    res.json({ message: 'Villa deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting villa', error: error.message });
  }
});

// Get villa categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Villa.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// Get featured villas
router.get('/featured/list', async (req, res) => {
  try {
    const featuredVillas = await Villa.find({ 
      status: 'active',
      'rating.average': { $gte: 4 }
    })
    .sort({ 'rating.average': -1, createdAt: -1 })
    .limit(6)
    .select('-__v');
    
    res.json(featuredVillas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured villas', error: error.message });
  }
});

module.exports = router; 