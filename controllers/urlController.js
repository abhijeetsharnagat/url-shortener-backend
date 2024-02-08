// urlController.js

const URL = require("../models/URL");
const urlService = require("../services/urlService");

// Function to generate a random string for short URL
const generateShortURL = () => {
  const length = 6;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

module.exports = {
  generateShortURL, // Export the function here
  
  shortenURL: async (req, res) => {
    try {
      const { longURL } = req.body;
      const shortURL = generateShortURL();
      const user = req.user;
      const newURL = await urlService.saveURL(longURL, shortURL, user);
      res.json(newURL);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
  
  redirectURL: async (req, res) => {
  try {
    const shortURL = req.params.shortURL;
    console.log("Requested Short URL:", shortURL); // Add this line to log the requested short URL
    const originalURL = await urlService.getOriginalURL(shortURL);
    console.log("Original URL from Database:", originalURL); // Add this line to log the original URL fetched from the database
    if (!originalURL) {
      console.log("Original URL not found for short URL:", shortURL);
      return res.status(404).json({ error: "URL not found" });
    }
    urlService.incrementClickCount(originalURL);
    console.log("Redirecting to:", originalURL.longURL); // Add this line to log the URL being redirected to
    res.redirect(originalURL.longURL);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
},

  
  getDashboard: async (req, res) => {
    try {
      const user = req.user;
      const userURLs = await urlService.getUserURLs(user);
      res.json(userURLs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
};
