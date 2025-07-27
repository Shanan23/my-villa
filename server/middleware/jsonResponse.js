// Middleware to ensure JSON responses
const ensureJsonResponse = (req, res, next) => {
  // Set JSON content type for all API responses
  res.setHeader('Content-Type', 'application/json');
  next();
};

module.exports = ensureJsonResponse; 