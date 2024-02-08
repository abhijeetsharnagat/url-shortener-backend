// routes/urlRoutes.js

const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// Define a route handler for POST requests to /shorten
router.post('/shorten', urlController.shortenURL);
router.get('/dashboard', urlController.getDashboard); // Move this route definition before the wildcard route
router.get('/:shortURL', urlController.redirectURL);

module.exports = router;
